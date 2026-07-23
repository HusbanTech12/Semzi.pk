<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Semzi — Premium E-Commerce Frontend Agent Spec

## Project Overview

**Semzi** is a handmade, natural soap brand. Brand assets (label + packaging) establish
a warm, artisanal, "coastal-organic" identity — cream backgrounds, a burnished
gold/tan surface, a flowing cursive wordmark ("Semzi"), and confident collection
naming (e.g. "Beach — Carry the Beach Home. Natural Soap. Nothing Harsh.").
The site must read as a premium, funded-DTC skincare brand — think Necessaire /
Fur / Salt & Stone — not a generic template store, while staying true to the
handmade, ingredient-forward, small-batch feel from the packaging.

Positioning: natural, honest, skin-safe soap — full INCI ingredient transparency,
seasonal/thematic collections ("Beach" is the first), gift-worthy packaging.

## Tech Stack

- **Framework:** Next.js 14+ (App Router), Server Components by default
- **Backend:** Next.js API Routes (`app/api/**/route.ts`) — no separate backend service
- **Auth:** Clerk (`@clerk/nextjs`) — hosted sign-in/sign-up + middleware route protection
- **Database:** Supabase (Postgres) — accessed exclusively through Drizzle, not the Supabase JS client, for data reads/writes
- **ORM:** Drizzle ORM (`drizzle-orm` + `drizzle-kit`), schema in `db/schema.ts`, migrations via `drizzle-kit`
- **Styling:** Tailwind CSS — no inline styles, no CSS modules
- **Animation:** Framer Motion, driven entirely by shared tokens in `lib/animations.ts`
- **UI Primitives:** shadcn/ui (Dialog, Sheet, Toast, Select, Checkbox, RadioGroup, Skeleton, Badge, Separator)
- **Icons:** Lucide React
- **Language:** TypeScript everywhere, strict mode on

---

## Design System

### Brand Source
Derived directly from the Semzi label/packaging: cream paper background, cursive
brown wordmark, warm tan-gold product band, small caps ingredient/caution copy,
minimal botanical line art.

### Colors
```css
:root {
  /* Surfaces */
  --background: #FAF3E7;        /* warm cream — primary page background */
  --surface: #FFFFFF;            /* cards, elevated panels */
  --surface-muted: #F1E6D3;      /* secondary surface, alt sections */

  /* Brand accent — the tan/gold band from packaging */
  --accent: #C79A56;             /* primary gold/tan */
  --accent-strong: #A47C3B;      /* deeper gold — hover/active states */
  --accent-subtle: #EADFC5;      /* tints, badges, hover backgrounds */

  /* Foreground */
  --foreground: #2B2118;         /* near-black warm brown — primary text */
  --foreground-muted: #6B5D4D;   /* secondary text, captions, ingredient lists */

  /* Utility */
  --border: #E4D6BC;
  --destructive: #B4432E;        /* errors, out of stock — warm terracotta, not clinical red */
  --success: #4C7A5E;
}
```

### Typography
- **Display / Wordmark:** A flowing script for the "Semzi" logotype and hero
  moments only — e.g. `Playfair Display Italic` or a licensed cursive such as
  `Allura` / `Pinyon Script`. Use sparingly (logo, section eyebrows, big
  statement lines) — never for body copy or UI labels.
- **Headline font:** `Fraunces` or `Playfair Display` (serif, warm, editorial) for
  H1–H3 across the site.
- **Body font:** `DM Sans` or `Inter` — clean, highly legible, used for all UI
  copy, descriptions, ingredient lists, forms.
- **Mono (prices/SKUs):** `JetBrains Mono` — used only for price figures and
  order/SKU numbers to give a subtle apothecary-label precision.

### Spacing & Shape
- 4px base spacing scale (4, 8, 12, 16, 24, 32, 48, 64, 96...)
- Border radius: soft, not sharp, not pill — **8–14px** on cards/buttons,
  full-round only on badges/avatars/icon buttons. This matches the rounded
  label corners in the packaging.
- Shadows: soft, warm-toned (avoid pure black shadows — tint with `--foreground`
  at low opacity) layered shadows for cards and the sticky cart bar.

### Texture & Motifs (from packaging)
- Thin hairline rules and small botanical/wave line-art as section dividers
  (echoing the faint pattern on the "Beach" band) — used subtly, never as loud
  decoration.
- Ingredient/ INCI-style callouts: small-caps, letter-spaced labels for
  materials, care instructions, and product specs — reused as a UI pattern for
  "Ingredients" and "How to Use" tabs on PDP.

### Animation System (Framer Motion — `lib/animations.ts`)
```ts
export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};

export const staggerContainer = {
  animate: { transition: { staggerChildren: 0.08 } },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.4, ease: "easeOut" },
};

export const cardHover = {
  whileHover: { scale: 1.02, y: -2 },
  transition: { duration: 0.25, ease: "easeOut" },
};
```
All components import from this file — never define raw Framer Motion variants
inline. Always wrap usage in `useReducedMotion()` checks for accessibility.

---

## Phases

### Phase 1: Foundation
- [ ] Init Next.js 14 App Router project, TypeScript strict
- [ ] Install & configure Tailwind, shadcn/ui, Lucide, Framer Motion
- [ ] Configure Clerk (`middleware.ts`, `<ClerkProvider>`, sign-in/sign-up routes)
- [ ] Configure Supabase project + connection string; set up Drizzle (`drizzle.config.ts`, `db/index.ts`)
- [ ] Define `db/schema.ts` (see Data Model below) and run first migration
- [ ] Set up `globals.css` with the CSS variable token system above
- [ ] Build `lib/animations.ts` token file
- [ ] Build `Navbar` (logo wordmark, nav links, search icon, cart icon w/ badge, mobile hamburger)
- [ ] Build `Footer` (links, newsletter signup, social icons, legal, INCI/ingredient transparency note)

### Phase 2: Core Pages
- [ ] Homepage (`/`)
- [ ] Shop / Product Listing (`/shop`)
- [ ] Product Detail (`/product/[slug]`)
- [ ] Collection page (`/collections/[slug]`) — for themed drops like "Beach"

### Phase 3: Commerce Flow
- [ ] Cart (`/cart`) + `CartDrawer` (slide-in)
- [ ] Checkout (`/checkout`)
- [ ] Order Confirmation (`/order/success`)
- [ ] API routes: `app/api/cart`, `app/api/checkout`, `app/api/orders`, `app/api/products`

### Phase 4: Supporting Pages
- [ ] About (`/about`) — brand story, natural/handmade process
- [ ] Contact (`/contact`)
- [ ] Auth (`/sign-in`, `/sign-up` via Clerk hosted or embedded components)
- [ ] Account (`/account`) — order history, saved addresses (Clerk user + Drizzle orders join)
- [ ] 404 (`not-found.tsx`)

### Phase 5: Polish & QA
- [ ] Empty states (empty cart, no search results, no orders)
- [ ] Loading skeletons on all async data fetches
- [ ] Accessibility pass (contrast, focus rings, ARIA labels)
- [ ] Mobile QA at 375px, desktop QA at 1440px

---

## Data Model (Drizzle schema — `db/schema.ts`)

Core tables to define:
- `products` — id, slug, name, description, price_cents, compare_at_price_cents, ingredients (text/INCI list), how_to_use, collection_id, is_active, created_at
- `product_images` — id, product_id, url, alt, sort_order
- `product_variants` — id, product_id, name (e.g. size/scent), sku, price_cents, inventory_count
- `collections` — id, slug, name, description, hero_image_url (e.g. "Beach")
- `carts` — id, user_id (Clerk user id, nullable for guest), created_at
- `cart_items` — id, cart_id, variant_id, quantity
- `orders` — id, user_id, status, subtotal_cents, shipping_cents, total_cents, shipping_address (jsonb), created_at
- `order_items` — id, order_id, variant_id, quantity, price_cents_at_purchase
- `reviews` — id, product_id, user_id, rating, body, created_at, verified_purchase

Auth: Clerk manages identity; store only `clerk_user_id` (text) as the foreign
key on `carts`, `orders`, and `reviews` — never duplicate user PII into Supabase.

---

## Pages — Section Breakdown

### 1. Homepage (`/`)
| Section | Semzi-specific notes |
|---|---|
| **Hero** | Full-viewport. Cream background, cursive "Semzi" wordmark reveal, headline like "Natural Soap. Nothing Harsh.", subheadline, primary CTA "Shop All", secondary "Our Story" link. Background: soft product photography or the tan-gold band as a shape, not a stock lifestyle photo. |
| **Trust Bar** | Handmade in small batches · Natural INCI ingredients · Cruelty-free · Free shipping over $X — icon strip |
| **Featured Collection** | Hero banner for the current themed drop (e.g. "Beach — Carry the Beach Home") using the tan-gold band treatment straight from packaging |
| **Featured Products** | "Best Sellers" — ProductGrid, staggered scroll reveal |
| **Brand Story / USP** | Split layout: label/packaging imagery left, story right — "why we don't use [harsh ingredient]", small-batch process |
| **Ingredient Transparency Strip** | Reusable INCI-style small-caps ingredient callout — differentiator specific to this brand |
| **Social Proof** | Review marquee or 3-column star review cards |
| **Newsletter** | Email capture, discount incentive |
| **Footer** | Full footer |

### 2. Shop (`/shop`)
Filters: Collection, Scent/Type, Price range, Skin concern (e.g. sensitive,
dry), In Stock only. ProductCard shows image swap on hover (front/back of bar
or packaging), Quick Add overlay, wishlist heart.

### 3. Product Detail (`/product/[slug]`)
Gallery includes at least one packaging/label shot (as in the reference image)
alongside product photography. **Ingredients tab** renders the full INCI list
in the small-caps label style. **Caution / How to Use tab** mirrors the
packaging's caution copy style. Sticky mobile Add-to-Cart bar.

### 4. Cart (`/cart`)
Standard cart rows + order summary + discount code input + recommended
products. Empty state illustration in brand line-art style.

### 5. Checkout (`/checkout`)
Progress bar: Information → Shipping → Payment → Confirm. Payment via Stripe
Elements (or chosen provider) styled to match tokens. Sticky order summary.

### 6. Order Success (`/order/success`)
Animated checkmark draw-in, order number with copy button, summary, next
steps, continue shopping CTA.

### 7. About (`/about`)
Brand mission, handmade process story/timeline, values (natural ingredients,
small batch, honest labeling), team/founder if applicable.

### 8. Contact (`/contact`)
Form (name, email, subject, message), contact info, FAQ accordion (shelf
life, ingredient questions, shipping, returns).

### 9. Auth (`/sign-in`, `/sign-up`)
Clerk components restyled with brand tokens (cream background, gold accent
buttons, script wordmark above the form). Split layout: form left, brand
imagery right on desktop.

### 10. Account (`/account`)
Order history (from Drizzle `orders` joined on Clerk `user_id`), saved
addresses, profile managed via Clerk `<UserProfile>`.

### 11. 404
Custom illustration in brand line-art style, "Page not found" message, Go
Home + Search bar, popular links (Shop, About, Contact).

---

## Component Contracts (key components)

- **`ProductCard`** — props: `{ product, variant?, priority? }` → image (swap on
  hover), name, price (`PriceDisplay`), quick-add button, wishlist toggle.
  Animation: `scaleIn` on `whileInView`, `cardHover` on hover.
- **`PriceDisplay`** — props: `{ priceCents, compareAtCents? }` → mono font,
  strikethrough compare-at price when on sale.
- **`CartDrawer`** — props: `{ open, onOpenChange }` → reads cart via a
  server action / API route, `AnimatePresence` exit animation on item removal.
- **`IngredientList`** — props: `{ items: string[] }` → renders the INCI-style
  small-caps, comma-separated ingredient block matching the packaging.
- **`CautionNotice`** — props: `{ text }` → small muted-surface callout block,
  reused wherever packaging-style safety copy is needed.
- **`CollectionBanner`** — props: `{ name, tagline, imageUrl, href }` → the
  tan-gold band hero treatment reused across homepage + collection pages.

---

## Rules
- Mobile-first always; breakpoints `sm:640 md:768 lg:1024 xl:1280`
- No inline styles, no hardcoded colors — everything through CSS variables/Tailwind theme
- `"use client"` only when strictly necessary (interactivity, hooks, browser APIs)
- Server Components + Server Actions preferred for data fetching/mutations; API
  Routes reserved for webhook-style or external-consumer endpoints (e.g.
  payment webhooks)
- All database access goes through Drizzle — no raw SQL strings, no direct
  Supabase client calls for app data
- Clerk middleware protects `/account`, `/checkout` (require auth or explicit
  guest-checkout flow — decide and document before Phase 3)
- All images via `next/image`, `priority` above the fold, lazy below
- All Framer Motion usage pulls from `lib/animations.ts` tokens — no raw inline variants
- Reduced motion respected via `useReducedMotion()`
- TypeScript strict — no `any`

---

## Known Constraints / Open Decisions
- Payment provider not yet specified — assume Stripe unless told otherwise
- Guest checkout vs. required-account checkout — confirm before Phase 3
- Whether reviews are user-submitted (needs moderation flow) or
  imported/seeded — confirm before building the Reviews tab
- Shipping/tax calculation logic (flat rate vs. API-calculated) — confirm before Checkout phase
