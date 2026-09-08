import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import CollectionShowcase from "@/components/CollectionShowcase";
import FeaturedProducts from "@/components/store/home/FeaturedProducts";
import BrandStory from "@/components/BrandStory";
import IngredientStrip from "@/components/IngredientStrip";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <CollectionShowcase />
        <FeaturedProducts />
        <BrandStory />
        <IngredientStrip />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
