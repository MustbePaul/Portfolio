import { z } from "zod";

const cleanText = (value: string) => value.trim().replace(/\s+/g, " ");

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter at least 2 characters.")
    .max(80)
    .transform(cleanText),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address.")
    .max(254)
    .transform((value) => value.toLowerCase()),
  subject: z
    .string()
    .trim()
    .min(3, "Enter at least 3 characters.")
    .max(120)
    .transform(cleanText),
  message: z.string().trim().min(10, "Enter at least 10 characters.").max(5000),
  website: z.string().max(0).optional().default(""),
});

export type ContactValues = z.input<typeof contactSchema>;
