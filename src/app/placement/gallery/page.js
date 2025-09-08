"use client"
import React from 'react'
const backgroundImage = '/background-img.png';
const backgroundImage2 = '/page-heading-bg_i9miyf.png';

const students = [
    {
        name: 'ritik bansal',
        role: 'Full Stack Developer',
        company: 'expert webtech',
        image: '/pg/1.png',
    },
    {
        name: 'Shivraj dhakad',
        role: 'Full Stack Developer',
        company: 'First fiddle',
        image: '/pg/2.png',
    },
    {
        name: 'Akanksha Rajauria',
        role: 'Full Stack Developer',
        company: 'Apptech',
        image: '/pg/3.jpg',
    }, {
        name: 'Vipin sharma',
        role: 'Full Stack Developer',
        company: 'capgemini',
        image: '/pg/4.jpg',
    },
    {
        name: 'Vishal Gaur',
        role: 'Software engineer',
        company: 'Infosys',
        image: '/pg/5.jpg',
    },
    {
        name: 'rohit rathore',
        role: 'Full Stack Developer',
        company: 'Mile High(Delhi) ',
        image: '/pg/6.jpg',
    },
];

const PlacementGallery = () => {
    return (
        <main>
            <section>
                <div className="relative">
                    {/* Background Image Section */}
                    <div
                        className="bg-cover  bg-center h-[80vh] flex flex-col justify-center items-center text-white text-center"
                        style={{
                            backgroundImage: `url(${backgroundImage.src})`,
                        }}
                    >
                        {/* Dark Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-60"></div>

                        {/* Foreground Image Overlay */}
                        <img
                            src={backgroundImage2} alt="Foreground"
                            className="absolute inset-0 w-full h-full object-cover opacity-30"
                        />

                        {/* Text Content */}
                        <div className="relative z-10 space-y-4 px-4">
                            <h1 className="text-4xl md:text-5xl font-bold">Placement Gallery</h1>

                        </div>
                    </div>
                </div>
            </section>
            <section className="py-12 bg-gray-100">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Students Who Got Placed</h2>
                <div className="max-w-6xl mx-auto px-4 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                    {students.map((student, index) => (
                        <div key={index} className="relative rounded-xl overflow-hidden shadow-lg">
                            <img src={student.image} alt={student.name} className="w-full h-100 object-cover" />
                            <div className="absolute bottom-0 w-full bg-black bg-opacity-60 text-white p-4 text-center">
                                <h3 className="text-lg font-semibold">{student.name}</h3>
                                <p className="text-sm">{student.role}</p>
                                <p className="text-xs">{student.company}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    )
}

export default PlacementGallery

