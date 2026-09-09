"use client";

import { useEffect, useRef } from "react";
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

  const creamFade = useTransform(scrollYProgress, [0.9, 1], [0, 1]);
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
          video.currentTime = Math.abs(delta) > 0.4 ? target : current + delta * 0.3;
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
      className={prefersReducedMotion ? "relative h-screen" : "relative h-[400vh]"}
    >
      <h1 className="sr-only">Semzi — Natural soap, nothing harsh</h1>
      <div className="sticky top-0 h-screen overflow-hidden bg-foreground">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          autoPlay={!!prefersReducedMotion}
          loop={!!prefersReducedMotion}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/videos/SOAP.mp4" type="video/mp4" />
        </video>

        <motion.div
          className="pointer-events-none absolute inset-0 bg-background"
          style={{ opacity: prefersReducedMotion ? 0 : creamFade }}
        />

        {!prefersReducedMotion && (
          <div className="absolute bottom-0 left-0 right-0 z-10 h-0.5 bg-white/10">
            <motion.div className="h-full bg-accent" style={{ width: progressWidth }} />
          </div>
        )}
      </div>
    </section>
  );
}
