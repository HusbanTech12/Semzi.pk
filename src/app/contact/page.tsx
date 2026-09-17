"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Mail, MapPin, Phone } from "lucide-react";
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import GlowFrame from "@/components/GlowFrame";
import { useAnimations } from "@/lib/animations";
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
    a: "We offer free shipping on orders over PKR 5,000. Standard shipping takes 3–5 business days within Pakistan. Expedited options are available at checkout.",
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

const contactDetails = [
  {
    icon: Mail,
    title: "Email",
    body: "hello@semzi.com",
  },
  {
    icon: MapPin,
    title: "Studio",
    body: "Formulated in Pakistan",
  },
  {
    icon: Phone,
    title: "WhatsApp",
    body: "Chat with us anytime",
  },
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { cardHover } = useAnimations();

  return (
    <>
      <Navbar />
      <main className="bg-background pt-20">
        <section className="relative overflow-hidden py-20 lg:py-28">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_10%,rgba(201,163,107,0.14),transparent_55%)]" />
          <div className="ambient-glow pointer-events-none absolute right-[12%] top-10 h-56 w-56 rounded-full bg-accent/25 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
            <Reveal className="mb-14 space-y-4 text-center">
              <p className="text-xs uppercase tracking-[0.2em] text-accent">
                Get in Touch
              </p>
              <h1 className="font-serif text-4xl text-foreground md:text-5xl">
                We&apos;d Love to Hear from You
              </h1>
              <p className="mx-auto max-w-xl text-foreground-muted">
                Have a question about ingredients, shipping, or just want to say hello?
                Reach out — we reply within 24 hours.
              </p>
            </Reveal>

            <div className="mb-16 grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
              <Reveal direction="left" className="lg:col-span-5">
                <GlowFrame className="aspect-4/3 shadow-xl shadow-foreground/5">
                  <Image
                    src="/images/pages/contact-studio-still.png"
                    alt="Semzi studio still life with artisan soap packaging"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-foreground/40 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-subtle">
                      Studio Notes
                    </p>
                    <p className="mt-1 font-serif text-lg italic text-white/95">
                      Honest formulas. Patient craft. Real replies.
                    </p>
                  </div>
                </GlowFrame>
              </Reveal>

              <Reveal direction="right" className="lg:col-span-7">
                <div className="grid gap-4 sm:grid-cols-3">
                  {contactDetails.map((item) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.title}
                        {...cardHover}
                        className="rounded-2xl border border-border/70 bg-surface p-5 card-glow-brown"
                      >
                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-accent-subtle text-accent-strong">
                          <Icon className="h-4 w-4" />
                        </div>
                        <h3 className="text-sm font-semibold text-foreground">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-sm text-foreground-muted">{item.body}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </Reveal>
            </div>

            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <Reveal direction="left">
                <motion.form
                  {...cardHover}
                  className="space-y-4 rounded-2xl border border-border/70 bg-surface p-6 card-glow-brown sm:p-8"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-wider text-foreground-muted">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your name"
                      className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm transition-shadow focus:border-accent focus:outline-none focus:shadow-[0_0_0_3px_rgba(201,163,107,0.18)]"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-wider text-foreground-muted">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm transition-shadow focus:border-accent focus:outline-none focus:shadow-[0_0_0_3px_rgba(201,163,107,0.18)]"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-wider text-foreground-muted">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="How can we help?"
                      className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm transition-shadow focus:border-accent focus:outline-none focus:shadow-[0_0_0_3px_rgba(201,163,107,0.18)]"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-wider text-foreground-muted">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Write your message..."
                      className="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 text-sm transition-shadow focus:border-accent focus:outline-none focus:shadow-[0_0_0_3px_rgba(201,163,107,0.18)]"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full rounded-lg bg-accent py-3 text-sm uppercase tracking-wider text-background shadow-[0_10px_30px_-12px_rgba(142,106,56,0.65)] transition-colors hover:bg-accent-strong"
                  >
                    Send Message
                  </motion.button>
                </motion.form>
              </Reveal>

              <Reveal direction="right" className="space-y-6">
                <h3 className="font-serif text-xl text-foreground">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-3">
                  {faqs.map((faq, i) => (
                    <motion.div
                      key={faq.q}
                      {...cardHover}
                      className="overflow-hidden rounded-xl border border-border bg-surface card-glow-brown"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="flex w-full items-center justify-between px-4 py-3.5 text-left text-sm text-foreground transition-colors hover:bg-surface-muted/50"
                      >
                        <span className="pr-4 font-medium">{faq.q}</span>
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 shrink-0 text-foreground-muted transition-transform",
                            openFaq === i && "rotate-180 text-accent"
                          )}
                        />
                      </button>
                      <AnimatePresence>
                        {openFaq === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="px-4 pb-4 text-sm leading-relaxed text-foreground-muted">
                              {faq.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
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
