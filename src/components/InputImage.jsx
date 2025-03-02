"use client";

import { generateSHA1, generateSignature } from "@/utils/generate-signature";
import axios from "axios";
import { Upload } from "lucide-react";
import React, { useRef, useState } from "react";

const ImageInput = ({
  formData,
  setFormData,
  setImagePreviews,
  imagePreviews,
}) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("upload_preset", "portfolio");

    setUploading(true);
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
        uploadData
      );

      const imageUrl = response.data.secure_url;
      const publicId = response.data.public_id;

      setImagePreviews((prevImages) => [...prevImages, imageUrl]);

      setFormData((prevState) => ({
        ...prevState,
        images: [...(prevState.images || []), imageUrl],
        publicIds: [...(prevState.publicIds || []), publicId],
      }));
    } catch (error) {
      console.error("Upload failed", error);
    }

    setUploading(false);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleImageDelete = async (index) => {
    setUploading(true);
    const newPreviews = [...imagePreviews];
    newPreviews.splice(index, 1);
    setImagePreviews(newPreviews);

    const cloudName = process.env.NEXT_PUBLIC_CLOUD_NAME;
    const timestamp = new Date().getTime();
    const apiKey = process.env.NEXT_PUBLIC_CLOUD_API_KEY;
    const apiSecret = process.env.NEXT_PUBLIC_CLOUD_API_SECRET;
    const signature = generateSHA1(
      generateSignature(formData.publicIds[index], apiSecret)
    );
    const publicIdForRequest = formData.publicIds[index];
    const apiKeyForRequest = apiKey;
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;
    await axios.post(url, {
      public_id: publicIdForRequest,
      signature: signature,
      api_key: apiKeyForRequest,
      timestamp: timestamp,
    });
    setFormData((prevState) => ({
      ...prevState,
      images: prevState.images.filter((_, i) => i !== index),
      publicIds: prevState.publicIds.filter((_, i) => i !== index),
    }));
    setUploading(false);
  };

  return (
    <div className="p-4">
      <div className="flex justify-center">
        <input
          ref={fileInputRef}
          type="file"
          name="images"
          onChange={handleImageUpload}
          className="block mb-4"
          style={{ display: "none" }}
          multiple
        />

        {uploading ? (
          <div> uploading</div>
        ) : (
          <button
            disabled={uploading}
            type="button"
            onClick={handleButtonClick}
          >
            <label
              htmlFor="image"
              className="cursor-pointer bg-gray-700 py-2 px-3 border border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              <Upload className="h-5 w-5 inline-block mr-2" />
              Upload Image
            </label>
          </button>
        )}
      </div>

      {formData.images?.length === 0 && (
        <p className="text-red-500 text-sm">At least one image is required.</p>
      )}

      <div className="mt-4 flex flex-wrap gap-4">
        {imagePreviews.map((previewUrl, index) => (
          <div key={index} className="relative group">
            <img
              src={previewUrl}
              alt={`Preview ${index}`}
              className="w-24 h-24 object-cover rounded-md"
            />
            <button
              type="button"
              onClick={() => handleImageDelete(index)}
              className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageInput;
