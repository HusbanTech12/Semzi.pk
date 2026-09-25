/** Canonical Semzi contact details — import from here, don't hardcode. */
export const contactInfo = {
  phoneDisplay: "0331 2130955",
  /** E.164 without + for tel:/wa.me */
  phoneE164: "923312130955",
  email: "semzipk@gmail.com",
  studio: "Formulated in Pakistan",
  instagram:
    "https://www.instagram.com/semzipk?utm_source=qr&stkn=MW11dWRiZ2R4dWNpaQ==",
  facebook: "https://www.facebook.com/share/1BtYLzM3Ye/",
} as const;

export const contactLinks = {
  phone: `tel:+${contactInfo.phoneE164}`,
  email: `mailto:${contactInfo.email}`,
  whatsapp: `https://wa.me/${contactInfo.phoneE164}`,
  instagram: contactInfo.instagram,
  facebook: contactInfo.facebook,
} as const;
