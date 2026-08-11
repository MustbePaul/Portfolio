import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact";

export async function POST(request: Request) {
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
