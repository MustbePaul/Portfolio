"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { profile } from "@/data/portfolio";

export default function ContactForm() {
  const [delivery, setDelivery] = useState<
    | { state: "idle" }
    | { state: "success"; message: string }
    | { state: "error"; message: string }
  >({ state: "idle" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDelivery({ state: "idle" });
    const form = event.currentTarget;
    const formData = new FormData(form);
    const values = {
      name: String(formData.get("name") ?? "")
        .trim()
        .replace(/\s+/g, " "),
      email: String(formData.get("email") ?? "")
        .trim()
        .toLowerCase(),
      subject: String(formData.get("subject") ?? "")
        .trim()
        .replace(/\s+/g, " "),
      message: String(formData.get("message") ?? "").trim(),
      website: String(formData.get("website") ?? ""),
    };
    const nextErrors: Record<string, string> = {};
    if (values.name.length < 2)
      nextErrors.name = "Enter at least 2 characters.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (values.subject.length < 3) {
      nextErrors.subject = "Enter at least 3 characters.";
    }
    if (values.message.length < 10) {
      nextErrors.message = "Enter at least 10 characters.";
    }
    if (values.website.length > 0) return;
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok)
        throw new Error(result.error ?? "Message delivery failed.");
      form.reset();
      setDelivery({
        state: "success",
        message: "Message sent. I'll get back to you as soon as I can.",
      });
    } catch (error) {
      setDelivery({
        state: "error",
        message:
          error instanceof Error
            ? error.message
            : "Message delivery failed. Please use the email link instead.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsApp = `https://wa.me/265997765664?text=${encodeURIComponent("Hello Paul, I found your portfolio and would like to discuss a project.")}`;

  return (
    <section id="contact" className="section section-alt">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Contact</p>
          <h2>Let&apos;s build something useful</h2>
          <p>
            Tell me what you are working on, where it is stuck and what a good
            outcome looks like.
          </p>
        </div>
        <div className="contact-grid">
          <div className="contact-details">
            <div className="detail">
              <Mail />
              <div>
                <span>Email</span>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </div>
            </div>
            <div className="detail">
              <MapPin />
              <div>
                <span>Location</span>
                <p>{profile.location}</p>
              </div>
            </div>
            <div className="quick-actions">
              <a className="button secondary" href={`mailto:${profile.email}`}>
                Quick email <Mail />
              </a>
              <a
                className="button secondary"
                href={whatsApp}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp <MessageCircle />
              </a>
            </div>
            <div className="socials">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <Github />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin />
              </a>
            </div>
          </div>
          <form
            className="glass-card contact-form"
            onSubmit={(event) => {
              void submit(event);
            }}
            noValidate
          >
            <div className="field">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                autoComplete="name"
                maxLength={80}
                aria-invalid={!!errors.name}
                aria-describedby="name-error"
              />
              <p id="name-error" className="field-message">
                {errors.name}
              </p>
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                maxLength={254}
                aria-invalid={!!errors.email}
                aria-describedby="email-error"
              />
              <p id="email-error" className="field-message">
                {errors.email}
              </p>
            </div>
            <div className="field">
              <label htmlFor="subject">Subject</label>
              <input
                id="subject"
                name="subject"
                autoComplete="off"
                maxLength={120}
                aria-invalid={!!errors.subject}
                aria-describedby="subject-error"
              />
              <p id="subject-error" className="field-message">
                {errors.subject}
              </p>
            </div>
            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={6}
                maxLength={5000}
                aria-invalid={!!errors.message}
                aria-describedby="message-error"
              />
              <p id="message-error" className="field-message">
                {errors.message}
              </p>
            </div>
            <div className="honeypot" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            <button
              className="button primary submit"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? "Sending..." : "Send message"} <ArrowUpRight />
            </button>
            <p
              className={`form-note ${delivery.state === "error" ? "form-note-error" : ""}`}
              role={delivery.state === "error" ? "alert" : "status"}
              aria-live="polite"
            >
              {delivery.state === "idle"
                ? "Your message is delivered securely by email."
                : delivery.message}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
