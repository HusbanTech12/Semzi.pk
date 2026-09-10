import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Follow Semzi",
  description:
    "Find Semzi on Instagram, Facebook, X, and WhatsApp — behind-the-scenes soap-making, new drops, and ingredient stories.",
};

export default function SocialLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
