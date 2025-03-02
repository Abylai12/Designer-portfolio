"use client";
import React, { useMemo } from "react";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";

const HeroSection = ({ user }) => {
  if (!user || !user.occupation) {
    return <div>Loading...</div>;
  }

  const occupationSequence = useMemo(() => {
    if (Array.isArray(user?.occupation) && user.occupation.length > 0) {
      const sequence = [];
      user.occupation.forEach((occupation) => {
        sequence.push(occupation, 1000);
      });
      return sequence;
    }
    return ["Exterior designer", 1000, "Interior designer", 1000];
  }, [user?.occupation]);

  return (
    <section className="lg:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-8 place-self-center text-center sm:text-left justify-self-start"
        >
          <h1 className="text-white mb-4 text-4xl sm:text-5xl lg:text-7xl lg:leading-normal font-extrabold">
            <span className=" bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600">
              Hi, I'm {user.userName}
            </span>
            <br />
            <TypeAnimation
              sequence={occupationSequence}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h1>
          <p className="text-[#ADB7BE] text-base sm:text-lg mb-6 lg:text-xl">
            {user.slogan}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-4 place-self-center mt-4 lg:mt-0"
        >
          <div className="rounded-full bg-[#181818] w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] relative">
            {user.image ? (
              <img
                src={user.image}
                alt="hero image"
                className="absolute rounded-full transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                width={300}
                height={300}
              />
            ) : (
              <div className="absolute rounded-full transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-gray-500 w-full h-full flex justify-center items-center">
                <span className="text-white">No Image</span>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
