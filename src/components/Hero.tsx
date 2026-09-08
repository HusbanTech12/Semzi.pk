"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const durationRef = useRef(0);
  const targetProgressRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const videoScale = useTransform(scrollYProgress, [0, 0.85, 1], [1.08, 1, 0.92]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.22, 0.12, 0.18, 0.08]);
  const creamFade = useTransform(scrollYProgress, [0.86, 1], [0, 1]);
  const introOpacity = useTransform(scrollYProgress, [0, 0.05, 0.16, 0.24], [1, 1, 0.9, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.24], [0, -28]);
  const craftOpacity = useTransform(scrollYProgress, [0.2, 0.28, 0.42, 0.5], [0, 1, 1, 0]);
  const craftY = useTransform(scrollYProgress, [0.2, 0.5], [28, -28]);
  const honestOpacity = useTransform(scrollYProgress, [0.46, 0.54, 0.68, 0.76], [0, 1, 1, 0]);
  const honestY = useTransform(scrollYProgress, [0.46, 0.76], [28, -28]);
  const ctaOpacity = useTransform(scrollYProgress, [0.72, 0.82, 0.92, 1], [0, 1, 1, 0.35]);
  const ctaY = useTransform(scrollYProgress, [0.72, 0.86], [32, 0]);
  const ctaPointer = useTransform(scrollYProgress, (value) =>
    value > 0.78 && value < 0.96 ? "auto" : "none"
  );
  const hintOpacity = useTransform(scrollYProgress, [0, 0.07], [1, 0]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onMeta = () => {
      durationRef.current = video.duration || 0;
    };

    video.pause();
    video.addEventListener("loadedmetadata", onMeta);
    if (video.readyState >= 1) onMeta();

    return () => video.removeEventListener("loadedmetadata", onMeta);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    targetProgressRef.current = progress;
  });

  useEffect(() => {
    if (prefersReducedMotion) return;
    const video = videoRef.current;
    if (!video) return;

    let frame = 0;

    const tick = () => {
      const duration = durationRef.current;
      if (duration && video.readyState >= 2) {
        const target = targetProgressRef.current * Math.max(duration - 0.05, 0);
        const current = video.currentTime;
        const delta = target - current;
        if (Math.abs(delta) > 0.012) {
          const next = Math.abs(delta) > 0.45 ? target : current + delta * 0.28;
          if (typeof video.fastSeek === "function" && Math.abs(delta) > 0.45) {
            video.fastSeek(next);
          } else {
            video.currentTime = next;
          }
        }
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="scroll-hero"
      className={prefersReducedMotion ? "relative h-screen" : "relative h-[480vh]"}
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-foreground">
        <motion.video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          poster="/images/products-img/beach-soap1.png"
          disablePictureInPicture
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden="true"
          style={{ scale: prefersReducedMotion ? 1 : videoScale }}
        >
          <source src="/videos/organic-soap.mp4" type="video/mp4" />
          <source src="/videos/Animated.mp4" type="video/mp4" />
        </motion.video>

        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-foreground/50 via-transparent to-foreground/70"
          style={{ opacity: prefersReducedMotion ? 0.4 : overlayOpacity }}
        />

        <motion.div
          className="pointer-events-none absolute inset-0 bg-background"
          style={{ opacity: prefersReducedMotion ? 0 : creamFade }}
        />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end justify-center px-6 pb-28 lg:px-8">
          {prefersReducedMotion ? (
            <div className="mb-8 max-w-2xl space-y-8 text-center">
              <HeroIntro />
              <HeroCtas />
            </div>
          ) : (
            <>
              <motion.div
                className="pointer-events-none absolute inset-x-6 bottom-28 text-center lg:inset-x-8"
                style={{ opacity: introOpacity, y: introY }}
              >
                <HeroIntro />
              </motion.div>

              <motion.div
                className="pointer-events-none absolute inset-x-6 bottom-28 text-center lg:inset-x-8"
                style={{ opacity: craftOpacity, y: craftY }}
              >
                <Chapter
                  eyebrow="Small Batch"
                  title="Crafted slowly."
                  italic="Poured with care."
                  body="Every frame is a ritual — oils, botanicals, and patience, never a factory line."
                />
              </motion.div>

              <motion.div
                className="pointer-events-none absolute inset-x-6 bottom-28 text-center lg:inset-x-8"
                style={{ opacity: honestOpacity, y: honestY }}
              >
                <Chapter
                  eyebrow="Full INCI"
                  title="Honest ingredients."
                  italic="Nothing to hide."
                  body="What you see on the label is exactly what touches your skin."
                />
              </motion.div>

              <motion.div
                className="absolute inset-x-6 bottom-28 text-center lg:inset-x-8"
                style={{ opacity: ctaOpacity, y: ctaY, pointerEvents: ctaPointer }}
              >
                <div className="mx-auto max-w-xl space-y-7">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-accent">
                    Carry the Beach Home
                  </p>
                  <h2 className="font-serif text-4xl leading-tight text-white md:text-6xl">
                    Begin the ritual.
                  </h2>
                  <HeroCtas />
                </div>
              </motion.div>
            </>
          )}
        </div>

        {!prefersReducedMotion && (
          <>
            <motion.div
              className="pointer-events-none absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
              style={{ opacity: hintOpacity }}
            >
              <span className="text-[10px] uppercase tracking-[0.35em] text-white/70">
                Scroll
              </span>
              <span className="h-10 w-px bg-gradient-to-b from-accent to-transparent" />
            </motion.div>
            <div className="absolute bottom-0 left-0 right-0 z-10 h-[2px] bg-white/10">
              <motion.div className="h-full bg-accent" style={{ width: progressWidth }} />
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function Chapter({
  eyebrow,
  title,
  italic,
  body,
}: {
  eyebrow: string;
  title: string;
  italic: string;
  body: string;
}) {
  return (
    <div className="mx-auto max-w-xl space-y-4">
      <p className="text-[11px] uppercase tracking-[0.3em] text-accent">{eyebrow}</p>
      <h2 className="font-serif text-4xl leading-tight text-white md:text-6xl">
        {title}
        <br />
        <span
          className="italic text-accent"
          style={{ fontFamily: "var(--font-instrument-serif)" }}
        >
          {italic}
        </span>
      </h2>
      <p className="mx-auto max-w-md text-white/75">{body}</p>
    </div>
  );
}

function HeroIntro() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <p className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-accent">
        <span className="h-px w-8 bg-accent" />
        Beach Collection 2026
      </p>
      <h1 className="font-serif text-5xl leading-[0.95] text-white md:text-7xl lg:text-8xl">
        Natural Soap.
        <br />
        <span
          className="inline-block bg-gradient-to-r from-accent to-accent-strong bg-clip-text italic text-transparent"
          style={{ fontFamily: "var(--font-instrument-serif)" }}
        >
          Nothing Harsh.
        </span>
      </h1>
      <p className="mx-auto max-w-md text-base leading-relaxed text-white/75 md:text-lg">
        Scroll to watch a bar take shape — small-batch soap, made by hand.
      </p>
    </div>
  );
}

function HeroCtas() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-5">
      <Link
        href="/shop"
        className="group relative overflow-hidden rounded-lg bg-accent px-10 py-4 text-sm font-medium uppercase tracking-[0.15em] text-background"
      >
        <span className="relative z-10">Shop All</span>
        <span className="absolute inset-0 bg-accent-strong opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </Link>
      <Link
        href="/about"
        className="rounded-lg border border-accent/40 px-10 py-4 text-sm font-medium uppercase tracking-[0.15em] text-accent transition-all duration-300 hover:border-accent hover:bg-accent hover:text-background"
      >
        Our Story
      </Link>
    </div>
  );
}
