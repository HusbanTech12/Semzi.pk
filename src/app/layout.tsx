import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "LUXE | Premium Soap & Shampoo",
    template: "%s | LUXE",
  },
  description:
    "Handcrafted premium soaps and shampoos made with natural, organic ingredients. Experience the art of luxurious bathing.",
  metadataBase: new URL("https://luxe.soap"),
  openGraph: {
    title: "LUXE | Premium Soap & Shampoo",
    description:
      "Handcrafted premium soaps and shampoos made with natural, organic ingredients.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${playfair.variable} antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
