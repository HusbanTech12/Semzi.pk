import Link from "next/link";

const footerLinks = {
  Shop: ["All Products", "Soaps", "Shampoos", "Gift Sets", "Sale"],
  Company: ["Our Story", "Sustainability", "Blog", "Careers", "Press"],
  Support: ["FAQ", "Shipping", "Returns", "Contact", "Size Guide"],
};

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-primary-light" />
              <span className="font-serif text-2xl tracking-wide">LUXE</span>
            </Link>
            <p className="text-background/50 max-w-sm leading-relaxed">
              Handcrafted premium soaps and shampoos made with love and the
              finest natural ingredients nature has to offer.
            </p>
            <div className="flex gap-4">
              {["Instagram", "Twitter", "Pinterest", "TikTok"].map(
                (social) => (
                  <Link
                    key={social}
                    href="#"
                    className="text-sm text-background/40 hover:text-primary-light transition-colors"
                  >
                    {social}
                  </Link>
                )
              )}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h4 className="text-sm tracking-wider uppercase text-background/60">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-background/70 hover:text-primary-light transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-background/30">
          <p>&copy; 2026 LUXE. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-background/50 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-background/50 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
