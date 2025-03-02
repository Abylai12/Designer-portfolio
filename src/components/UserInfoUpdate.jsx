"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import UpdateImage from "./UpdateImage";

const UserInfoUpdate = () => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    userName: user?.userName || "",
    email: user?.email || "",
    occupation: user?.occupation || [],
    skills: user?.skills || "",
    hobby: user?.hobby || "",
    about: user?.about || "",
    image: user?.image || null,
    slogan: user?.slogan || "",
  });
  const [errors, setErrors] = useState({});

  const [newOccupation, setNewOccupation] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        userName: user.userName,
        email: user.email,
        occupation: user.occupation || [],
        skills: user.skills || "",
        hobby: user.hobby || "",
        about: user.about || "",
        image: user.image || null,
        slogan: user.slogan || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.userName.trim()) newErrors.userName = "Username is required";
    if (!formData.about.trim()) newErrors.about = "About is required";
    if (!formData.slogan.trim()) newErrors.slogan = "Slogan is required";
    if (!formData.skills.trim()) newErrors.skills = "Skills is required";
    if (!formData.hobby.trim()) newErrors.hobby = "Hobby is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (formData.occupation.length < 1)
      newErrors.occupation = "At least one occupation is required";
    return newErrors;
  };

  const handleAddOccupation = () => {
    if (
      newOccupation.trim() &&
      !formData.occupation.includes(newOccupation.trim())
    ) {
      setFormData((prevState) => ({
        ...prevState,
        occupation: [...prevState.occupation, newOccupation.trim()],
      }));
      setNewOccupation(""); // Clear the input after adding
    } else {
      toast.error("Please enter a valid and unique occupation.");
    }
  };

  const handleRemoveOccupation = (index) => {
    setFormData((prevState) => ({
      ...prevState,
      occupation: prevState.occupation.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        await updateUser(formData);
      } catch (error) {
        toast.error("Error updating user information.");
      }
    } else {
      toast.error("Please fill in all required fields.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Update Your Information</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="userName"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.userName && (
            <p className="text-red-500 text-sm">{errors.userName}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="occupation"
            className="block text-sm font-medium text-gray-700"
          >
            Occupation
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              id="occupation"
              name="occupation"
              value={newOccupation}
              onChange={(e) => setNewOccupation(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter occupation"
            />
            <button
              type="button"
              onClick={handleAddOccupation}
              className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
            >
              Add
            </button>
          </div>
          <div className="mt-2">
            {formData.occupation.length > 0 && (
              <ul className="list-disc pl-5">
                {formData.occupation.map((occupation, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>{occupation}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveOccupation(index)}
                      className="text-red-500 text-sm"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {errors.occupation && (
            <p className="text-red-500 text-sm">{errors.occupation}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="skills"
            className="block text-sm font-medium text-gray-700"
          >
            Skills (comma separated)
          </label>
          <input
            type="text"
            id="skills"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Corel, 3D max"
          />
        </div>
        <div>
          <label
            htmlFor="hobby"
            className="block text-sm font-medium text-gray-700"
          >
            Hobby (comma separated)
          </label>
          <input
            type="text"
            id="hobby"
            name="hobby"
            value={formData.hobby}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Fishing, Computer games"
          />
        </div>
        <div>
          <label
            htmlFor="skills"
            className="block text-sm font-medium text-gray-700"
          >
            Slogan
          </label>
          <input
            type="text"
            id="slogan"
            name="slogan"
            value={formData.slogan}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., we make together"
          />
        </div>

        <div>
          <label
            htmlFor="about"
            className="block text-sm font-medium text-gray-700"
          >
            About (Optional)
          </label>
          <textarea
            id="about"
            name="about"
            value={formData.about}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            rows="4"
            placeholder="Tell us about yourself..."
          />
        </div>
        <UpdateImage setFormData={setFormData} formData={formData} />
        <div className="mt-4">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Update Information
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserInfoUpdate;
