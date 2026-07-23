import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { CartProvider } from "@/context/cart-context";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Semzi | Natural Soap. Nothing Harsh.",
    template: "%s | Semzi",
  },
  description:
    "Handmade natural soap crafted in small batches. Full INCI ingredient transparency, seasonal collections, and gift-worthy packaging.",
  metadataBase: new URL("https://semzi.com"),
  openGraph: {
    title: "Semzi | Natural Soap. Nothing Harsh.",
    description:
      "Handmade natural soap crafted in small batches with full ingredient transparency.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${dmSans.variable} ${playfair.variable} antialiased`}
      >
        <body className="min-h-full">
          <CartProvider>{children}</CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
