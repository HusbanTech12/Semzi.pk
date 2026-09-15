import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import SemziLogo from "@/components/SemziLogo";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-flex justify-center">
            <SemziLogo className="mx-auto h-12 sm:h-14" priority />
          </Link>
        </div>
        <SignUp
          routing="hash"
          signInUrl="/sign-in"
          fallbackRedirectUrl="/"
          appearance={{
            elements: {
              headerTitle: "hidden",
            },
          }}
        />
        <p className="text-center text-sm text-foreground-muted">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-accent hover:text-accent-strong font-medium transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
