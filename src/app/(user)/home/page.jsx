"use client";

import AboutSection from "@/components/AboutSection";
import EmailSection from "@/components/EmailSection";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectSection";
import axios from "axios";
import React, { useEffect, useState } from "react";

const page = () => {
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const getMe = async () => {
      try {
        const response = await axios.get("/api/public/profile");
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    const fetchProjects = async () => {
      try {
        const response = await axios.get("/api/public/project");
        setProjects(response.data.projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    getMe();
    fetchProjects();
  }, []);

  return (
    <div className="container mt-24 mx-auto px-12 py-4">
      <HeroSection user={user} />
      <AboutSection user={user} />
      <ProjectsSection projects={projects} />
      <EmailSection />
    </div>
  );
};

export default page;
