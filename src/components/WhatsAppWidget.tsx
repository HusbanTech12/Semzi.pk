"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import SocialGlyph from "@/components/SocialGlyph";
import { socialPlatforms } from "@/lib/social";

const whatsapp =
  socialPlatforms.find((p) => p.name === "WhatsApp") ?? socialPlatforms[3];

const DEFAULT_MESSAGE = "Hi Semzi — I’d like to ask about your soaps.";

function buildHref() {
  const base =
    process.env.NEXT_PUBLIC_WHATSAPP_URL?.trim() || whatsapp.href;
  try {
    const url = new URL(base);
    if (!url.searchParams.has("text")) {
      url.searchParams.set("text", DEFAULT_MESSAGE);
    }
    return url.toString();
  } catch {
    return base;
  }
}

export default function WhatsAppWidget() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const hidden =
    pathname?.startsWith("/admin") || pathname?.startsWith("/sign-");

  if (hidden) return null;

  return (
    <div className="pointer-events-none fixed bottom-24 left-4 z-50 sm:bottom-6 sm:left-6">
      <motion.a
        href={buildHref()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Semzi on WhatsApp"
        className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_32px_-8px_rgba(37,211,102,0.55)] transition-opacity hover:opacity-90"
        whileHover={reduceMotion ? undefined : { scale: 1.04 }}
        whileTap={reduceMotion ? undefined : { scale: 0.96 }}
      >
        <SocialGlyph name="WhatsApp" className="h-7 w-7" />
      </motion.a>
    </div>
  );
}
