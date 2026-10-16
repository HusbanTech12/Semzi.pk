export type FieldErrors = Record<string, string>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function required(value: string, label: string): string | null {
  if (!value.trim()) return `${label} is required.`;
  return null;
}

export function validateEmail(value: string, label = "Email"): string | null {
  const empty = required(value, label);
  if (empty) return empty;
  if (!EMAIL_RE.test(value.trim())) return "Enter a valid email address.";
  return null;
}

export function validateName(value: string, label: string): string | null {
  const empty = required(value, label);
  if (empty) return empty;
  if (value.trim().length < 2) return `${label} must be at least 2 characters.`;
  return null;
}

export function validateMessage(value: string): string | null {
  const empty = required(value, "Message");
  if (empty) return empty;
  if (value.trim().length < 10) return "Message must be at least 10 characters.";
  return null;
}

export function validatePhone(value: string, optional = true): string | null {
  if (!value.trim()) return optional ? null : "Phone number is required.";
  const digits = value.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 15) {
    return "Enter a valid phone number.";
  }
  return null;
}

export function validateZip(value: string): string | null {
  const empty = required(value, "ZIP / postal code");
  if (empty) return empty;
  if (!/^[A-Za-z0-9\s-]{3,12}$/.test(value.trim())) {
    return "Enter a valid ZIP / postal code.";
  }
  return null;
}

export function validateCardNumber(value: string): string | null {
  const empty = required(value, "Card number");
  if (empty) return empty;
  const digits = value.replace(/\s+/g, "");
  if (!/^\d{13,19}$/.test(digits)) return "Enter a valid card number.";
  return null;
}

export function validateCardExpiry(value: string): string | null {
  const empty = required(value, "Expiry");
  if (empty) return empty;
  const match = value.trim().match(/^(\d{2})\s*\/\s*(\d{2})$/);
  if (!match) return "Use MM / YY format.";
  const month = Number(match[1]);
  const year = Number(match[2]) + 2000;
  if (month < 1 || month > 12) return "Enter a valid month.";
  const now = new Date();
  const expiry = new Date(year, month);
  if (expiry <= now) return "Card has expired.";
  return null;
}

export function validateCvc(value: string): string | null {
  const empty = required(value, "CVC");
  if (empty) return empty;
  if (!/^\d{3,4}$/.test(value.trim())) return "Enter a valid CVC.";
  return null;
}

export function firstError(errors: FieldErrors): string | null {
  const entry = Object.values(errors).find(Boolean);
  return entry ?? null;
}

export function collectErrors(
  checks: Array<[string, string | null]>
): FieldErrors {
  const errors: FieldErrors = {};
  for (const [key, message] of checks) {
    if (message) errors[key] = message;
  }
  return errors;
}
