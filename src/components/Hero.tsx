"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import BrandLoader from "@/components/BrandLoader";

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const durationRef = useRef(0);
  const targetProgressRef = useRef(0);
  const soundOnRef = useRef(false);
  const [soundOn, setSoundOn] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const showLoader = !videoReady || !minTimeElapsed;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const creamFade = useTransform(scrollYProgress, [0.9, 1], [0, 1]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const holdMs = prefersReducedMotion ? 400 : 3200;
    const timer = window.setTimeout(() => setMinTimeElapsed(true), holdMs);
    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onMeta = () => {
      durationRef.current = video.duration || 0;
    };
    const onReady = () => setVideoReady(true);

    video.muted = true;
    video.pause();
    video.addEventListener("loadedmetadata", onMeta);
    video.addEventListener("canplay", onReady);
    video.addEventListener("loadeddata", onReady);
    if (video.readyState >= 1) onMeta();
    if (video.readyState >= 3) onReady();
    return () => {
      video.removeEventListener("loadedmetadata", onMeta);
      video.removeEventListener("canplay", onReady);
      video.removeEventListener("loadeddata", onReady);
    };
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
      if (!soundOnRef.current) {
        const duration = durationRef.current;
        if (duration && video.readyState >= 2) {
          const target = targetProgressRef.current * Math.max(duration - 0.05, 0);
          const current = video.currentTime;
          const delta = target - current;
          if (Math.abs(delta) > 0.012) {
            video.currentTime = Math.abs(delta) > 0.4 ? target : current + delta * 0.3;
          }
        }
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [prefersReducedMotion]);

  async function toggleSound() {
    const video = videoRef.current;
    if (!video) return;

    if (soundOnRef.current) {
      video.muted = true;
      video.pause();
      soundOnRef.current = false;
      setSoundOn(false);
      return;
    }

    video.muted = false;
    video.volume = 1;
    video.loop = true;
    try {
      await video.play();
      soundOnRef.current = true;
      setSoundOn(true);
    } catch {
      video.muted = true;
    }
  }

  return (
    <section
      ref={sectionRef}
      id="scroll-hero"
      className={prefersReducedMotion ? "relative h-screen" : "relative h-[400vh]"}
    >
      <h1 className="sr-only">Semzi — Natural soap, nothing harsh</h1>
      <div className="sticky top-0 h-screen overflow-hidden bg-foreground">
        <AnimatePresence>
          {showLoader && (
            <motion.div
              className="absolute inset-0 z-30"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <BrandLoader className="h-full w-full" />
            </motion.div>
          )}
        </AnimatePresence>

        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          autoPlay={!!prefersReducedMotion}
          loop
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/videos/SOAP.mp4" type="video/mp4" />
        </video>

        <motion.div
          className="pointer-events-none absolute inset-0 bg-background"
          style={{ opacity: prefersReducedMotion ? 0 : creamFade }}
        />

        {!showLoader && (
          <button
            type="button"
            onClick={toggleSound}
            aria-pressed={soundOn}
            aria-label={soundOn ? "Mute video" : "Play video sound"}
            className="absolute bottom-6 right-6 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-foreground/50 text-white backdrop-blur-sm transition-colors hover:bg-accent hover:text-foreground"
          >
            {soundOn ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
          </button>
        )}

        {!prefersReducedMotion && (
          <div className="absolute bottom-0 left-0 right-0 z-10 h-0.5 bg-white/10">
            <motion.div className="h-full bg-accent" style={{ width: progressWidth }} />
          </div>
        )}
      </div>
    </section>
  );
}
