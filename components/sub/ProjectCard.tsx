import Image from "next/image";
import React from "react";

interface Props {
  src: string;
  title: string;
  description: string;
  link: string;
}

const ProjectCard = ({ src, title, description, link }: Props) => {
  return (
    <div className="relative w-[370px] h-[500px] overflow-hidden rounded-lg shadow-lg border border-[#2A0E61] hover:shadow-xl transition-transform transform hover:scale-105 p-1">
      {/* Image Section */}
      <div className="w-full h-[200px] flex items-center justify-center bg-black">
        <Image src={src} alt={title} width={350} height={200} className="object-contain" />
      </div>

      {/* Text Section */}
      <div className="relative p-4 text-center">
        <h1 className="text-2xl font-semibold text-white font-serif">{title}</h1>
        <p className="mt-2 text-gray-300 italic text-justify font-serif text-md">{description}</p>
      </div>

      {/* "View" Button - Ensuring it's Clickable */}
      <div className="flex justify-center relative z-10">
        <a href={link} target="_blank" rel="noopener noreferrer">
          <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition cursor-pointer">
            View
          </button>
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
