import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact";

// Per-instance sliding-window limiter. Good enough to blunt simple abuse;
// a durable store (e.g. Upstash) would be needed for strict global limits.
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const recentAttempts = new Map<string, number[]>();

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const attempts = (recentAttempts.get(ip) ?? []).filter(
    (time) => time > windowStart,
  );
  if (attempts.length >= RATE_LIMIT_MAX) {
    recentAttempts.set(ip, attempts);
    return true;
  }
  attempts.push(now);
  recentAttempts.set(ip, attempts);
  if (recentAttempts.size > 1000) {
    for (const [key, times] of recentAttempts) {
      if (times.every((time) => time <= windowStart))
        recentAttempts.delete(key);
    }
  }
  return false;
}

export async function POST(request: Request) {
  if (isRateLimited(clientIp(request))) {
    return NextResponse.json(
      {
        error:
          "Too many messages sent recently. Please wait a few minutes or email directly.",
      },
      { status: 429 },
    );
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 20_000) {
    return NextResponse.json({ error: "Invalid request." }, { status: 413 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form fields and try again." },
      { status: 422 },
    );
  }

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    return NextResponse.json(
      { error: "Contact delivery is temporarily unavailable." },
      { status: 503 },
    );
  }

  const { name, email, subject, message } = parsed.data;
  try {
    const resend = new Resend(RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: CONTACT_FROM_EMAIL,
      to: [CONTACT_TO_EMAIL],
      replyTo: email,
      subject: `Portfolio enquiry: ${subject}`,
      text: `${message}\n\nFrom: ${name}\nReply to: ${email}`,
    });
    if (error || !data?.id) {
      return NextResponse.json(
        { error: "Message delivery failed. Please try again or use email." },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Message delivery failed. Please try again or use email." },
      { status: 502 },
    );
  }
}
