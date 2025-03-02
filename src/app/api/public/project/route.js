import connectDB from "@/config/db";
import Project from "@/config/project.model";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectDB();

    const projects = await Project.find();
    return new NextResponse(
      JSON.stringify({
        message: "Project created successfully",
        projects,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 }
    );
  }
};
