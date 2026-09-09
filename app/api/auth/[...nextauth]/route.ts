import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { supabase } from "@/lib/db";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email aur password dono lazmi hain.");
        }

        const { data: user, error } = await supabase
          .from("users")
          .select("*")
          .eq("email", credentials.email)
          .maybeSingle();

        if (error || !user) {
          throw new Error("Is email ke sath koi account mojood nahi hai.");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (!isPasswordValid) {
          throw new Error("Galat password! Dobara koshish karein.");
        }

        const ADMIN_EMAIL = "dawoodraj1856@gmail.com";
        const AGENT_EMAIL = "agent@gmail.com";

        let userRole = user.role || "customer";

        if (user.email === ADMIN_EMAIL) {
          userRole = "admin";
        } else if (user.email === AGENT_EMAIL) {
          userRole = "agent";
        }

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.full_name || user.name || "",
          role: userRole,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Production URL priority: process.env.NEXTAUTH_URL -> baseUrl
      const productionUrl =
        process.env.NEXTAUTH_URL ||
        (process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : baseUrl);

      // Agar relative URL hai (jaise "/")
      if (url.startsWith("/")) {
        return `${productionUrl}${url}`;
      }

      // Agar domain match karta ho
      try {
        if (new URL(url).origin === new URL(productionUrl).origin) {
          return url;
        }
      } catch {
        // invalid url fallback
      }

      return productionUrl;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
