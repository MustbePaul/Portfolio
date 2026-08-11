import { ImageResponse } from "next/og";
import { SocialCard, socialImageSize } from "./social-card";

export const alt = "Paul Phiri — Full-stack software developer";
export const size = socialImageSize;
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(<SocialCard />, size);
}
