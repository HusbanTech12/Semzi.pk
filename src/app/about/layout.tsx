import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story & Ethos",
  description:
    "Soap-making is an ancient craft. Semzi exists to bring that soul back — handcrafted in small batches, pH-balanced to work with your skin, and formulated with 100% honest transparency.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
