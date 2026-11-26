import { Github, Linkedin, Mail, MapPin, MessageCircle } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { profile } from "@/data/portfolio";

export default function ContactSection() {
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
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
