
// src/app/api/auth/getMe/route.js
import dbConnect from "@/lib/db/connection";
import { isAuthenticatedUser } from "@/middlewares/auth";
import { NextResponse } from "next/server";
import User from "@/models/User";

export async function GET(req) {
  try {
    await dbConnect();
    console.log("GET /api/auth/getMe requested");

    const user = await isAuthenticatedUser(req);
    return NextResponse.json(
      { success: true, data: { _id: user._id, name: user.name || "", email: user.email } },
      { status: 200 }
    );
  } catch (error) {
    console.error("getMe error:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 401 }
    );
  }
}
