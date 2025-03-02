import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import User from "@/config/user.model";
import { generateToken } from "@/utils/generate-token";
import bcrypt from "bcryptjs";

// Cookie setting utility function
// export const setCookies = (response, token) => {
//   response.cookies.set("token", token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "lax",
//     maxAge: 60 * 60 * 1000,
//   });
//   return response;
// };

export const POST = async (request) => {
  try {
    const { userForm } = await request.json();
    const { password, email } = userForm;

    await connectDB();

    const user = await User.findOne({ email: email });
    if (!user) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid credentials" }),
        { status: 400 }
      );
    }

    const isCheck = bcrypt.compareSync(password, user.password);
    if (!isCheck) {
      return new NextResponse(
        JSON.stringify({ message: "Email or password do not match" }),
        { status: 400 }
      );
    }

    const token = generateToken({ id: user._id });

    return new NextResponse(
      JSON.stringify({
        message: "User logged in successfully",
        user,
        token,
      }),
      { status: 200 }
    );

    // Set cookies using the utility function
    // return setCookies(response, token);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 }
    );
  }
};
