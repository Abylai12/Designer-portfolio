"use client";

import { useState } from "react";
import { Trash, Edit } from "lucide-react";
import axios from "axios";
import ImageInput from "./InputImage";
import toast from "react-hot-toast";

const ProjectsTable = ({ projects, setProjects, setRefresh }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [imagePreviews, setImagePreviews] = useState(projects.images);
  const [openModal, setOpenModal] = useState(false);
  const [projectData, setProjectData] = useState({
    projectName: "",
    description: "",
    images: [],
    publicIds: [],
    types: "",
  });
  const [loading, setLoading] = useState(false);

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const openEditModal = (project) => {
    setSelectedProject(project);
    setImagePreviews(project.images);
    setProjectData({
      projectName: project.projectName,
      description: project.description,
      images: project.images,
      publicIds: project.publicIds,
      types: project.types,
    });
    setOpenModal(true);
  };

  const handleDelete = async (projectId) => {
    const token = localStorage.getItem("token");
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await axios.delete(`/api/project`, {
          data: { id: projectId },
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        setProjects((prev) => {
          return prev.filter((item) => item.id !== projectId);
        });
        toast.success("Project deleted successfully!");
      } catch (error) {
        console.error("Delete error:", error);
        toast.error("Failed to delete project");
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const res = await axios.put(
        `/api/project`,
        { projectData, id: selectedProject._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        toast.success("project updated successfully");
        setOpenModal(false);
        setRefresh((prev) => !prev);
      }
    } catch (error) {
      alert("Error updating project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      {/* Projects Table */}
      <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Project Name
            </th>
            <th scope="col" className="px-6 py-3">
              Project types
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Images
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr
              key={project._id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td className="px-6 py-4">{project.projectName}</td>
              <td className="px-6 py-4">{project.types}</td>
              <td className="px-6 py-4">{project.description}</td>
              <td className="px-6 py-4">
                {project.images.length > 0 ? (
                  <img
                    src={project.images[0]}
                    alt="image"
                    className="w-10 h-10 object-cover rounded-full"
                  />
                ) : (
                  "No images"
                )}
              </td>
              <td className="px-6 py-4 space-x-2">
                <button
                  onClick={() => openEditModal(project)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit size={20} />
                </button>

                <button
                  onClick={() => handleDelete(project._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Editing Project */}
      {openModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h2 className="text-xl font-semibold mb-4">Edit Project</h2>

            {/* Update Form */}
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
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
                      checked={projectData.types === "Exterior"}
                      onChange={handleModalChange}
                      required
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label
                      htmlFor="personal"
                      className="ml-2 text-sm text-gray-700"
                    >
                      Exterior
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="Interior"
                      name="types"
                      value="Interior"
                      checked={projectData.types === "Interior"}
                      onChange={handleModalChange}
                      required
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label
                      htmlFor="business"
                      className="ml-2 text-sm text-gray-700"
                    >
                      Interior
                    </label>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Project Name
                </label>
                <input
                  type="text"
                  name="projectName"
                  value={projectData.projectName}
                  onChange={handleModalChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500"
                  required
                />
              </div>

              {/* Description */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  rows="4"
                  name="description"
                  value={projectData.description}
                  onChange={handleModalChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500"
                  required
                />
              </div>

              <ImageInput
                formData={projectData}
                setFormData={setProjectData}
                setImagePreviews={setImagePreviews}
                imagePreviews={imagePreviews}
              />

              {/* Buttons */}
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setOpenModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsTable;
