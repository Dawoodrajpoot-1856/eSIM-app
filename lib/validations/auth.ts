import { z } from "zod";

export const signupSchema = z
  .object({
    name: z.string().min(2, "Naam kam az kam 2 characters ka hona chahiye"),

    email: z
      .string()
      .min(1, "Email lazmi hai")
      .email("Sahi email address enter karein"),

    password: z
      .string()
      .min(8, "Password kam az kam 8 characters ka hona chahiye")
      .regex(
        /[A-Z]/,
        "Kam az kam aik bara letter (Uppercase: A-Z) hona lazmi hai",
      )
      .regex(
        /[a-z]/,
        "Kam az kam aik chota letter (Lowercase: a-z) hona lazmi hai",
      )
      .regex(/[0-9]/, "Kam az kam aik number (0-9) hona lazmi hai")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Kam az kam aik special character (@, #, $, etc.) hona lazmi hai",
      ),

    confirmPassword: z.string().min(1, "Confirm password lazmi hai"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords aapas mein match nahi ho rahe",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email lazmi hai")
    .email("Sahi email address enter karein"),
  password: z.string().min(1, "Password lazmi hai"),
});

// Types export karein
export type SignupFormData = z.infer<typeof signupSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
