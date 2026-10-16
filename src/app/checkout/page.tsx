"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, Lock } from "lucide-react";
import Navbar from "@/components/Header";
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
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  zip: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
};

const initialForm: CheckoutForm = {
  email: "",
  firstName: "",
  lastName: "",
  address: "",
  apartment: "",
  city: "",
  state: "",
  zip: "",
  cardNumber: "",
  expiry: "",
  cvc: "",
};

export default function CheckoutPage() {
  const [step, setStep] = useState<Step>("information");
  const [form, setForm] = useState<CheckoutForm>(initialForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const { items, totalCents, shippingCents, clearCart } = useCart();
  const { fadeUp } = useAnimations();
  const router = useRouter();

  const currentIdx = steps.findIndex((s) => s.key === step);

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
      ["email", validateEmail(form.email)],
      ["firstName", validateName(form.firstName, "First name")],
      ["lastName", validateName(form.lastName, "Last name")],
    ]);
  }

  function validateShipping(): FieldErrors {
    return collectErrors([
      ["address", required(form.address, "Address")],
      ["city", required(form.city, "City")],
      ["state", required(form.state, "State / province")],
      ["zip", validateZip(form.zip)],
    ]);
  }

  function validatePayment(): FieldErrors {
    return collectErrors([
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

  function placeOrder(e: FormEvent) {
    e.preventDefault();
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
    clearCart();
    toast.success(
      "Order placed",
      "Thank you — your Semzi ritual is on its way."
    );
    router.push("/order/success");
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <Link
            href="/cart"
            className="mb-8 inline-flex items-center gap-1 text-sm text-foreground-muted transition-colors hover:text-accent"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Cart
          </Link>

          <div className="mb-12 flex items-center justify-center gap-2">
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
                      "mx-1 h-px w-8",
                      i < currentIdx ? "bg-accent" : "bg-border"
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <motion.div key={step} {...fadeUp} className="space-y-6">
                {step === "information" && (
                  <form className="space-y-6" onSubmit={goToShipping} noValidate>
                    <h2 className="font-serif text-2xl text-foreground">Contact</h2>
                    <div className="space-y-4">
                      <FormField id="email" label="Email" error={errors.email}>
                        <input
                          id="email"
                          type="email"
                          autoComplete="email"
                          value={form.email}
                          onChange={(e) => setField("email", e.target.value)}
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? "email-error" : undefined}
                          placeholder="you@email.com"
                          className={fieldClassName(errors.email)}
                        />
                      </FormField>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <FormField
                          id="firstName"
                          label="First name"
                          error={errors.firstName}
                        >
                          <input
                            id="firstName"
                            type="text"
                            autoComplete="given-name"
                            value={form.firstName}
                            onChange={(e) => setField("firstName", e.target.value)}
                            aria-invalid={!!errors.firstName}
                            aria-describedby={
                              errors.firstName ? "firstName-error" : undefined
                            }
                            placeholder="First name"
                            className={fieldClassName(errors.firstName)}
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
                            autoComplete="family-name"
                            value={form.lastName}
                            onChange={(e) => setField("lastName", e.target.value)}
                            aria-invalid={!!errors.lastName}
                            aria-describedby={
                              errors.lastName ? "lastName-error" : undefined
                            }
                            placeholder="Last name"
                            className={fieldClassName(errors.lastName)}
                          />
                        </FormField>
                      </div>
                      <button
                        type="submit"
                        className="w-full rounded-lg bg-accent py-3 text-sm uppercase tracking-wider text-background transition-all hover:bg-accent-strong"
                      >
                        Continue to Shipping
                      </button>
                    </div>
                  </form>
                )}

                {step === "shipping" && (
                  <form className="space-y-6" onSubmit={goToPayment} noValidate>
                    <h2 className="font-serif text-2xl text-foreground">Shipping</h2>
                    <div className="space-y-4">
                      <FormField id="address" label="Address" error={errors.address}>
                        <input
                          id="address"
                          type="text"
                          autoComplete="street-address"
                          value={form.address}
                          onChange={(e) => setField("address", e.target.value)}
                          aria-invalid={!!errors.address}
                          aria-describedby={
                            errors.address ? "address-error" : undefined
                          }
                          placeholder="Street address"
                          className={fieldClassName(errors.address)}
                        />
                      </FormField>
                      <FormField id="apartment" label="Apartment (optional)">
                        <input
                          id="apartment"
                          type="text"
                          autoComplete="address-line2"
                          value={form.apartment}
                          onChange={(e) => setField("apartment", e.target.value)}
                          placeholder="Apartment, suite, etc."
                          className={fieldClassName()}
                        />
                      </FormField>
                      <div className="grid gap-4 sm:grid-cols-3">
                        <FormField id="city" label="City" error={errors.city}>
                          <input
                            id="city"
                            type="text"
                            autoComplete="address-level2"
                            value={form.city}
                            onChange={(e) => setField("city", e.target.value)}
                            aria-invalid={!!errors.city}
                            aria-describedby={errors.city ? "city-error" : undefined}
                            placeholder="City"
                            className={fieldClassName(errors.city)}
                          />
                        </FormField>
                        <FormField id="state" label="State" error={errors.state}>
                          <input
                            id="state"
                            type="text"
                            autoComplete="address-level1"
                            value={form.state}
                            onChange={(e) => setField("state", e.target.value)}
                            aria-invalid={!!errors.state}
                            aria-describedby={
                              errors.state ? "state-error" : undefined
                            }
                            placeholder="State"
                            className={fieldClassName(errors.state)}
                          />
                        </FormField>
                        <FormField id="zip" label="ZIP" error={errors.zip}>
                          <input
                            id="zip"
                            type="text"
                            autoComplete="postal-code"
                            value={form.zip}
                            onChange={(e) => setField("zip", e.target.value)}
                            aria-invalid={!!errors.zip}
                            aria-describedby={errors.zip ? "zip-error" : undefined}
                            placeholder="ZIP"
                            className={fieldClassName(errors.zip)}
                          />
                        </FormField>
                      </div>
                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={() => {
                            setErrors({});
                            setStep("information");
                          }}
                          className="rounded-lg border border-border px-6 py-3 text-sm uppercase tracking-wider text-foreground-muted transition-all hover:text-foreground"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          className="flex-1 rounded-lg bg-accent py-3 text-sm uppercase tracking-wider text-background transition-all hover:bg-accent-strong"
                        >
                          Continue to Payment
                        </button>
                      </div>
                    </div>
                  </form>
                )}

                {step === "payment" && (
                  <form className="space-y-6" onSubmit={placeOrder} noValidate>
                    <h2 className="font-serif text-2xl text-foreground">Payment</h2>
                    <div className="space-y-4">
                      <FormField
                        id="cardNumber"
                        label="Card number"
                        error={errors.cardNumber}
                      >
                        <input
                          id="cardNumber"
                          type="text"
                          inputMode="numeric"
                          autoComplete="cc-number"
                          value={form.cardNumber}
                          onChange={(e) => setField("cardNumber", e.target.value)}
                          aria-invalid={!!errors.cardNumber}
                          aria-describedby={
                            errors.cardNumber ? "cardNumber-error" : undefined
                          }
                          placeholder="4242 4242 4242 4242"
                          className={fieldClassName(errors.cardNumber)}
                        />
                      </FormField>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <FormField id="expiry" label="Expiry" error={errors.expiry}>
                          <input
                            id="expiry"
                            type="text"
                            inputMode="numeric"
                            autoComplete="cc-exp"
                            value={form.expiry}
                            onChange={(e) => setField("expiry", e.target.value)}
                            aria-invalid={!!errors.expiry}
                            aria-describedby={
                              errors.expiry ? "expiry-error" : undefined
                            }
                            placeholder="MM / YY"
                            className={fieldClassName(errors.expiry)}
                          />
                        </FormField>
                        <FormField id="cvc" label="CVC" error={errors.cvc}>
                          <input
                            id="cvc"
                            type="text"
                            inputMode="numeric"
                            autoComplete="cc-csc"
                            value={form.cvc}
                            onChange={(e) => setField("cvc", e.target.value)}
                            aria-invalid={!!errors.cvc}
                            aria-describedby={errors.cvc ? "cvc-error" : undefined}
                            placeholder="123"
                            className={fieldClassName(errors.cvc)}
                          />
                        </FormField>
                      </div>
                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={() => {
                            setErrors({});
                            setStep("shipping");
                          }}
                          className="rounded-lg border border-border px-6 py-3 text-sm uppercase tracking-wider text-foreground-muted transition-all hover:text-foreground"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-accent py-3 text-sm uppercase tracking-wider text-background transition-all hover:bg-accent-strong"
                        >
                          <Lock className="h-4 w-4" />
                          Pay {formatPkr(totalCents + shippingCents)}
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </motion.div>
            </div>

            <div className="lg:col-span-2">
              <div className="sticky top-28 space-y-4 rounded-lg border border-border p-6">
                <h3 className="font-serif text-lg text-foreground">Order Summary</h3>
                {items.length === 0 ? (
                  <p className="text-sm text-foreground-muted">
                    Your cart is empty.{" "}
                    <Link href="/shop" className="text-accent-strong hover:underline">
                      Shop products
                    </Link>
                  </p>
                ) : (
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.variantId} className="flex gap-3">
                        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-surface-muted">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="56px"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm text-foreground">{item.name}</p>
                          <p className="text-xs text-foreground-muted">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="shrink-0 font-mono text-sm">
                          {formatPkr(item.priceCents * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                <div className="space-y-2 border-t border-border pt-4 text-sm">
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
                  <div className="flex justify-between border-t border-border pt-2 font-semibold">
                    <span>Total</span>
                    <span className="font-mono">
                      {formatPkr(totalCents + shippingCents)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
