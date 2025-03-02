import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import User from "@/config/user.model";

export const GET = async () => {
  try {
    await connectDB();

    const user = await User.find();
    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    const userData = {
      userName: user[0].userName,
      about: user[0].about,
      slogan: user[0].slogan,
      image: user[0].image,
      occupation: user[0].occupation,
      skills: user[0].skills,
      hobby: user[0].hobby,
    };

    return new NextResponse(
      JSON.stringify({
        message: "User fetched successfully",
        user: userData,
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
