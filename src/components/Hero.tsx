"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import BrandLoader from "@/components/BrandLoader";

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

  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const durationRef = useRef(0);
  const targetProgressRef = useRef(0);

  const [videoReady, setVideoReady] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const showLoader = !videoReady || !minTimeElapsed;

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

  // Keep video ready + autoplay on mobile / reduced motion
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
      // iOS often needs a second attempt after a short delay
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

  // Desktop scroll scrub only
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

        {!useAutoplay && (
          <div className="absolute bottom-0 left-0 right-0 z-10 h-0.5 bg-white/10">
            <motion.div className="h-full bg-accent" style={{ width: progressWidth }} />
          </div>
        )}
      </div>
    </section>
  );
}
