"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import BrandLoader from "@/components/BrandLoader";
import { useAnimations } from "@/lib/animations";

function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const sync = () => {
      const coarse = window.matchMedia("(pointer: coarse)").matches;
      const noHover = window.matchMedia("(hover: none)").matches;
      const touchPoints = navigator.maxTouchPoints > 0;
      setIsTouch(coarse || noHover || touchPoints);
    };

    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  return isTouch;
}

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const isTouch = useIsTouchDevice();
  const useAutoplay = prefersReducedMotion || isTouch;
  const { fadeLeft } = useAnimations();

  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const durationRef = useRef(0);
  const targetProgressRef = useRef(0);

  const [videoReady, setVideoReady] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const showLoader = !videoReady || !minTimeElapsed;
  const headingReady = !showLoader;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const progressWidth = useTransform(scrollYProgress, [0, 0.92], ["0%", "100%"]);

  useEffect(() => {
    const holdMs = prefersReducedMotion ? 400 : 1600;
    const timer = window.setTimeout(() => setMinTimeElapsed(true), holdMs);
    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const markReady = () => setVideoReady(true);
    const onMeta = () => {
      durationRef.current = video.duration || 0;
    };

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.disablePictureInPicture = true;
    video.controls = false;

    video.addEventListener("loadedmetadata", onMeta);
    video.addEventListener("canplay", markReady);
    video.addEventListener("loadeddata", markReady);
    video.addEventListener("playing", markReady);

    if (useAutoplay) {
      video.loop = true;
      const tryPlay = () => {
        video.muted = true;
        void video.play().catch(() => undefined);
      };

      tryPlay();
      video.addEventListener("canplay", tryPlay);
      const retry = window.setTimeout(tryPlay, 250);

      return () => {
        window.clearTimeout(retry);
        video.removeEventListener("canplay", tryPlay);
        video.removeEventListener("loadedmetadata", onMeta);
        video.removeEventListener("canplay", markReady);
        video.removeEventListener("loadeddata", markReady);
        video.removeEventListener("playing", markReady);
      };
    }

    video.pause();
    video.load();
    if (video.readyState >= 1) onMeta();
    if (video.readyState >= 2) markReady();

    return () => {
      video.removeEventListener("loadedmetadata", onMeta);
      video.removeEventListener("canplay", markReady);
      video.removeEventListener("loadeddata", markReady);
      video.removeEventListener("playing", markReady);
    };
  }, [useAutoplay]);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (useAutoplay) return;
    targetProgressRef.current = Math.min(progress / 0.92, 1);
  });

  useEffect(() => {
    if (useAutoplay) return;
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
          try {
            video.currentTime = Math.abs(delta) > 0.4 ? target : current + delta * 0.3;
          } catch {
            // Some browsers reject seeks while not fully ready
          }
        }
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [useAutoplay]);

  return (
    <section
      ref={sectionRef}
      id="scroll-hero"
      aria-label="Semzi Beach Collection film"
      className={useAutoplay ? "relative h-screen" : "relative h-[200vh]"}
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-foreground">
        <AnimatePresence>
          {showLoader && (
            <motion.div
              className="absolute inset-0 z-30"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <BrandLoader className="h-full w-full" label="Loading Semzi film" />
            </motion.div>
          )}
        </AnimatePresence>

        <video
          ref={videoRef}
          autoPlay
          muted
          loop={useAutoplay}
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          poster="/videos/soap-preview.jpg"
          className="absolute inset-0 h-full w-full object-cover [&::-webkit-media-controls]:hidden [&::-webkit-media-controls-start-playback-button]:hidden [&::-webkit-media-controls-enclosure]:hidden"
        >
          <source src="/videos/Soap1.mp4" type="video/mp4" />
        </video>

        {/* Soft left vignette so white copy stays readable over the film */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-linear-to-r from-foreground/75 via-foreground/35 to-transparent sm:via-foreground/25"
        />

        {/* Heading — slides in from left after the brand loader exits */}
        <div className="absolute inset-0 z-10 flex items-center overflow-hidden">
          <div className="w-full max-w-7xl pl-5 pr-6 pt-16 sm:pl-8 lg:pl-12 xl:pl-16">
            <div className="max-w-lg space-y-6 sm:space-y-7">
              <motion.p
                initial={fadeLeft.initial}
                animate={headingReady ? fadeLeft.animate : fadeLeft.initial}
                transition={{ ...(fadeLeft.transition ?? {}), delay: headingReady ? 0.08 : 0 }}
                className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-accent"
              >
                Handmade · Small Batch · Honest
              </motion.p>

              <motion.h1
                initial={fadeLeft.initial}
                animate={headingReady ? fadeLeft.animate : fadeLeft.initial}
                transition={{ ...(fadeLeft.transition ?? {}), duration: 0.85, delay: headingReady ? 0.2 : 0 }}
                className="font-serif text-3xl font-bold leading-[1.2] sm:text-4xl lg:text-5xl"
              >
                <span className="bg-linear-to-r from-white via-accent-subtle to-accent bg-clip-text text-transparent drop-shadow-[0_2px_24px_rgba(201,163,107,0.45)]">
                  Natural Soap
                </span>
                <br />
                <span className="bg-linear-to-r from-white via-accent-subtle to-accent bg-clip-text text-transparent drop-shadow-[0_2px_24px_rgba(201,163,107,0.45)]">
                  Nothing Harsh
                </span>
              </motion.h1>

              <motion.p
                initial={fadeLeft.initial}
                animate={headingReady ? fadeLeft.animate : fadeLeft.initial}
                transition={{ ...(fadeLeft.transition ?? {}), delay: headingReady ? 0.36 : 0 }}
                className="mt-2 max-w-md text-sm font-medium leading-relaxed text-white/80 sm:mt-3 sm:text-base"
              >
                Handcrafted skin and hair care — an ancient craft, newly made,
                honestly.
              </motion.p>

              <motion.div
                initial={fadeLeft.initial}
                animate={headingReady ? fadeLeft.animate : fadeLeft.initial}
                transition={{ ...(fadeLeft.transition ?? {}), delay: headingReady ? 0.5 : 0 }}
                className="flex flex-wrap items-center gap-3 pt-3 sm:pt-4"
              >
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 rounded-xl bg-accent px-7 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.15em] text-background transition-colors duration-300 hover:bg-accent-strong"
                >
                  Shop All
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/35 bg-white/10 px-7 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.15em] text-white backdrop-blur-sm transition-all duration-300 hover:border-white/60 hover:bg-white/20"
                >
                  Our Ethos
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        {!useAutoplay && (
          <div className="absolute bottom-0 left-0 right-0 z-10 h-0.5 bg-white/10">
            <motion.div className="h-full bg-accent" style={{ width: progressWidth }} />
          </div>
        )}
      </div>
    </section>
  );
}
