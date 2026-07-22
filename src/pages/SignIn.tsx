import { useState } from "react";
import { Link } from "react-router-dom";
import { BarChart3, Clock, Eye, EyeOff, Lock, Mail, ShieldCheck, Users } from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const FEATURES = [
  { icon: Clock, title: "Save Time", description: "Automate tasks and boost productivity." },
  { icon: Users, title: "Happy Customers", description: "Deliver excellent service and build trust." },
  { icon: BarChart3, title: "Grow Your Business", description: "Get insights and make smarter decisions." },
  { icon: ShieldCheck, title: "Secure & Reliable", description: "Your data is safe with enterprise-grade security." },
];

const TRUST_BADGES = [
  { icon: ShieldCheck, title: "Secure Login", description: "Your data is protected" },
  { icon: Clock, title: "24/7 Support", description: "We're here to help" },
  { icon: Lock, title: "Privacy First", description: "We respect your privacy" },
];

function FieldIcon({ icon: Icon }: { icon: typeof Mail }) {
  return <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />;
}

export function SignIn() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthLayout
      heading="Smart Service Management Simplified"
      subheading="Manage your garage operations, customers, vehicles and services all in one place."
      features={FEATURES}
      trustBadges={TRUST_BADGES}
    >
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-extrabold">Welcome Back!</h2>
        <p className="text-sm text-muted-foreground">Sign in to continue to your account</p>
      </div>

      <form className="mt-6 flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email" className="text-sm font-semibold">
            Email Address
          </Label>
          <div className="relative">
            <FieldIcon icon={Mail} />
            <Input id="email" type="email" placeholder="Enter your email address" className="pl-9" required />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-sm font-semibold">
              Password
            </Label>
          </div>
          <div className="relative">
            <FieldIcon icon={Lock} />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="pl-9 pr-9"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <a href="#" className="self-end text-sm font-medium text-primary hover:underline">
            Forgot Password?
          </a>
        </div>

        <label className="flex items-center gap-2.5 text-sm">
          <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-input accent-primary" />
          Remember me
        </label>

        <Button type="submit" size="lg" className="w-full">
          Sign In
        </Button>
      </form>

      <div className="my-5 flex items-center gap-3">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs font-medium text-muted-foreground">OR</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <div className="flex flex-col gap-3">
        <SocialButton label="Continue with Google" logo="google" />
        <SocialButton label="Continue with Microsoft" logo="microsoft" />
        <SocialButton label="Continue with Apple" logo="apple" />
      </div>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link to="/signup" className="font-semibold text-primary hover:underline">
          Sign Up
        </Link>
      </p>
    </AuthLayout>
  );
}

function SocialButton({ label, logo }: { label: string; logo: "google" | "microsoft" | "apple" }) {
  return (
    <Button type="button" variant="outline" size="lg" className="w-full justify-center gap-3 font-medium">
      <SocialLogo logo={logo} />
      {label}
    </Button>
  );
}

function SocialLogo({ logo }: { logo: "google" | "microsoft" | "apple" }) {
  if (logo === "google") {
    return (
      <svg className="h-4 w-4" viewBox="0 0 48 48">
        <path
          fill="#FFC107"
          d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
        />
        <path
          fill="#FF3D00"
          d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4c-7.7 0-14.3 4.3-17.7 10.7z"
        />
        <path
          fill="#4CAF50"
          d="M24 44c5.5 0 10.4-2.1 14.1-5.6l-6.5-5.5C29.6 34.7 27 35.5 24 35.5c-5.3 0-9.7-3.4-11.3-8.1l-6.6 5.1C9.6 39.6 16.2 44 24 44z"
        />
        <path
          fill="#1976D2"
          d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.2-4.1 5.5l6.5 5.5C41.4 35.7 44 30.4 44 24c0-1.3-.1-2.7-.4-3.5z"
        />
      </svg>
    );
  }
  if (logo === "microsoft") {
    return (
      <svg className="h-4 w-4" viewBox="0 0 23 23">
        <rect x="1" y="1" width="10" height="10" fill="#f25022" />
        <rect x="12" y="1" width="10" height="10" fill="#7fba00" />
        <rect x="1" y="12" width="10" height="10" fill="#00a4ef" />
        <rect x="12" y="12" width="10" height="10" fill="#ffb900" />
      </svg>
    );
  }
  return (
    <svg className="h-4 w-4" viewBox="0 0 384 512" fill="currentColor">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}
