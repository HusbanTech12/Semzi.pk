export type ToastVariant = "default" | "success" | "error" | "info";

export type ToastInput = {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
};

export type Toast = ToastInput & {
  id: string;
  variant: ToastVariant;
  duration: number;
};

type Listener = (toasts: Toast[]) => void;

let toasts: Toast[] = [];
const listeners = new Set<Listener>();

function emit() {
  listeners.forEach((listener) => listener(toasts));
}

function uid() {
  return `toast-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function subscribeToasts(listener: Listener) {
  listeners.add(listener);
  listener(toasts);
  return () => {
    listeners.delete(listener);
  };
}

export function dismissToast(id: string) {
  toasts = toasts.filter((t) => t.id !== id);
  emit();
}

export function toast(input: ToastInput | string) {
  const payload: ToastInput =
    typeof input === "string" ? { title: input } : input;

  const next: Toast = {
    id: uid(),
    title: payload.title,
    description: payload.description,
    variant: payload.variant ?? "default",
    duration: payload.duration ?? 3600,
    action: payload.action,
  };

  toasts = [next, ...toasts].slice(0, 4);
  emit();

  if (typeof window !== "undefined" && next.duration > 0) {
    window.setTimeout(() => dismissToast(next.id), next.duration);
  }

  return next.id;
}

toast.success = (title: string, description?: string) =>
  toast({ title, description, variant: "success" });

toast.error = (title: string, description?: string) =>
  toast({ title, description, variant: "error" });

toast.info = (title: string, description?: string) =>
  toast({ title, description, variant: "info" });
