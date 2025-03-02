"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { LogOut } from "lucide-react";

const AdminNavbar = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <nav className="mx-auto border border-[#33353F] top-0 left-0 right-0 z-10 bg-[#121212] bg-opacity-100">
      <div className="flex container lg:py-4 flex-wrap items-center justify-between mx-auto px-4 py-2">
        <Link
          href={"/dashboard"}
          className="text-2xl md:text-5xl text-white font-semibold"
        >
          Portfolio
        </Link>
        <div className="flex gap-4">
          <p className="text-white"> {user.userName}</p>
          <button onClick={logout}>
            <LogOut className="text-white" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
