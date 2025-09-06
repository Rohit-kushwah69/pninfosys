"use client"
import React, { useState } from 'react'
const backgroundImage = '/background-img.png';
const backgroundImage2 = '/page-heading-bg_i9miyf.png';

const MiCompany = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const images = [
        {
            src: 'https://res.cloudinary.com/dow1049t2/image/upload/v1728757357/PN_INFOSYS/workshop_vaibhav1_rlga53.png',
            alt: 'Image 1',
        },
        {
            src: 'https://res.cloudinary.com/dow1049t2/image/upload/v1728757354/PN_INFOSYS/mi2_bja4yx.jpg',
            alt: 'Image 2',
        },
        {
            src: 'https://res.cloudinary.com/dow1049t2/image/upload/v1728757351/PN_INFOSYS/workshop_vaibhav3_myv7tf.png',
            alt: 'Image 3',
        },
        {
            src: 'https://res.cloudinary.com/dow1049t2/image/upload/v1728757348/PN_INFOSYS/workshop_vaibhav4_ijiaw4.png',
            alt: 'Image 4',
        },
        {
            src: 'https://res.cloudinary.com/dow1049t2/image/upload/v1728757336/PN_INFOSYS/mi8_bpehxq.jpg',
            alt: 'Image 5',
        },
        {
            src: 'https://res.cloudinary.com/dow1049t2/image/upload/v1728757346/PN_INFOSYS/mi5_v7fvon.jpg',
            alt: 'Image 6',
        },
        {
            src: 'https://res.cloudinary.com/dow1049t2/image/upload/v1728757343/PN_INFOSYS/mi6_reowcl.jpg',
            alt: 'Image 7',
        },
    ];
    return (
        <main>
            <section>
                <div className="relative">
                    {/* Background Image Section */}
                    <div
                        className="bg-cover bg-center h-[80vh] flex flex-col justify-center items-center text-white text-center"
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
                            <h1 className="text-4xl md:text-5xl font-bold">Xiaomi Mi Company</h1>
                            <p className="text-sm md:text-base text-gray-300">
                                <a className="text-white font-medium" href="home">Home</a>/Workshop
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-12 bg-gray-100">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-2xl text-pink-500 font-bold text-center mb-1">
                        Xiaomi WorkShop
                    </h2>
                    <h2 className="text-xl font-sans text-center mb-10">WorkShop by our seniour Advisor Mr.Vaibhav Shrivastav</h2>

                    {/* Gallery */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {images.map((image, idx) => (
                            <div
                                key={idx}
                                className="bg-white shadow-md rounded-xl overflow-hidden transition-transform duration-500 hover:scale-110 cursor-pointer"
                                onClick={() => setSelectedImage(image)}
                            >
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className="w-full h-60 object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* ✅ Modal */}
                {selectedImage && (
                    <div
                        className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center"
                        onClick={() => setSelectedImage(null)}
                    >
                        <div className="relative max-w-3xl w-full px-4" onClick={(e) => e.stopPropagation()}>
                            <button
                                className="absolute top-2 right-2 text-white text-2xl font-bold"
                                onClick={() => setSelectedImage(null)}
                            >
                                &times;
                            </button>
                            <img
                                src={selectedImage.src}
                                alt={selectedImage.alt}
                                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                            />
                        </div>
                    </div>
                )}
            </section>
        </main>
    )
}

export default MiCompany
