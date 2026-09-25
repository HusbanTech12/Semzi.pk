import type { Metadata } from "next";
import { contactInfo } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Contact",
  description: `Questions about ingredients, shipping, or your order? Email ${contactInfo.email} or call ${contactInfo.phoneDisplay} — we reply within 24 hours.`,
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
