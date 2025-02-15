import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';
dotenv.config();

// const prisma = new PrismaClient();


// static login credential as per given assignement
export async function POST(req: Request) {
  const { username, password } = await req.json();

  // Static credentials (as per assignment)
  if (username === "priyam" && password === "priyam") {
    return NextResponse.json({ message: "Login successful" });
  } else {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
}