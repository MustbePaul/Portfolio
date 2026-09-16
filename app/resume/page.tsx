import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";
import ResumePageClient from "./ResumePageClient";

export const metadata: Metadata = {
  title: "Resume | Paul Napoleon Phiri",
  description:
    "Print-ready resume for Paul Napoleon Phiri, full-stack software developer building web and mobile systems.",
  alternates: { canonical: "/resume" },
  openGraph: {
    title: "Resume | Paul Napoleon Phiri",
    description:
      "Print-ready resume for Paul Napoleon Phiri, full-stack software developer.",
    url: absoluteUrl("/resume"),
  },
  twitter: {
    title: "Resume | Paul Napoleon Phiri",
    description:
      "Print-ready resume for Paul Napoleon Phiri, full-stack software developer.",
  },
};

export default function ResumePage() {
  return <ResumePageClient />;
}
