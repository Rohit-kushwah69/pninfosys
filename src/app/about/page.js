"use client"

import { React, useState } from "react";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";
import TechnologiesSection from "@/component/TechnologiesSection";
import TeamCard from "@/component/TeamCard";

const backgroundImage = '/background-img.png';
const backgroundImage2 = '/page-heading-bg_i9miyf.png';

const About = () => {

  const steps = [
    {
      id: "01",
      title: "Consult your idea with us!",
      image: "/about image/card1.png"
    },
    {
      id: "02",
      title: "We'll Develop your idea",
      image: "/about image/card2.webp"
    },
    {
      id: "03",
      title: "We'll Digital Market your idea.",
      image: "/about image/card1.png"
    },
    {
      id: "04",
      title: "Client's happiness & happy",
      image: "/about image/card1.png"
    },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <main>
      {/* Hero Section */}
      <section>
        <div className="relative">
          <div
            className="bg-cover bg-center h-[80vh] flex flex-col justify-center items-center text-white text-center"
            style={{
              backgroundImage: `url(${backgroundImage.src})`,
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
            <Image
              src={backgroundImage2}
              alt="Foreground"
              fill
              className="object-cover opacity-30"
            />
            <div className="relative z-10 space-y-4 px-4">
              <h1 className="text-4xl md:text-5xl font-bold">About us</h1>
              <p className="text-sm md:text-base text-gray-300">
                <a className="text-white font-medium" href="/">Home</a> / About
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="bg-gradient-to-b from-blue-100 to-white py-16 px-4">
          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
              We are the best
            </h2>
            <p className="text-3xl md:text-4xl font-bold text-blue-700 mt-1">
              For all your needs
            </p>
          </div>

          {/* Steps Container */}
          <div className="flex flex-wrap justify-center gap-10 md:gap-20 max-w-7xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center relative group">
                {/* Step Card */}
                <div className="bg-white p-6 rounded-lg w-64 text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  {/* Step Number */}
                  <div className="bg-blue-600 text-white font-bold w-10 h-10 mx-auto rounded-md flex items-center justify-center mb-3">
                    {step.id}
                  </div>
                  {/* Image */}
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-16 h-16 mx-auto mb-4"
                  />
                  {/* Title */}
                  <h1 className="text-gray-800 font-medium text-xl">{step.title}</h1>
                </div>

                {/* Arrow: visible only on medium and above */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute right-[-35px] top-1/2 transform -translate-y-1/2 text-blue-500 text-3xl">
                    ➜
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-pink-900">
        <div className="text-white max-w-6xl mx-auto py-10 px-4 space-y-6">
          <h1 className="text-3xl md:text-5xl font-bold">Who & We are?</h1>
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Text Section */}
            <div className="text-sm flex-1 space-y-4">
              <p>
                We are a one-stop destination for all digital solutions, be it website designing, web development, digital marketing, SEO, mobile apps and full maintenance and compliance services for Government and Commercial facilities both large and small. Our elegant group of Developers provide their innovation who transform your idea into an amazing website Design or Mobile App Development while keeping every custom project unique.              </p>
              <p>
                We are part of this IT industry since 2018, we not only developed products and websites but also provide internship and training to students and make them capable to work in this IT software industry. Our internship and training program is totally based on hands-on practical experience with live projects.              </p>
              <p>
                Our team of certified IT professionals services Dental Offices, Medical Offices, Restaurants, Bars and all types of businesses throughout the Lowcountry and the world. Our team of certified IT professionals services Hospitals, Colleges, Research Institutes, Schools, Restaurants, Bars and all types of businesses throughout the Lowcountry and the world.              </p>
            </div>

            {/* Image with Video Icon */}
            <div className="relative flex-1">
              <img
                src="/about image/Learn.png" // use your 'Learn' image path here
                alt="Learn"
                className="w-full rounded-lg shadow-lg"
              />
              {/* Play Icon Overlay */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/60 transition duration-300 rounded-lg"
              >
                <FaPlay className="text-white text-4xl" />
              </button>
            </div>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
            <div className="bg-white text-gray-800 rounded-lg p-6 w-80 space-y-4">
              <h2 className="text-xl font-semibold">Choose an Option</h2>
              <div className="flex flex-col gap-3">
                <a
                  href="https://www.youtube.com/@pninfosys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-center"
                >
                  Watch Video
                </a>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
                  Visit Gallery
                </button>
              </div>
              <button
                className="text-sm text-gray-500 hover:text-gray-700 mt-4"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}

      </section>

      <section>
        <TechnologiesSection />
      </section>
      <section>
        <TeamCard />
      </section>
    </main>
  );
};

export default About;

