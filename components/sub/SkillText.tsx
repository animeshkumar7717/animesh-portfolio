/** @format */

"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/utils/motion";
import { SparklesIcon } from "@heroicons/react/24/solid";

const SkillText = () => {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <motion.div
        variants={slideInFromTop}
        className="Welcome-box py-2 px-3 border border-[#7042f88b] opacity-90 flex items-center"
      >
        <SparklesIcon className="text-[#b49bff] mr-2 h-5 w-5" />
        <h1 className="Welcome-text text-sm font-semibold text-white">
          Tech Stack & Tools
        </h1>
      </motion.div>

      <motion.div
        variants={slideInFromLeft(0.5)}
        className="text-3xl text-white font-semibold mt-4 text-center mb-4"
      >
        Building
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
          {" "}
          Scalable & High-Performance{" "}
        </span>
         Applications
      </motion.div>

      <motion.div
        variants={slideInFromRight(0.5)}
        className="text-lg text-gray-300 italic mb-8 text-center"
      >
        Transforming ideas into seamless digital experiences
      </motion.div>
    </div>
  );
};

export default SkillText;
