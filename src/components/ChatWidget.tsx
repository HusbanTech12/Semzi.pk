"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageCircle, Send, X, Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import SemziLogo from "@/components/SemziLogo";

type UiMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const STARTERS = [
  "Which soap is best for dry skin?",
  "Tell me about Clarity shampoo",
  "What's in your Hair Rituals line?",
];

function renderContent(text: string) {
  const parts = text.split(/(\/[a-z0-9\-_/]+)/gi);
  return parts.map((part, i) => {
    if (part.startsWith("/") && part.length > 1 && !part.includes(" ")) {
      return (
        <Link
          key={`${part}-${i}`}
          href={part}
          className="font-medium text-accent-strong underline underline-offset-2 hover:text-accent"
        >
          {part}
        </Link>
      );
    }
    return <span key={`${i}-${part.slice(0, 8)}`}>{part}</span>;
  });
}

export default function ChatWidget() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<UiMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi — I'm the Semzi assistant. Ask about soaps, shampoos, ingredients, or which ritual fits your skin.",
    },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const hidden = pathname?.startsWith("/admin") || pathname?.startsWith("/sign-");

  useEffect(() => {
    if (!open) return;
    bottomRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  }, [messages, open, loading, reduceMotion]);

  useEffect(() => {
    if (open) {
      const t = window.setTimeout(() => inputRef.current?.focus(), 120);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  if (hidden) return null;

  async function sendMessage(text: string) {
    const content = text.trim();
    if (!content || loading) return;

    setError(null);
    setInput("");
    const userMsg: UiMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content,
    };
    const next = [...messages, userMsg];
    setMessages(next);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next
            .filter((m) => m.id !== "welcome")
            .map(({ role, content: c }) => ({ role, content: c })),
        }),
      });
      const data = (await res.json()) as { reply?: string; error?: string };
      if (!res.ok) {
        throw new Error(data.error || "Request failed");
      }
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: "assistant",
          content: data.reply || "I couldn't find a reply.",
        },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    void sendMessage(input);
  }

  return (
    <div className="pointer-events-none fixed right-4 bottom-24 z-50 sm:right-6 sm:bottom-6">
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto mb-3 flex h-[min(560px,70vh)] w-[min(100vw-2rem,380px)] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-[0_24px_60px_-20px_rgba(43,33,24,0.35)]"
            role="dialog"
            aria-label="Semzi chat assistant"
          >
            <div className="flex items-center justify-between gap-3 border-b border-border bg-surface-muted/80 px-4 py-3">
              <div className="flex min-w-0 items-center gap-3">
                <SemziLogo className="h-7 shrink-0" />
                <div className="min-w-0">
                  <p className="truncate font-serif text-sm font-semibold text-foreground">
                    Semzi Assistant
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-2 text-foreground-muted transition-colors hover:bg-accent-subtle hover:text-foreground"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "rounded-br-md bg-accent text-background"
                        : "rounded-bl-md border border-border bg-surface text-foreground"
                    }`}
                  >
                    {renderContent(m.content)}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-2xl rounded-bl-md border border-border bg-surface px-3.5 py-2.5 text-sm text-foreground-muted">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Thinking…
                  </div>
                </div>
              )}

              {error && (
                <p className="rounded-xl bg-destructive/10 px-3 py-2 text-xs text-destructive">
                  {error}
                </p>
              )}

              {messages.length <= 1 && !loading && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {STARTERS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => void sendMessage(s)}
                      className="rounded-full border border-border bg-surface px-3 py-1.5 text-left text-[11px] text-foreground-muted transition-colors hover:border-accent hover:text-foreground"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <form
              onSubmit={onSubmit}
              className="flex items-center gap-2 border-t border-border bg-surface px-3 py-3"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about soap or shampoo…"
                disabled={loading}
                className="min-w-0 flex-1 rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-foreground-muted/60 focus:border-accent focus:outline-none"
                maxLength={2000}
                aria-label="Chat message"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-background transition-colors hover:bg-accent-strong disabled:opacity-40"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent text-background shadow-[0_12px_32px_-8px_rgba(167,124,59,0.65)] transition-colors hover:bg-accent-strong"
        aria-label={open ? "Close chat" : "Open Semzi assistant"}
        whileHover={reduceMotion ? undefined : { scale: 1.04 }}
        whileTap={reduceMotion ? undefined : { scale: 0.96 }}
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </motion.button>
    </div>
  );
}
