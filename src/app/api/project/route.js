// In /api/route.js
import connectDB from "@/config/db";
import Project from "@/config/project.model";
import { NextResponse } from "next/server";
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUD_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUD_API_SECRET,
});

export const POST = async (request) => {
  try {
    await connectDB();
    const { formData } = await request.json();
    const { projectName, description, images, publicIds, types } = formData;

    const newProject = new Project({
      projectName,
      description,
      images,
      publicIds,
      types,
    });

    await newProject.save();

    return new NextResponse(
      JSON.stringify({
        message: "Project created successfully",
      }),
      { status: 201 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 }
    );
  }
};

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

export const PUT = async (request) => {
  try {
    await connectDB();

    const { projectData, id } = await request.json();
    const { description, projectName, publicIds, images, types } = projectData;
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { projectName, description, images, publicIds, types },
      { new: true }
    );

    if (!updatedProject) {
      return new NextResponse(
        JSON.stringify({ message: "Project not found" }),
        { status: 404 }
      );
    }

    return new NextResponse(
      JSON.stringify({
        message: "Project updated successfully",
        project: updatedProject,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating project:", error);
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 }
    );
  }
};

export const DELETE = async (request) => {
  try {
    await connectDB();
    const { id } = await request.json();

    const project = await Project.findById(id);
    const publicIds = project.publicIds;

    cloudinary.api.delete_resources(
      publicIds,
      { resource_type: "raw" },
      function (result) {
        console.log(result);
      }
    );
    await Project.findByIdAndDelete(id);

    return new NextResponse(
      JSON.stringify({
        message: "Project deleted successfully",
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
