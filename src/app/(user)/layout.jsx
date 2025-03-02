"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const HomeLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen flex-col bg-[#121212]">{children}</div>
      <Footer />
    </div>
  );
};

export default HomeLayout;
