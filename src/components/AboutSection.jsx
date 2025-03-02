"use client";
import React, { useTransition, useState } from "react";
import Image from "next/image";
import TabButton from "./TabButton";

const AboutSection = ({ user }) => {
  if (!user || !user.skills || !user.hobby) {
    return <div>Loading...</div>;
  }
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };
  const skillsArray = user.skills.split(",").map((skill) => skill.trim());
  const hobbyArray = user.hobby.split(",").map((hobby) => hobby.trim());

  return (
    <section className="text-white" id="about">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <Image
          alt="img"
          src="/images/about-image.png"
          width={500}
          height={500}
        />
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
          <p className="text-base lg:text-lg">{user.about}</p>
          <div className="flex flex-row justify-start mt-8">
            <TabButton
              selectTab={() => handleTabChange("skills")}
              active={tab === "skills"}
            >
              {" "}
              Skills{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("hobby")}
              active={tab === "hobby"}
            >
              Hobby
            </TabButton>
          </div>
          {tab === "skills" && (
            <div className="mt-2">
              <ul className="list-disc pl-2">
                {skillsArray.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          {tab === "hobby" && (
            <div className="mt-2">
              <ul className="list-disc pl-2">
                {hobbyArray.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
