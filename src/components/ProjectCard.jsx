"use client";

import React, { useState, useEffect } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const ProjectCard = ({ imgUrls, title, description }) => {
  if (!imgUrls || !title || !description) {
    return <div>Loading...</div>;
  }

  const [isExpanded, setIsExpanded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleDescription = () => setIsExpanded(!isExpanded);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % imgUrls.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + imgUrls.length) % imgUrls.length
    );
  };

  useEffect(() => {
    if (!isHovered && !isModalOpen && imgUrls.length > 1) {
      const interval = setInterval(nextImage, 3000);
      return () => clearInterval(interval);
    }
  }, [isHovered, imgUrls.length, isModalOpen]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div
        className="h-52 md:h-72 rounded-t-xl relative transition-all duration-500 cursor-pointer"
        onClick={openModal}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${imgUrls[currentImageIndex]})` }}
        />

        {/* Overlay and Controls */}
        <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-between px-4">
          {imgUrls.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="h-8 w-8 text-white hover:text-blue-400 transition-opacity opacity-0 group-hover:opacity-100 duration-300"
              >
                <ChevronLeftIcon className="h-6 w-6" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="h-8 w-8 text-white hover:text-blue-400 transition-opacity opacity-0 group-hover:opacity-100 duration-300"
              >
                <ChevronRightIcon className="h-6 w-6" />
              </button>
            </>
          )}
        </div>

        {/* Image Counter */}
        {imgUrls.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {imgUrls.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${
                  index === currentImageIndex ? "bg-blue-500" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
          <div className="relative max-w-6xl w-full max-h-[90vh]">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute -top-8 right-0 text-white hover:text-blue-400 z-50"
            >
              <XMarkIcon className="h-8 w-8" />
            </button>

            {/* Modal Content */}
            <div className="relative h-full w-full">
              <img
                src={imgUrls[currentImageIndex]}
                alt={title}
                className="object-contain max-h-[80vh] w-full rounded-lg"
              />

              {/* Modal Controls */}
              {imgUrls.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 text-white hover:text-blue-400 bg-black/30 p-2 rounded-full"
                  >
                    <ChevronLeftIcon className="h-8 w-8" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 text-white hover:text-blue-400 bg-black/30 p-2 rounded-full"
                  >
                    <ChevronRightIcon className="h-8 w-8" />
                  </button>

                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {imgUrls.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex(index);
                        }}
                        className={`h-3 w-3 rounded-full transition-all ${
                          index === currentImageIndex
                            ? "bg-blue-500 scale-125"
                            : "bg-gray-400"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Project Details */}
      <div className="text-white rounded-b-xl mt-3 bg-[#181818] py-6 px-4">
        <h5 className="text-xl font-semibold mb-2">{title}</h5>
        <p className="text-[#ADB7BE]">
          {isExpanded ? description : `${description.slice(0, 120)}`}
          {description.length > 120 && (
            <button
              onClick={toggleDescription}
              className="text-blue-400 ml-2 hover:text-blue-300 transition-colors"
            >
              {isExpanded ? "Show Less" : "Show More"}
            </button>
          )}
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;
