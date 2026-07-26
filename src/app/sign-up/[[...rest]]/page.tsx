import { SignUp } from "@clerk/nextjs";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="font-serif text-3xl italic text-foreground">Semzi</h1>
          <p className="text-sm text-foreground-muted mt-2">Create your account</p>
        </div>
        <SignUp
          routing="hash"
          signInUrl="/sign-in"
          afterSignUpUrl="/"
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
