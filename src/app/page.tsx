import { Suspense } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ShopByCategory from "@/components/ShopByCategory";
import FeaturedProducts from "@/components/store/home/FeaturedProducts";
import FeaturedProductsFallback from "@/components/store/home/FeaturedProductsFallback";
import BrandStory from "@/components/BrandStory";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ShopByCategory />
        <Suspense fallback={<FeaturedProductsFallback />}>
          <FeaturedProducts />
        </Suspense>
        <BrandStory />
        <Features />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
