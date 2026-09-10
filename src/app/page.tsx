import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ShopByCategory from "@/components/ShopByCategory";
import BrandStory from "@/components/BrandStory";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ShopByCategory />
        <BrandStory />
        <Features />
      </main>
      <Footer />
    </>
  );
}
