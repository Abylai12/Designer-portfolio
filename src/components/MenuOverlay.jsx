import React, { useState } from "react";
import NavLink from "./NavLink";
import Link from "next/link";

const MenuOverlay = ({ links }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };
  return (
    <div className="">
      <ul className="flex flex-col py-4 items-center">
        {links.map((link, index) => (
          <li key={index}>
            <NavLink href={link.path} title={link.title} />
          </li>
        ))}
        {/* <li className="relative block py-2 pl-3 pr-4 text-[#ADB7BE] sm:text-xl rounded md:p-0 hover:text-white">
          <button onClick={handleOpen}>Download CV</button>
          {open && (
            <div className="absolute flex top-7 right-0">
              <Link
                href="/cv/resume-eng.pdf"
                download="resume-eng.pdf"
                className="px-1 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 hover:bg-slate-800 text-white mt-3"
              >
                <p className="bg-[#121212] hover:bg-slate-800 rounded-full px-3 py-2">
                  ENG
                </p>
              </Link>
              <Link
                href="/cv/resume-mgl.pdf"
                download="resume-mgl.pdf"
                className="px-1 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 hover:bg-slate-800 text-white mt-3"
              >
                <p className=" bg-[#121212] hover:bg-slate-800 rounded-full px-3 py-2">
                  MGL
                </p>
              </Link>
            </div>
          )}
        </li> */}
      </ul>
    </div>
  );
};

export default MenuOverlay;
