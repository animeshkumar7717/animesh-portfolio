import React from "react";
import ProjectCard from "../sub/ProjectCard";

const Projects = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20" id="projects">
      <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20">
        My Projects
      </h1>
      <div className="h-full w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-10">
        <ProjectCard
          src="/one-buy.png"
          title="1Buy"
          description="1Buy connects buyers and sellers for pre-owned products. Buyers create accounts, search for items, and negotiate prices with sellers. Once a deal is agreed upon, the platform purchases the product and handles secure delivery to the buyer."
          link="https://1buy.ai/"
        />
        <ProjectCard
          src="/first-shot.png"
          title="FirstShot"
          description="A platform for users to search and access influencer data from YouTube, Instagram. Based on their subscription plan, users can retrieve details like email, location, and contact info. They can also create campaigns and access additional features for targeted outreach."
          link="https://user.buzzwatch.io/"
        />
        <ProjectCard
          src="/gutbuddy.png"
          title="Gutbuddy"
          description="A healthcare platform where patients can search for doctors, describe their symptoms, and book appointments. Doctors receive notifications and can accept or reject requests. If rejected, patients are notified and can reapply to get another available doctor."
          link="http://primegenrx.com/"
        />
      </div>
    </div>
  );
};

export default Projects;
