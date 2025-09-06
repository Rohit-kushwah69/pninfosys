"use client";
import Image from "next/image";
import React from "react";
import { useGetAllTechnologyQuery } from "../../redux/features/technology/page";
 

const TechnologiesSection = () => {
  const { data } = useGetAllTechnologyQuery()
  const technology = data?.technology || [];
  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-blue-700 mb-8">
          Our Technologies
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {technology.map((tech) => (
            <div
              key={tech._id}
              className="bg-white border hover:border-blue-500 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-center hover:-translate-y-2"
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-full border border-gray-200 shadow-sm bg-white overflow-hidden">
                <img
                  src={tech?.image.url}
                  alt={tech?.title}
                  className="w-full h-full object-contain"
                />
              </div>



              <h3 className="text-xl font-semibold text-gray-800">
                {tech.title}
              </h3>
              <p className="text-sm text-gray-600 mt-2">{tech.description}</p>
              <span className="inline-block mt-3 text-blue-500 text-xs font-medium uppercase tracking-wide">
                {tech.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologiesSection;
