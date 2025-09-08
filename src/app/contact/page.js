"use client";
import React, { useState } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { useCreateContactMutation } from '../../../redux/features/contact/contactApi';

const backgroundImage = '/background-img.png';
const backgroundImage2 = '/page-heading-bg_i9miyf.png';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [createContact, { isLoading, isSuccess, isError }] = useCreateContactMutation()
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createContact(formData).unwrap();
      alert("Message sent successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" }); // reset
    } catch (err) {
      console.error("Failed to send message", err);
      alert("Something went wrong!");
    }
  };

  return (
    <main>
      {/* Hero Section */}
      <section>
        <div className="relative">
          <div
            className="bg-cover bg-center h-[80vh] flex flex-col justify-center items-center text-white text-center"
            style={{
              backgroundImage:
                `url(${backgroundImage.src})`,
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
            <img
              src={backgroundImage2}
              alt="Foreground"
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
            <div className="relative z-10 space-y-4 px-4">
              <h1 className="text-4xl md:text-5xl font-bold">Say Hello To Us!</h1>
              <p className="text-sm md:text-base text-gray-300">
                <Link href="/" className="text-white font-medium">Home</Link> / Contact Us
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Cards Section */}
      <section className="p-10">
        <div className="max-w-6xl mx-auto px-4 pb-20">
          <div className="grid gap-8 md:grid-cols-3 sm:grid-cols-2">
            {[
              {
                title: "Email Address",
                links: ["www.pninfosys.com", "support@pninfosys.com"],
                img: "/about image/service1.jpg",
                alt: "service 1"
              },
              {
                title: "Phone Number",
                links: ["+91 7000846823", "+91 7415289378"],
                img: "/about image/service2.jpg",
                alt: "service 2"
              },
              {
                title: "Street Address",
                links: ["Darpan Colony, Thatipur, Gwalior, Madhya Pradesh"],
                img: "/about image/service3.jpg",
                alt: "service 3"
              }
            ].map((card, index) => (
              <div key={index} className="rounded-xl shadow-lg bg-white transition duration-500 text-center p-6">
                <div className="flex justify-center items-center">
                  <div className="transition-transform duration-500 hover:scale-110 w-1/2">
                    <img src={card.img} alt={card.alt} className="w-full h-42 object-contain" />
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-4">{card.title}</h3>
                  {card.links.map((link, idx) => (
                    <a key={idx} href="#" className="hover:text-pink-500 block">{link}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Form + Info Section */}
      <section className="px-4 sm:px-8 md:px-16 lg:px-40 pb-20">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Form Card */}
          <div className="w-full md:w-1/2 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Say Hello To Us!</h2>
            <hr className="mb-4 border-amber-300" />
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="E-Mail Address"
                  className="w-full px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
              <textarea
                rows="4"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                className="w-full px-4 py-2 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
              ></textarea>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full md:w-auto bg-violet-600 hover:bg-violet-700 text-white font-medium px-6 py-2 rounded-full transition duration-300"
              >
                {isLoading ? "Sending..." : "Send Message Now"}
              </button>
            </form>
            {isSuccess && <p className="text-green-600 mt-2">✅ Message sent!</p>}
            {isError && <p className="text-red-600 mt-2">❌ Failed to send message</p>}
          </div>

          {/* Info Card */}
          <div className="w-full md:w-1/2 bg-white rounded-xl shadow-md p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">More Info</h2>
              <hr className="mb-4 border-amber-300" />
              <p className="text-gray-600 mb-4">
                <span className="text-blue-600 font-extrabold text-2xl">PN </span>
                <span className="text-gray-900 font-extrabold text-2xl">INFOSYS</span> provides the best service possible to its
                customers. For us, client satisfaction is top priority. Whatever we do, we ensure it’s done with expertise.
              </p>
              <p className="text-gray-600">
                PN INFOSYS delivers a full range of maintenance and compliance services for both government and commercial
                establishments—big and small.
              </p>
            </div>
            <div className="mt-6">
              <button className="bg-violet-600 hover:bg-violet-700 text-white font-medium px-6 py-2 rounded-full transition duration-300">
                Read More..
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Google Map Section */}
      <section className="pb-20 px-4 sm:px-8 md:px-16 lg:px-40">
        <div className="rounded-xl overflow-hidden shadow-lg w-full h-[400px]">
          <iframe
            title="PN INFOSYS Location"
            src="https://www.google.com/maps/place/PN+INFOSYS/@26.20837,78.206961,791m/data=!3m1!1e3!4m6!3m5!1s0x3976c3a3faabd5e3:0x88d563b9d79500ed!8m2!3d26.2081772!4d78.2068855!16s%2Fg%2F11fhv3pvv2?hl=en&entry=ttu&g_ep=EgoyMDI1MDkwMy4wIKXMDSoASAFQAw%3D%3D"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

    </main>
  );
};

export default Contact;
