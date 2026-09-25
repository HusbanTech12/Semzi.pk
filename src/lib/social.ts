import { contactInfo, contactLinks } from "@/lib/contact";

export type SocialPlatformName = "Instagram" | "Facebook" | "WhatsApp";

export type SocialPlatform = {
  name: SocialPlatformName;
  handle: string;
  href: string;
  description: string;
};

export const socialPlatforms: SocialPlatform[] = [
  {
    name: "Instagram",
    handle: "@semzipk",
    href: contactLinks.instagram,
    description: "Bars, pours, and the Beach collection as it happens.",
  },
  {
    name: "Facebook",
    handle: "Semzi Pk",
    href: contactLinks.facebook,
    description: "Drops, stories, and notes from the studio.",
  },
  {
    name: "WhatsApp",
    handle: contactInfo.phoneDisplay,
    href: contactLinks.whatsapp,
    description: "Questions about bars, gifts, or an order — message us.",
  },
];
