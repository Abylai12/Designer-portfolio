import connectDB from "@/config/db";
import User from "@/config/user.model";
import bcrypt from "bcryptjs";

export const POST = async (request) => {
  try {
    const { userForm } = await request.json();

    const { userName, password, email } = userForm;
    await connectDB();

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = User.create({
      userName,
      password: hashedPassword,
      email,
    });

    return new Response(
      JSON.stringify({ message: "User created successfully", newUser }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};

export const PUT = async (request) => {
  try {
    await connectDB();

    const userId = request.headers.get("user-id");

    const { data } = await request.json();

    const { email, userName, about, occupation, image, slogan, skills, hobby } =
      data;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { email, userName, about, occupation, image, slogan, skills, hobby },
      { new: true }
    );

    return new Response(
      JSON.stringify({ message: "User updated successfully", updatedUser }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};
