import type { SocialPlatform } from "@/lib/social";

export default function SocialGlyph({
  name,
  className,
}: {
  name: SocialPlatform["name"];
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
    case "X":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={cls} aria-hidden>
          <path d="M17.5 3h3.1l-6.8 7.8L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.3-8.3L2 3h6.3l4.4 5.8L17.5 3Zm-1.1 16.2h1.7L7.7 4.7H5.9l10.5 14.5Z" />
        </svg>
      );
    case "WhatsApp":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={cls} aria-hidden>
          <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.74.46 3.44 1.33 4.94L2 22l5.4-1.42a10 10 0 0 0 4.64 1.18h.04c5.46 0 9.89-4.4 9.89-9.83C21.97 6.4 17.5 2 12.04 2Zm5.77 13.97c-.24.68-1.4 1.3-1.94 1.38-.5.07-1.12.1-1.81-.11-.42-.13-.95-.31-1.64-.6-2.89-1.25-4.77-4.16-4.92-4.36-.14-.2-1.18-1.57-1.18-3 0-1.42.74-2.12 1.01-2.41.26-.28.58-.35.77-.35h.56c.18 0 .42-.07.65.5.24.58.8 2 .87 2.14.07.14.12.3.02.49-.1.2-.14.32-.28.5-.14.17-.3.39-.42.52-.14.14-.29.3-.12.58.16.28.73 1.2 1.57 1.95 1.08.96 1.98 1.26 2.26 1.4.28.14.44.12.61-.07.16-.18.7-.81.89-1.09.18-.28.37-.23.62-.14.26.1 1.63.77 1.91.91.28.14.47.21.54.32.07.12.07.68-.17 1.36Z" />
        </svg>
      );
    case "TikTok":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={cls} aria-hidden>
          <path d="M14.5 3c.4 2.5 1.8 4.2 4.3 4.5v2.6c-1.5 0-2.9-.5-4.2-1.4v6.6c0 3.2-2.5 5.7-5.8 5.7A5.7 5.7 0 0 1 3 15.3c0-3.2 2.6-5.8 5.8-5.8.3 0 .7 0 1 .1v2.7a3 3 0 0 0-1-.1 3.1 3.1 0 1 0 3.1 3.1V3h2.6Z" />
        </svg>
      );
    case "YouTube":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={cls} aria-hidden>
          <path d="M22 12.2s0-3.2-.4-4.6c-.2-.8-.9-1.5-1.7-1.7C18.5 5.5 12 5.5 12 5.5s-6.5 0-7.9.4c-.8.2-1.5.9-1.7 1.7C2 9 2 12.2 2 12.2s0 3.2.4 4.6c.2.8.9 1.5 1.7 1.7 1.4.4 7.9.4 7.9.4s6.5 0 7.9-.4c.8-.2 1.5-.9 1.7-1.7.4-1.4.4-4.6.4-4.6ZM10 15.5v-6.6l5.5 3.3-5.5 3.3Z" />
        </svg>
      );
    case "Pinterest":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={cls} aria-hidden>
          <path d="M12 2C6.5 2 2 6.4 2 11.8c0 4.2 2.6 7.7 6.3 9-.1-.7-.2-1.9 0-2.7.2-.7 1.5-6.2 1.5-6.2s-.4-.8-.4-1.9c0-1.8 1-3.1 2.3-3.1 1.1 0 1.6.8 1.6 1.8 0 1.1-.7 2.8-1.1 4.3-.3 1.3.7 2.3 2 2.3 2.4 0 4-2.5 4-6.2 0-3.2-2.3-5.5-5.6-5.5-3.8 0-6.1 2.8-6.1 5.8 0 1.1.4 2.3 1 3 .1.1.1.2.1.4l-.4 1.5c0 .2-.2.3-.4.2-1.6-.7-2.6-3-2.6-4.8 0-3.9 2.8-7.5 8.2-7.5 4.3 0 7.6 3.1 7.6 7.2 0 4.3-2.7 7.8-6.5 7.8-1.3 0-2.5-.7-2.9-1.5l-.8 3c-.3 1.1-1 2.5-1.5 3.3 1.1.4 2.3.5 3.6.5 5.5 0 10-4.5 10-9.8C22 6.4 17.5 2 12 2Z" />
        </svg>
      );
    case "LinkedIn":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={cls} aria-hidden>
          <path d="M6.5 9H4v11h2.5V9ZM5.2 4C4.3 4 3.5 4.8 3.5 5.7c0 .9.8 1.7 1.7 1.7.9 0 1.7-.8 1.7-1.7C6.9 4.8 6.1 4 5.2 4ZM20 20h-2.5v-5.4c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V20H11V9h2.4v1.5c.3-.6 1.2-1.8 3.1-1.8 3.3 0 3.9 2.2 3.9 5V20Z" />
        </svg>
      );
    default:
      return null;
  }
}
