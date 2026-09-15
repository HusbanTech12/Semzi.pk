import type { Metadata } from "next";
import { DM_Sans, Playfair_Display, Instrument_Serif } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { CartProvider } from "@/context/cart-context";
import ChatWidget from "@/components/ChatWidget";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
});

export const metadata: Metadata = {
  title: {
    default: "Semzi | Natural Soap. Nothing Harsh.",
    template: "%s | Semzi",
  },
  description:
    "Handmade natural soap crafted with patience. Full INCI ingredient transparency, seasonal collections, and gift-worthy packaging.",
  metadataBase: new URL("https://semzi.com"),
  openGraph: {
    title: "Semzi | Natural Soap. Nothing Harsh.",
    description:
      "Handmade natural soap crafted with patience and care, with full ingredient transparency.",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    description:
      "Handmade natural soap crafted with patience and care, with full ingredient transparency.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      localization={{
        signUp: {
          start: {
            title: "Semzi",
            subtitle: "Welcome! Please fill in the details to get started.",
          },
        },
      }}
    >
      <html
        lang="en"
        className={`${dmSans.variable} ${playfair.variable} ${instrumentSerif.variable} antialiased`}
      >
        <body className="min-h-full">
          <CartProvider>
            {children}
            <WhatsAppWidget />
            <ChatWidget />
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
