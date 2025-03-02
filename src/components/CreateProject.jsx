"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios"; // Ensure axios is installed
import ImageInput from "./InputImage";

const CreateProject = ({ setRefresh }) => {
  const [imagePreviews, setImagePreviews] = useState([]);
  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    images: [],
    publicIds: [],
    types: "Interior",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.projectName.trim()) {
      errors.projectName = "Project Name is required.";
    }
    if (!formData.description.trim()) {
      errors.projectName = "Description is required.";
    }
    if (formData.images.length === 0) {
      errors.images = "At least one image is required.";
    }
    return errors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "/api/project",
        { formData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success("Project created successfully!");
        setFormData({
          projectName: "",
          description: "",
          images: [],
        });
        setImagePreviews([]);
        setRefresh((prev) => !prev);
      }
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error("Error creating project. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create a New Project</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <label className="block text-sm font-medium text-gray-700">
          Project Type
        </label>
        <div className="flex space-x-4 mt-2">
          <div className="flex items-center">
            <input
              type="radio"
              id="Exterior"
              name="types"
              value="Exterior"
              checked={formData.types === "Exterior"}
              onChange={handleChange}
              required
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="personal" className="ml-2 text-sm text-gray-700">
              Exterior
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="Interior"
              name="types"
              value="Interior"
              checked={formData.types === "Interior"}
              onChange={handleChange}
              required
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="business" className="ml-2 text-sm text-gray-700">
              Interior
            </label>
          </div>
        </div>

        <div>
          <label
            htmlFor="projectName"
            className="block text-sm font-medium text-gray-700"
          >
            Project Name
          </label>
          <input
            type="text"
            id="projectName"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            rows="4"
            placeholder="Describe your project"
          />
        </div>

        <ImageInput
          formData={formData}
          setFormData={setFormData}
          setImagePreviews={setImagePreviews}
          imagePreviews={imagePreviews}
        />

        {/* Submit Button */}
        <div className="mt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {loading ? "Creating..." : "Create Project"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProject;
