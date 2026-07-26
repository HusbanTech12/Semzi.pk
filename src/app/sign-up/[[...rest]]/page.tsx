import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="font-serif text-3xl italic text-foreground">Semzi</h1>
          <p className="text-sm text-foreground-muted mt-2">Create your account</p>
        </div>
        <SignUp />
      </div>
    </div>
  );
}
