'use client'
import React from 'react'
import { useGetAllLearningQuery } from '../../../redux/features/learning/learningAPI';
import { useGetAllExperienceQuery } from '../../../redux/features/experience/page';

const backgroundImage = '/background-img.png';
const backgroundImage2 = '/page-heading-bg_i9miyf.png';


const Training = () => {

    //learning
    const { data: learningData } = useGetAllLearningQuery()
    const learningCourses = learningData?.learning || [];
    //experience
    const { data: experienceData } = useGetAllExperienceQuery()
    const internshipItems = experienceData?.experience || [];

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
                        <img
                            src={backgroundImage2} alt="Foreground"
                            className="absolute inset-0 w-full h-full object-cover opacity-30"
                        />
                        <div className="relative z-10 space-y-4 px-4">
                            <h1 className="text-4xl md:text-5xl font-bold">Training</h1>
                            <p className="text-sm md:text-base text-gray-300">
                                <a className="text-white font-medium" href="home">Home</a> / Training
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Helping Hands Section */}
            <section className="py-16 bg-gradient-to-br from-white via-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-10 items-center">

                    <div>
                        <h2 className="text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-amber-700 to-yellow-500 mb-6">
                            Helping Hands
                        </h2>
                        <p className="text-gray-700 text-lg leading-relaxed">
                            At <span className="text-amber-800 font-semibold">PN Infosys</span>, we empower students from all backgrounds — even those with no coding experience.
                            Through real, live project-based training, we turn your curiosity into in-demand skills. If you’re committed to learning, our <span className="text-cyan-700 font-semibold">Helping Hands</span> program is for you.
                        </p>
                        <ul className="mt-6 space-y-3 text-gray-700">
                            <li className="flex items-start"><span className="text-amber-600 text-xl mr-2">✔</span> Live project experience</li>
                            <li className="flex items-start"><span className="text-amber-600 text-xl mr-2">✔</span> Beginner-friendly guidance</li>
                            <li className="flex items-start"><span className="text-amber-600 text-xl mr-2">✔</span> 100% practical learning</li>
                        </ul>
                    </div>

                    <div className="overflow-hidden rounded-xl">
                        <img src="/Home image/service.png" alt="Helping Hands" className="w-full h-auto object-cover" />
                    </div>
                </div>
            </section>

            {/* Learn With Us Section */}
            <section className="py-24 bg-[#f8f9fa]">
                <div className="max-w-7xl mx-auto px-4 text-center">

                    <h2 className="text-3xl text-gray-600 font-medium uppercase">What Will You</h2>
                    <h3 className="text-5xl sm:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-700 drop-shadow mb-6">
                        Learn With Us
                    </h3>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-14">
                        Our training programs are built for passionate learners who want to build real-world skills through hands-on experience.
                    </p>

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {learningCourses.map((course, index) => (
                            <div key={index} className="bg-white shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden text-left">
                                <img src={course.image.url} alt={course.title} className="w-full h-56 object-cover" />
                                <div className="p-6 space-y-2">
                                    <h4 className="text-xl font-bold text-gray-800">{course.title}</h4>
                                    <p className="text-emerald-600 font-medium">{course.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12">
                        <a href="#" className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300">
                            Explore Full Curriculum →
                        </a>
                    </div>
                </div>
            </section>

            {/* Internship Experience Section */}
            <section className="py-24 bg-gradient-to-br from-white via-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-3xl text-gray-700 font-medium uppercase">Internship</h2>
                    <h3 className="text-5xl sm:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-700 to-blue-500 drop-shadow mb-6">
                        Experience
                    </h3>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-14">
                        Our internship program is where skills are sharpened with real-world experience, innovation, and practical work.
                    </p>

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
                        {internshipItems.map((item, index) => (
                            <div key={index} className="bg-white shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl p-6 text-center">
                                <img src={item.image.url} alt={item.title} className="h-24 mx-auto object-contain mb-4" />
                                <h4 className="text-xl font-semibold text-gray-800">{item.title}</h4>
                                <p className="text-gray-600 mt-2">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </main>
    );
};

export default Training;
