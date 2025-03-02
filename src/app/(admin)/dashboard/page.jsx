"use client";

import CreateProject from "@/components/CreateProject";
import ProjectsTable from "@/components/ProjectTable";
import UserInfoUpdate from "@/components/UserInfoUpdate";
import axios from "axios";
import React, { useEffect, useState } from "react";

const AdminPage = () => {
  const [show, setShow] = useState(3);
  const [refresh, setRefresh] = useState(false);
  const [projects, setProjects] = useState([]);

  const handleTabChange = (tabIndex) => {
    setShow(tabIndex);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("/api/project");
        setProjects(response.data.projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, [refresh]);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => handleTabChange(1)}
          className={`${
            show === 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
          } py-2 px-4 rounded-md text-sm font-semibold hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
        >
          User Info
        </button>

        <button
          onClick={() => handleTabChange(2)}
          className={`${
            show === 2 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
          } py-2 px-4 rounded-md text-sm font-semibold hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
        >
          Create Project
        </button>
        <button
          onClick={() => handleTabChange(3)}
          className={`${
            show === 3 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
          } py-2 px-4 rounded-md text-sm font-semibold hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
        >
          Projects
        </button>
      </div>

      <div>
        {show === 1 && <UserInfoUpdate />}
        {show === 2 && <CreateProject setRefresh={setRefresh} />}
        {show === 3 && (
          <ProjectsTable
            projects={projects}
            setProjects={setProjects}
            setRefresh={setRefresh}
          />
        )}
      </div>
    </div>
  );
};

export default AdminPage;
