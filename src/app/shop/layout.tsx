import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop All",
  description:
    "Browse every Semzi bar, cream soap, and hair ritual — handmade in small batches with full INCI ingredient transparency.",
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
