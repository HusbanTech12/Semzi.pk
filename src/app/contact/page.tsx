"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Mail, MapPin, Phone } from "lucide-react";
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "How long do your products last?",
    a: "Our artisan soaps last 4-6 weeks with daily use when kept in a dry soap dish between uses. Shampoos should be used within 12 months of opening.",
  },
  {
    q: "Are your products safe for sensitive skin?",
    a: "Yes, our products are formulated with sensitive skin in mind. We avoid common irritants like sulfates, parabens, and synthetic fragrances. We always recommend a patch test before first use.",
  },
  {
    q: "What is your shipping policy?",
    a: "We offer free shipping on orders over $50. Standard shipping takes 5-7 business days within the continental US. Expedited options are available at checkout.",
  },
  {
    q: "What is your return policy?",
    a: "We stand by our products. If you're not satisfied, contact us within 30 days of delivery for a full refund or exchange. Products must be at least 75% unused.",
  },
  {
    q: "Do you test on animals?",
    a: "Never. Semzi is 100% cruelty-free. We never test on animals, and we only work with suppliers who share this commitment.",
  },
  {
    q: "What does INCI mean on your labels?",
    a: "INCI stands for International Nomenclature of Cosmetic Ingredients. It's the standard system for listing ingredients on cosmetic products. We list all our ingredients in INCI format for full transparency.",
  },
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <Reveal className="text-center mb-16 space-y-4">
              <p className="text-xs tracking-[0.2em] uppercase text-accent">
                Get in Touch
              </p>
              <h1 className="font-serif text-4xl md:text-5xl text-foreground">
                We&apos;d Love to Hear from You
              </h1>
              <p className="text-foreground-muted max-w-xl mx-auto">
                Have a question about ingredients, shipping, or just want to say hello?
                Reach out — we reply within 24 hours.
              </p>
            </Reveal>

            <div className="grid lg:grid-cols-2 gap-16">
              <Reveal direction="left" className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs tracking-wider uppercase text-foreground-muted mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your name"
                      className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-wider uppercase text-foreground-muted mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-wider uppercase text-foreground-muted mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="How can we help?"
                      className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-wider uppercase text-foreground-muted mb-2">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Write your message..."
                      className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:border-accent resize-none"
                    />
                  </div>
                  <button className="w-full py-3 bg-accent text-background text-sm tracking-wider uppercase rounded-lg hover:bg-accent-strong transition-all">
                    Send Message
                  </button>
                </div>
              </Reveal>

              <Reveal direction="right" className="space-y-8">
                <div className="space-y-6">
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-accent-subtle flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">Email</h3>
                      <p className="text-sm text-foreground-muted">hello@semzi.com</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-accent-subtle flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">Studio</h3>
                      <p className="text-sm text-foreground-muted">
                        742 Coastline Drive<br />
                        Santa Monica, CA 90401
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-accent-subtle flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">Phone</h3>
                      <p className="text-sm text-foreground-muted">+1 (555) 123-4567</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-8">
                  <h3 className="font-serif text-xl text-foreground mb-6">
                    Frequently Asked Questions
                  </h3>
                  <div className="space-y-2">
                    {faqs.map((faq, i) => (
                      <div key={i} className="border border-border rounded-lg overflow-hidden">
                        <button
                          onClick={() => setOpenFaq(openFaq === i ? null : i)}
                          className="w-full flex items-center justify-between px-4 py-3 text-sm text-left text-foreground hover:bg-surface-muted/50 transition-colors"
                        >
                          <span>{faq.q}</span>
                          <ChevronDown className={cn(
                            "w-4 h-4 text-foreground-muted transition-transform shrink-0",
                            openFaq === i && "rotate-180"
                          )} />
                        </button>
                        <AnimatePresence>
                          {openFaq === i && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <p className="px-4 pb-3 text-sm text-foreground-muted leading-relaxed">
                                {faq.a}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
