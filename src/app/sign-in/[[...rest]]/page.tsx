import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="font-serif text-3xl italic text-foreground">Semzi</h1>
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
