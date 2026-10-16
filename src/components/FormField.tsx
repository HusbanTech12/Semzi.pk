"use client";

import { cn } from "@/lib/utils";

type FormFieldProps = {
  id: string;
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
};

export function FormField({ id, label, error, className, children }: FormFieldProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label
        htmlFor={id}
        className="block text-xs uppercase tracking-wider text-foreground-muted"
      >
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function fieldClassName(error?: string, extra?: string) {
  return cn(
    "w-full rounded-lg border bg-surface px-4 py-3 text-sm transition-shadow focus:outline-none",
    error
      ? "border-destructive focus:border-destructive focus:shadow-[0_0_0_3px_rgba(180,67,46,0.15)]"
      : "border-border focus:border-accent focus:shadow-[0_0_0_3px_rgba(201,163,107,0.18)]",
    extra
  );
}
