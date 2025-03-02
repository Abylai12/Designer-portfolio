"use client";

import axios from "axios";
import React, { useState } from "react";

const UpdateImage = ({ setFormData, formData }) => {
  const [imagePreview, setImagePreview] = useState(formData.image);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "portfolio");

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
        formData
      );

      setFormData((prevState) => ({
        ...prevState,
        image: response.data.secure_url,
      }));
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  return (
    <div>
      <label
        htmlFor="image"
        className="block text-sm font-medium text-gray-700"
      >
        Profile Image
      </label>
      <input
        type="file"
        id="image"
        name="image"
        accept="image/*"
        onChange={handleImageChange}
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
      />
      {imagePreview && (
        <div className="mt-4">
          <img
            src={imagePreview}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-full"
          />
        </div>
      )}
    </div>
  );
};

export default UpdateImage;
