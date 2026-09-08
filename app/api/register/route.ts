import { NextResponse } from "next/server";
import { supabase } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Request body:", body);

    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Tamam fields (name, email, password) bharna lazmi hain." },
        { status: 400 },
      );
    }

    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (existingUser) {
      return NextResponse.json(
        { error: "Is email address ke sath account pehle se mojood hai." },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error: insertError } = await supabase
      .from("users")
      .insert([
        {
          full_name: name,
          email,
          password: hashedPassword,
        },
      ])
      .select("id, full_name, email")
      .single();
    if (insertError) {
      throw new Error(insertError.message);
    }

    return NextResponse.json(
      {
        success: true,
        message: "User successfully register ho gaya hai!",
        user: data,
      },
      { status: 201 },
    );
  } catch (err: any) {
    console.error("API Error:", err);
    return NextResponse.json(
      { error: err.message || "Server error ho gaya hai" },
      { status: 500 },
    );
  }
}
