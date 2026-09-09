"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, AlertCircle, CheckCircle2, Globe2 } from "lucide-react";

import { signupSchema, SignupFormData } from "@/lib/validations/auth";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: SignupFormData) => {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      const resData = await res.json();

      if (!res.ok) {
        throw new Error(resData.error || "Registration fail ho gayi.");
      }

      return resData;
    },
    onSuccess: async (data, variables) => {
      setSuccessMsg("Account kamyabi se ban gaya! Login ho raha hai...");

      await new Promise((resolve) => setTimeout(resolve, 800));

      const res = await signIn("credentials", {
        redirect: false,
        email: variables.email,
        password: variables.password,
      });

      if (res?.error) {
        setErrorMsg(
          "Auto-login fail ho gaya. Please Login page se login karein.",
        );
        router.push("/login");
      } else {
        router.push("/");
        router.refresh();
      }
    },
    onError: (err: any) => {
      setErrorMsg(err.message || "Kuch ghalat ho gaya.");
    },
  });

  const onSubmit = (data: SignupFormData) => {
    setErrorMsg("");
    setSuccessMsg("");
    registerMutation.mutate(data);
  };

  return (
    <Card
      {...props}
      className="w-full max-w-lg mx-auto sm:my-8 shadow-xl shadow-green-950/5 border border-gray-200/90 rounded-3xl overflow-hidden bg-white"
    >
      <CardHeader className="space-y-1.5 text-center pt-5 pb-2 px-6">
        <div className="mx-auto w-10 h-10 rounded-xl bg-gradient-to-tr from-green-950 via-green-900 to-green-800 text-white flex items-center justify-center shadow-md shadow-green-900/20">
          <Globe2 size={20} className="text-green-300" />
        </div>
        <CardTitle className="text-2xl font-extrabold tracking-tight text-gray-900">
          Create an account
        </CardTitle>
        <CardDescription className="text-xs text-gray-500">
          Enter your information below to start your eSIM journey
        </CardDescription>
      </CardHeader>

      <CardContent className="px-6 sm:px-8 pb-6">
        {errorMsg && (
          <div className="mb-3 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2 animate-in fade-in duration-200">
            <AlertCircle size={15} className="shrink-0 text-red-600" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-3 p-3 bg-green-50 border border-green-200 text-green-800 text-xs rounded-xl flex items-center gap-2 animate-in fade-in duration-200">
            <CheckCircle2 size={15} className="shrink-0 text-green-700" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label
                htmlFor="name"
                className="text-xs font-semibold text-gray-700"
              >
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                {...register("name")}
                className="h-10 rounded-xl border-gray-300 text-sm focus-visible:ring-2 focus-visible:ring-green-700/20 focus-visible:border-green-700 transition"
              />
              {errors.name && (
                <p className="text-red-500 text-[11px] mt-0.5">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label
                htmlFor="email"
                className="text-xs font-semibold text-gray-700"
              >
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email")}
                className="h-10 rounded-xl border-gray-300 text-sm focus-visible:ring-2 focus-visible:ring-green-700/20 focus-visible:border-green-700 transition"
              />
              {errors.email && (
                <p className="text-red-500 text-[11px] mt-0.5">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label
                htmlFor="password"
                className="text-xs font-semibold text-gray-700"
              >
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password")}
                className="h-10 rounded-xl border-gray-300 text-sm focus-visible:ring-2 focus-visible:ring-green-700/20 focus-visible:border-green-700 transition"
              />
              {errors.password && (
                <p className="text-red-500 text-[11px] mt-0.5">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label
                htmlFor="confirm-password"
                className="text-xs font-semibold text-gray-700"
              >
                Confirm Password
              </Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                {...register("confirmPassword")}
                className="h-10 rounded-xl border-gray-300 text-sm focus-visible:ring-2 focus-visible:ring-green-700/20 focus-visible:border-green-700 transition"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-[11px] mt-0.5">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <p className="text-[11px] text-gray-400 pt-0.5">
            Password: 8+ characters (Uppercase, Lowercase, Number & Symbol).
          </p>

          {/* Buttons */}
          <div className="space-y-2.5 pt-1">
            <Button
              type="submit"
              className="w-full h-10 bg-gradient-to-r from-green-950 via-green-900 to-green-800 hover:from-green-900 hover:to-green-700 text-white font-bold rounded-xl shadow-md transition-all active:scale-[0.99] cursor-pointer text-sm"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? (
                <>
                  <Loader2 size={16} className="animate-spin mr-2" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <span>Create Account</span>
              )}
            </Button>

            <div className="relative my-2 text-center text-xs after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-gray-200">
              <span className="relative z-10 bg-white px-2.5 text-gray-400 font-medium uppercase tracking-wider text-[10px]">
                or continue with
              </span>
            </div>

            <Button
              variant="outline"
              type="button"
              className="w-full h-10 border-gray-300 hover:bg-gray-50 rounded-xl font-semibold text-xs text-gray-700 flex items-center justify-center gap-2 transition cursor-pointer shadow-2xs"
              onClick={() => signIn("google", { callbackUrl: "/" })}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Sign up with Google</span>
            </Button>

            <p className="text-center text-xs text-gray-500 pt-1">
              Already have an account?{" "}
              <Link
                href="/login"
                className="underline underline-offset-4 text-green-800 font-bold hover:text-green-900 transition"
              >
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default SignupForm;
