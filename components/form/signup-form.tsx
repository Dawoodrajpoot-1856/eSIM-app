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
import { Loader2 } from "lucide-react";

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
    onSuccess: () => {
      setSuccessMsg(
        "Account kamyabi se ban gaya! Login page par redirect ho rahe hain...",
      );
      setTimeout(() => {
        router.push("/login");
      }, 1500);
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
      className="w-full max-w-md mx-auto shadow-lg border-gray-200"
    >
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold tracking-tight">
          Create an account
        </CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        {errorMsg && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md">
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 text-xs rounded-md">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              {...register("email")}
            />
            <p className="text-xs text-muted-foreground">
              We&apos;ll use this to contact you. We will not share your email
              with anyone else.
            </p>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password")}
            />
            <p className="text-xs text-muted-foreground">
              Must be at least 8 characters long (Uppercase, Lowercase, Number &
              Special Character).
            </p>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="••••••••"
              {...register("confirmPassword")}
            />
            <p className="text-xs text-muted-foreground">
              Please confirm your password.
            </p>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="space-y-2 pt-2">
            <Button
              type="submit"
              className="w-full bg-green-800 hover:bg-green-900 text-white"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending && (
                <Loader2 size={16} className="animate-spin mr-2" />
              )}
              Create Account
            </Button>

            <Button
              variant="outline"
              type="button"
              className="w-full cursor-pointer"
              onClick={() => signIn("google", { callbackUrl: "/" })}
            >
              Sign up with Google
            </Button>

            <p className="text-center text-sm text-muted-foreground pt-2">
              Already have an account?{" "}
              <Link
                href="/login"
                className="underline underline-offset-4 text-green-800 font-medium hover:text-green-900"
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
