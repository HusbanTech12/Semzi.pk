import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Questions about ingredients, shipping, or your order? Get in touch with Semzi — we reply within 24 hours.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
