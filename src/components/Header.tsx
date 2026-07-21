import Link from "next/link";

const navLinks = [
  { label: "Collections", href: "#products" },
  { label: "Our Story", href: "#story" },
  { label: "Reviews", href: "#testimonials" },
];

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-primary" />
            <span className="font-serif text-2xl tracking-wide text-foreground">
              LUXE
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm tracking-wider uppercase text-foreground/70 hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button className="hidden md:inline-flex items-center px-6 py-2.5 bg-primary text-background text-sm tracking-wider uppercase rounded-full hover:bg-primary/90 transition-all">
            Shop Now
          </button>

          <button className="md:hidden p-2" aria-label="Menu">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
