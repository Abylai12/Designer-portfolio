import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import User from "@/config/user.model";

export const GET = async (request) => {
  try {
    await connectDB();

    const userId = request.headers.get("user-id");

    const user = await User.findById(userId);
    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    return new NextResponse(
      JSON.stringify({
        message: "User fetched successfully",
        user,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in get-me route:", error);
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 }
    );
  }
};
