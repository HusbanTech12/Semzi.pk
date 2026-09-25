import type { SocialPlatformName } from "@/lib/social";

export default function SocialGlyph({
  name,
  className,
}: {
  name: SocialPlatformName;
  className?: string;
}) {
  const cls = className ?? "h-6 w-6";

  switch (name) {
    case "Instagram":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={cls} aria-hidden>
          <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
        </svg>
      );
    case "Facebook":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={cls} aria-hidden>
          <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.6l.4-3H13v-2c0-.6.4-1 1-1Z" />
        </svg>
      );
    case "WhatsApp":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={cls} aria-hidden>
          <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.74.46 3.44 1.33 4.94L2 22l5.4-1.42a10 10 0 0 0 4.64 1.18h.04c5.46 0 9.89-4.4 9.89-9.83C21.97 6.4 17.5 2 12.04 2Zm5.77 13.97c-.24.68-1.4 1.3-1.94 1.38-.5.07-1.12.1-1.81-.11-.42-.13-.95-.31-1.64-.6-2.89-1.25-4.77-4.16-4.92-4.36-.14-.2-1.18-1.57-1.18-3 0-1.42.74-2.12 1.01-2.41.26-.28.58-.35.77-.35h.56c.18 0 .42-.07.65.5.24.58.8 2 .87 2.14.07.14.12.3.02.49-.1.2-.14.32-.28.5-.14.17-.3.39-.42.52-.14.14-.29.3-.12.58.16.28.73 1.2 1.57 1.95 1.08.96 1.98 1.26 2.26 1.4.28.14.44.12.61-.07.16-.18.7-.81.89-1.09.18-.28.37-.23.62-.14.26.1 1.63.77 1.91.91.28.14.47.21.54.32.07.12.07.68-.17 1.36Z" />
        </svg>
      );
    default:
      return null;
  }
}
