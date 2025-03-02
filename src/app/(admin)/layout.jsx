"use client";

import AdminNavbar from "@/components/AdminNav";
import { useAuth } from "@/context/AuthContext";

const AdminLayout = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <div>Unauthorized! You must be logged in.</div>;
  }

  return (
    <div>
      <AdminNavbar />
      <div>{children}</div>
    </div>
  );
};

export default AdminLayout;
