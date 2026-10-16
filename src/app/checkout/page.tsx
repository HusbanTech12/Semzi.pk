"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { ChevronLeft, Lock, Loader2, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { FormField, fieldClassName } from "@/components/FormField";
import { formatPkr, useCart } from "@/context/cart-context";
import { useAnimations } from "@/lib/animations";
import {
  collectErrors,
  firstError,
  validateCardExpiry,
  validateCardNumber,
  validateCvc,
  validateEmail,
  validateName,
  validatePhone,
  validateZip,
  required,
  type FieldErrors,
} from "@/lib/form-validation";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";

type Step = "information" | "shipping" | "payment";

const steps: { key: Step; label: string }[] = [
  { key: "information", label: "Information" },
  { key: "shipping", label: "Shipping" },
  { key: "payment", label: "Payment" },
];

type CheckoutForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  zip: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
  cardName: string;
};

const initialForm: CheckoutForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  apartment: "",
  city: "",
  state: "",
  zip: "",
  cardNumber: "",
  expiry: "",
  cvc: "",
  cardName: "",
};

const inputClass = (error?: string) => fieldClassName(error, "bg-background");

export default function CheckoutPage() {
  const [step, setStep] = useState<Step>("information");
  const [form, setForm] = useState<CheckoutForm>(initialForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const { items, totalCents, shippingCents, clearCart } = useCart();
  const { fadeUp } = useAnimations();
  const { userId } = useAuth();
  const router = useRouter();

  const currentIdx = steps.findIndex((s) => s.key === step);
  const grandTotal = totalCents + shippingCents;

  function setField<K extends keyof CheckoutForm>(key: K, value: CheckoutForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  }

  function validateInformation(): FieldErrors {
    return collectErrors([
      ["firstName", validateName(form.firstName, "First name")],
      ["lastName", validateName(form.lastName, "Last name")],
      ["email", validateEmail(form.email)],
      ["phone", validatePhone(form.phone, false)],
    ]);
  }

  function validateShipping(): FieldErrors {
    return collectErrors([
      ["address", required(form.address, "Street address")],
      ["city", required(form.city, "City")],
      ["state", required(form.state, "Province")],
      ["zip", validateZip(form.zip)],
    ]);
  }

  function validatePayment(): FieldErrors {
    return collectErrors([
      ["cardName", validateName(form.cardName, "Name on card")],
      ["cardNumber", validateCardNumber(form.cardNumber)],
      ["expiry", validateCardExpiry(form.expiry)],
      ["cvc", validateCvc(form.cvc)],
    ]);
  }

  function goToShipping(e: FormEvent) {
    e.preventDefault();
    const nextErrors = validateInformation();
    setErrors(nextErrors);
    const message = firstError(nextErrors);
    if (message) {
      toast.error("Check your details", message);
      return;
    }
    setStep("shipping");
    toast.info("Shipping details", "Where should we send your order?");
  }

  function goToPayment(e: FormEvent) {
    e.preventDefault();
    const nextErrors = validateShipping();
    setErrors(nextErrors);
    const message = firstError(nextErrors);
    if (message) {
      toast.error("Check shipping", message);
      return;
    }
    setStep("payment");
    toast.info("Payment", "Secure checkout — almost there.");
  }

  async function placeOrder(e: FormEvent) {
    e.preventDefault();
    if (submitting) return;

    if (items.length === 0) {
      toast.error("Cart is empty", "Add a product before checking out.");
      return;
    }
    const nextErrors = validatePayment();
    setErrors(nextErrors);
    const message = firstError(nextErrors);
    if (message) {
      toast.error("Check payment", message);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId ?? undefined,
          subtotalCents: totalCents,
          shippingCents,
          totalCents: grandTotal,
          shippingAddress: {
            email: form.email.trim(),
            phone: form.phone.trim(),
            firstName: form.firstName.trim(),
            lastName: form.lastName.trim(),
            name: `${form.firstName.trim()} ${form.lastName.trim()}`.trim(),
            address: form.address.trim(),
            apartment: form.apartment.trim() || undefined,
            city: form.city.trim(),
            state: form.state.trim(),
            zip: form.zip.trim(),
          },
          items: items.map((item) => ({
            variantId: item.variantId,
            productId: item.productId,
            quantity: item.quantity,
            priceCents: item.priceCents,
          })),
        }),
      });

      const data = (await res.json()) as {
        success?: boolean;
        orderId?: number;
        orderNumber?: string;
        error?: string;
      };

      if (!res.ok || !data.success || !data.orderNumber) {
        throw new Error(data.error || "Failed to place order");
      }

      clearCart();
      toast.success(
        "Order placed",
        `${data.orderNumber} — your Semzi ritual is on its way.`
      );
      router.push(
        `/order/success?order=${encodeURIComponent(data.orderNumber)}`
      );
    } catch (err) {
      toast.error(
        "Order failed",
        err instanceof Error ? err.message : "Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-20">
        <section className="relative overflow-hidden py-12 lg:py-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(201,163,107,0.12),transparent_50%)]" />

          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
            <Link
              href="/cart"
              className="mb-8 inline-flex items-center gap-1 text-sm text-foreground-muted transition-colors hover:text-accent"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Cart
            </Link>

            <Reveal className="mb-10 space-y-3 text-center">
              <p className="text-xs uppercase tracking-[0.2em] text-accent">
                Secure Checkout
              </p>
              <h1 className="font-serif text-3xl text-foreground md:text-4xl">
                Complete Your Order
              </h1>
              <p className="mx-auto max-w-md text-sm text-foreground-muted">
                Enter your details below. We deliver across Pakistan with care.
              </p>
            </Reveal>

            <div className="mb-10 flex items-center justify-center gap-2">
              {steps.map((s, i) => (
                <div key={s.key} className="flex items-center gap-2">
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full font-mono text-xs transition-colors",
                      i <= currentIdx
                        ? "bg-accent text-background"
                        : "bg-surface-muted text-foreground-muted"
                    )}
                  >
                    {i + 1}
                  </div>
                  <span
                    className={cn(
                      "hidden text-xs uppercase tracking-wider transition-colors sm:inline",
                      i <= currentIdx ? "text-foreground" : "text-foreground-muted"
                    )}
                  >
                    {s.label}
                  </span>
                  {i < steps.length - 1 && (
                    <div
                      className={cn(
                        "mx-1 h-px w-8 sm:w-12",
                        i < currentIdx ? "bg-accent" : "bg-border"
                      )}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
              <div className="lg:col-span-3">
                <motion.div
                  key={step}
                  {...fadeUp}
                  className="rounded-2xl border border-border/70 bg-surface p-6 card-glow-brown sm:p-8"
                >
                  {step === "information" && (
                    <form className="space-y-5" onSubmit={goToShipping} noValidate>
                      <div className="space-y-1">
                        <h2 className="font-serif text-2xl text-foreground">
                          Your Details
                        </h2>
                        <p className="text-sm text-foreground-muted">
                          We&apos;ll use these to confirm and deliver your order.
                        </p>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <FormField
                          id="firstName"
                          label="First name"
                          error={errors.firstName}
                        >
                          <input
                            id="firstName"
                            type="text"
                            name="firstName"
                            autoComplete="given-name"
                            value={form.firstName}
                            onChange={(e) => setField("firstName", e.target.value)}
                            aria-invalid={!!errors.firstName}
                            aria-describedby={
                              errors.firstName ? "firstName-error" : undefined
                            }
                            placeholder="First name"
                            className={inputClass(errors.firstName)}
                          />
                        </FormField>
                        <FormField
                          id="lastName"
                          label="Last name"
                          error={errors.lastName}
                        >
                          <input
                            id="lastName"
                            type="text"
                            name="lastName"
                            autoComplete="family-name"
                            value={form.lastName}
                            onChange={(e) => setField("lastName", e.target.value)}
                            aria-invalid={!!errors.lastName}
                            aria-describedby={
                              errors.lastName ? "lastName-error" : undefined
                            }
                            placeholder="Last name"
                            className={inputClass(errors.lastName)}
                          />
                        </FormField>
                      </div>

                      <FormField id="email" label="Email" error={errors.email}>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          autoComplete="email"
                          value={form.email}
                          onChange={(e) => setField("email", e.target.value)}
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? "email-error" : undefined}
                          placeholder="your@email.com"
                          className={inputClass(errors.email)}
                        />
                      </FormField>

                      <FormField id="phone" label="Phone" error={errors.phone}>
                        <input
                          id="phone"
                          type="tel"
                          name="phone"
                          autoComplete="tel"
                          value={form.phone}
                          onChange={(e) => setField("phone", e.target.value)}
                          aria-invalid={!!errors.phone}
                          aria-describedby={errors.phone ? "phone-error" : undefined}
                          placeholder="03XX XXXXXXX"
                          className={inputClass(errors.phone)}
                        />
                      </FormField>

                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full rounded-lg bg-accent py-3.5 text-sm uppercase tracking-wider text-background shadow-[0_10px_30px_-12px_rgba(142,106,56,0.65)] transition-colors hover:bg-accent-strong"
                      >
                        Continue to Shipping
                      </motion.button>
                    </form>
                  )}

                  {step === "shipping" && (
                    <form className="space-y-5" onSubmit={goToPayment} noValidate>
                      <div className="space-y-1">
                        <h2 className="font-serif text-2xl text-foreground">
                          Shipping Address
                        </h2>
                        <p className="text-sm text-foreground-muted">
                          Where should we send your Semzi order?
                        </p>
                      </div>

                      <FormField
                        id="address"
                        label="Street address"
                        error={errors.address}
                      >
                        <input
                          id="address"
                          type="text"
                          name="address"
                          autoComplete="street-address"
                          value={form.address}
                          onChange={(e) => setField("address", e.target.value)}
                          aria-invalid={!!errors.address}
                          aria-describedby={
                            errors.address ? "address-error" : undefined
                          }
                          placeholder="House / street / area"
                          className={inputClass(errors.address)}
                        />
                      </FormField>

                      <FormField id="apartment" label="Apartment / landmark (optional)">
                        <input
                          id="apartment"
                          type="text"
                          name="apartment"
                          autoComplete="address-line2"
                          value={form.apartment}
                          onChange={(e) => setField("apartment", e.target.value)}
                          placeholder="Apartment, floor, or nearby landmark"
                          className={inputClass()}
                        />
                      </FormField>

                      <div className="grid gap-4 sm:grid-cols-3">
                        <FormField id="city" label="City" error={errors.city}>
                          <input
                            id="city"
                            type="text"
                            name="city"
                            autoComplete="address-level2"
                            value={form.city}
                            onChange={(e) => setField("city", e.target.value)}
                            aria-invalid={!!errors.city}
                            aria-describedby={errors.city ? "city-error" : undefined}
                            placeholder="City"
                            className={inputClass(errors.city)}
                          />
                        </FormField>
                        <FormField id="state" label="Province" error={errors.state}>
                          <input
                            id="state"
                            type="text"
                            name="state"
                            autoComplete="address-level1"
                            value={form.state}
                            onChange={(e) => setField("state", e.target.value)}
                            aria-invalid={!!errors.state}
                            aria-describedby={
                              errors.state ? "state-error" : undefined
                            }
                            placeholder="Province"
                            className={inputClass(errors.state)}
                          />
                        </FormField>
                        <FormField id="zip" label="Postal code" error={errors.zip}>
                          <input
                            id="zip"
                            type="text"
                            name="zip"
                            autoComplete="postal-code"
                            value={form.zip}
                            onChange={(e) => setField("zip", e.target.value)}
                            aria-invalid={!!errors.zip}
                            aria-describedby={errors.zip ? "zip-error" : undefined}
                            placeholder="Postal code"
                            className={inputClass(errors.zip)}
                          />
                        </FormField>
                      </div>

                      <div className="flex gap-3 pt-1">
                        <button
                          type="button"
                          onClick={() => {
                            setErrors({});
                            setStep("information");
                          }}
                          className="rounded-lg border border-border px-6 py-3.5 text-sm uppercase tracking-wider text-foreground-muted transition-all hover:border-accent/40 hover:text-foreground"
                        >
                          Back
                        </button>
                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 rounded-lg bg-accent py-3.5 text-sm uppercase tracking-wider text-background shadow-[0_10px_30px_-12px_rgba(142,106,56,0.65)] transition-colors hover:bg-accent-strong"
                        >
                          Continue to Payment
                        </motion.button>
                      </div>
                    </form>
                  )}

                  {step === "payment" && (
                    <form className="space-y-5" onSubmit={placeOrder} noValidate>
                      <div className="space-y-1">
                        <h2 className="font-serif text-2xl text-foreground">
                          Payment
                        </h2>
                        <p className="flex items-center gap-1.5 text-sm text-foreground-muted">
                          <ShieldCheck className="h-3.5 w-3.5 text-accent" />
                          Encrypted and secure — your card details stay private.
                        </p>
                      </div>

                      <FormField
                        id="cardName"
                        label="Name on card"
                        error={errors.cardName}
                      >
                        <input
                          id="cardName"
                          type="text"
                          name="cardName"
                          autoComplete="cc-name"
                          value={form.cardName}
                          onChange={(e) => setField("cardName", e.target.value)}
                          aria-invalid={!!errors.cardName}
                          aria-describedby={
                            errors.cardName ? "cardName-error" : undefined
                          }
                          placeholder="Name as it appears on card"
                          className={inputClass(errors.cardName)}
                        />
                      </FormField>

                      <FormField
                        id="cardNumber"
                        label="Card number"
                        error={errors.cardNumber}
                      >
                        <input
                          id="cardNumber"
                          type="text"
                          name="cardNumber"
                          inputMode="numeric"
                          autoComplete="cc-number"
                          value={form.cardNumber}
                          onChange={(e) => setField("cardNumber", e.target.value)}
                          aria-invalid={!!errors.cardNumber}
                          aria-describedby={
                            errors.cardNumber ? "cardNumber-error" : undefined
                          }
                          placeholder="4242 4242 4242 4242"
                          className={inputClass(errors.cardNumber)}
                        />
                      </FormField>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <FormField id="expiry" label="Expiry" error={errors.expiry}>
                          <input
                            id="expiry"
                            type="text"
                            name="expiry"
                            inputMode="numeric"
                            autoComplete="cc-exp"
                            value={form.expiry}
                            onChange={(e) => setField("expiry", e.target.value)}
                            aria-invalid={!!errors.expiry}
                            aria-describedby={
                              errors.expiry ? "expiry-error" : undefined
                            }
                            placeholder="MM / YY"
                            className={inputClass(errors.expiry)}
                          />
                        </FormField>
                        <FormField id="cvc" label="CVC" error={errors.cvc}>
                          <input
                            id="cvc"
                            type="text"
                            name="cvc"
                            inputMode="numeric"
                            autoComplete="cc-csc"
                            value={form.cvc}
                            onChange={(e) => setField("cvc", e.target.value)}
                            aria-invalid={!!errors.cvc}
                            aria-describedby={errors.cvc ? "cvc-error" : undefined}
                            placeholder="123"
                            className={inputClass(errors.cvc)}
                          />
                        </FormField>
                      </div>

                      <div className="flex gap-3 pt-1">
                        <button
                          type="button"
                          onClick={() => {
                            setErrors({});
                            setStep("shipping");
                          }}
                          className="rounded-lg border border-border px-6 py-3.5 text-sm uppercase tracking-wider text-foreground-muted transition-all hover:border-accent/40 hover:text-foreground"
                        >
                          Back
                        </button>
                        <motion.button
                          type="submit"
                          disabled={submitting || items.length === 0}
                          whileHover={
                            submitting || items.length === 0 ? undefined : { scale: 1.01 }
                          }
                          whileTap={
                            submitting || items.length === 0 ? undefined : { scale: 0.98 }
                          }
                          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-accent py-3.5 text-sm uppercase tracking-wider text-background shadow-[0_10px_30px_-12px_rgba(142,106,56,0.65)] transition-colors hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {submitting ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Lock className="h-4 w-4" />
                          )}
                          {submitting
                            ? "Placing order…"
                            : `Pay ${formatPkr(grandTotal)}`}
                        </motion.button>
                      </div>
                    </form>
                  )}
                </motion.div>
              </div>

              <div className="lg:col-span-2">
                <div className="sticky top-28 space-y-5 rounded-2xl border border-border/70 bg-surface p-6 card-glow-brown">
                  <h3 className="font-serif text-xl text-foreground">
                    Order Summary
                  </h3>
                  {items.length === 0 ? (
                    <p className="text-sm text-foreground-muted">
                      Your cart is empty.{" "}
                      <Link
                        href="/shop"
                        className="text-accent-strong hover:underline"
                      >
                        Shop products
                      </Link>
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {items.map((item) => (
                        <div key={item.variantId} className="flex gap-3">
                          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-surface-muted">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-foreground">
                              {item.name}
                            </p>
                            <p className="mt-0.5 text-xs text-foreground-muted">
                              Qty {item.quantity}
                            </p>
                          </div>
                          <p className="shrink-0 font-mono text-sm text-foreground">
                            {formatPkr(item.priceCents * item.quantity)}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="space-y-2.5 border-t border-border pt-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-foreground-muted">Subtotal</span>
                      <span className="font-mono">{formatPkr(totalCents)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground-muted">Shipping</span>
                      <span className="font-mono">
                        {shippingCents === 0 ? "Free" : formatPkr(shippingCents)}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-border pt-3 font-semibold">
                      <span>Total</span>
                      <span className="font-mono text-base">
                        {formatPkr(grandTotal)}
                      </span>
                    </div>
                  </div>
                  <p className="flex items-start gap-2 text-xs leading-relaxed text-foreground-muted">
                    <Lock className="mt-0.5 h-3 w-3 shrink-0 text-accent" />
                    Free shipping on orders over PKR 5,000. Your payment is
                    processed securely.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
