import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import SemziLogo from "@/components/SemziLogo";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-3">
          <Link href="/" className="inline-flex justify-center">
            <SemziLogo className="mx-auto h-12 sm:h-14" priority />
          </Link>
          <p className="text-sm text-foreground-muted mt-2">Welcome back</p>
        </div>
        <SignIn
          routing="hash"
          signUpUrl="/sign-up"
          fallbackRedirectUrl="/"
        />
        <p className="text-center text-sm text-foreground-muted">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="text-accent hover:text-accent-strong font-medium transition-colors">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
