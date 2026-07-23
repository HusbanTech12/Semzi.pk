import Link from "next/link";
import { Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center space-y-8">
        <div>
          <p className="font-serif text-8xl text-accent/30">404</p>
          <div className="flex justify-center gap-1 mt-4">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-3 h-0.5 bg-accent/30"
                style={{ opacity: 1 - i * 0.15 }}
              />
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="font-serif text-3xl text-foreground">
            Page not found
          </h1>
          <p className="text-foreground-muted text-sm">
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
            It might have been moved or no longer exists.
          </p>
        </div>

        <div className="relative max-w-sm mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-muted" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-8 py-3 bg-accent text-background text-sm tracking-wider uppercase rounded-lg hover:bg-accent-strong transition-all"
          >
            Go Home
          </Link>
          <Link
            href="/shop"
            className="px-8 py-3 border border-border text-foreground-muted text-sm tracking-wider uppercase rounded-lg hover:text-foreground transition-all"
          >
            Shop All
          </Link>
        </div>

        <div className="flex justify-center gap-6 text-xs text-foreground-muted">
          <Link href="/shop" className="hover:text-accent transition-colors">
            Shop
          </Link>
          <Link href="/about" className="hover:text-accent transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-accent transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}
