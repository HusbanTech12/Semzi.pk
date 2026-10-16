"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Info, AlertCircle, X, ShoppingBag } from "lucide-react";
import {
  dismissToast,
  subscribeToasts,
  type Toast,
  type ToastVariant,
} from "@/lib/toast";
import { cn } from "@/lib/utils";

const variantStyles: Record<
  ToastVariant,
  { bar: string; icon: string; Icon: typeof CheckCircle2 }
> = {
  default: {
    bar: "bg-accent",
    icon: "text-accent-strong",
    Icon: ShoppingBag,
  },
  success: {
    bar: "bg-success",
    icon: "text-success",
    Icon: CheckCircle2,
  },
  error: {
    bar: "bg-destructive",
    icon: "text-destructive",
    Icon: AlertCircle,
  },
  info: {
    bar: "bg-accent-strong",
    icon: "text-accent-strong",
    Icon: Info,
  },
};

function ToastCard({ item }: { item: Toast }) {
  const reduceMotion = useReducedMotion();
  const style = variantStyles[item.variant];
  const Icon = style.Icon;

  return (
    <motion.div
      layout
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.96 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      role="status"
      aria-live="polite"
      className="pointer-events-auto relative w-full overflow-hidden rounded-2xl border border-border/80 bg-surface/95 shadow-[0_20px_50px_-18px_rgba(28,22,18,0.35),0_0_0_1px_rgba(199,154,86,0.08)] backdrop-blur-xl"
    >
      <div className={cn("absolute inset-y-0 left-0 w-1", style.bar)} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_100%_0%,rgba(201,163,107,0.12),transparent_55%)]" />

      <div className="relative flex gap-3 px-4 py-3.5 pl-5">
        <div
          className={cn(
            "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-subtle/70",
            style.icon
          )}
        >
          <Icon className="h-4 w-4" />
        </div>

        <div className="min-w-0 flex-1 pt-0.5">
          <p className="font-serif text-[15px] font-semibold leading-snug text-foreground">
            {item.title}
          </p>
          {item.description && (
            <p className="mt-0.5 text-sm leading-relaxed text-foreground-muted">
              {item.description}
            </p>
          )}
          {item.action && (
            <button
              type="button"
              onClick={() => {
                item.action?.onClick();
                dismissToast(item.id);
              }}
              className="mt-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-accent-strong transition-colors hover:text-accent"
            >
              {item.action.label}
            </button>
          )}
        </div>

        <button
          type="button"
          aria-label="Dismiss notification"
          onClick={() => dismissToast(item.id)}
          className="shrink-0 rounded-full p-1.5 text-foreground-muted transition-colors hover:bg-accent/10 hover:text-foreground"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </motion.div>
  );
}

export default function Toaster() {
  const [items, setItems] = useState<Toast[]>([]);

  useEffect(() => subscribeToasts(setItems), []);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-20 z-[120] flex flex-col items-end gap-3 px-4 sm:top-24 sm:right-6 sm:left-auto sm:w-[380px] sm:px-0"
      aria-relevant="additions"
    >
      <AnimatePresence mode="popLayout">
        {items.map((item) => (
          <ToastCard key={item.id} item={item} />
        ))}
      </AnimatePresence>
    </div>
  );
}
