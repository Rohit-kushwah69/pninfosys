"use client";

import { useGetAllCoursesQuery } from "../../../redux/features/course/courseApi";
import { useGetAllStudentQuery } from "../../../redux/features/student/studentApi";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import WhatsAppButton from "@/component/WhatsAppButton";
import { useCreateEnquiryMutation } from "../../../redux/features/courseEnquiry/courseEnquiryApi";

// Motion Variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const Course = () => {

  const { data: courseData } = useGetAllCoursesQuery()
  const courses = courseData?.courses || [];

  const { data: studentData } = useGetAllStudentQuery()
  const testimonials = studentData?.student || [];

  const [showModal, setShowModal] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    gender: "",
    qualification: "",
    experience: "",
    course: "",
    preferredBatch: "",
    modeOfLearning: "",
    message: "",
  });

  const [createEnquiry, { isLoading }] = useCreateEnquiryMutation();

  const handleChange = (e) =>
    setEnquiryForm({ ...enquiryForm, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEnquiry(enquiryForm).unwrap();
      toast.success("Enquiry submitted successfully");
      setShowModal(false);
      setEnquiryForm({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        gender: "",
        qualification: "",
        experience: "",
        course: "",
        preferredBatch: "",
        modeOfLearning: "",
        message: "",
      });
    } catch {
      toast.error("Failed to submit enquiry ❌");
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 via-white to-blue-100 text-gray-800 font-sans">
      <WhatsAppButton />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 via-black to-blue-800 text-white py-28 text-center shadow-xl">
        <div className="max-w-5xl mx-auto px-4" data-aos="fade-down">
          <h1 className="text-5xl font-extrabold mb-5 drop-shadow-md">Courses at PN INFOSYS</h1>
          <p className="text-mg text-gray-300">Master modern skills with hands-on learning, mentorship & career support.</p>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white py-14" data-aos="fade-up">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-10">Top Course Categories</h2>
          <div className="flex justify-center flex-wrap gap-4">
            {["Development", "Data", "Design","Mobile"].map((cat) => (
              <span key={cat} className="bg-blue-100 text-blue-800 font-medium px-6 py-2 rounded-full hover:bg-blue-200 transition cursor-pointer">
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto grid gap-12 sm:grid-cols-2 lg:grid-cols-3 px-4">
          {courses.map((course) => (
            <div key={course._id} className="bg-white rounded-xl overflow-hidden border hover:shadow-2xl transition-all group"
              data-aos="zoom-in">
              <img src={course.image.url} alt={course.title} className="w-full h-60 object-cover group-hover:scale-105 transition duration-300" />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-1">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{course.description}</p>
                <div className="flex justify-between text-sm mb-3">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">{course.duration}</span>
                  <span className="italic">{course.level}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-green-600">&#8377;{course.price}</span>
                  <button
                    onClick={() =>
                      setShowModal(true) ||
                      setEnquiryForm({ ...enquiryForm, course: course.title })
                    }
                    className="bg-gradient-to-r from-blue-700 to-blue-900 text-white px-4 py-2 rounded-lg hover:scale-105 transition"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20 bg-blue-950 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center" data-aos="fade-up">
          <h2 className="text-3xl font-bold mb-10">Why Choose PN INFOSYS?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "🎓", title: "Expert Mentors" },
              { icon: "💼", title: "Placement Support" },
              { icon: "📊", title: "Live Projects" },
              { icon: "🕒", title: "Flexible Schedule" },
            ].map((item, idx) => (
              <div key={idx} className="bg-white text-blue-900 rounded-xl p-6 shadow-md text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h4 className="font-bold text-lg">{item.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gradient-to-b from-white to-blue-50 py-20">
        <div className="max-w-6xl mx-auto px-4 text-center" data-aos="fade-up">
          <h2 className="text-3xl font-bold mb-10">What Our Students Say</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {testimonials.map((testi, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-lg text-left hover:shadow-xl transition">
                <div className="flex items-center gap-4 mb-4">
                  <img src={testi.image.url} alt={testi.title} className="w-14 h-14 rounded-full object-cover border-2 border-blue-500" />
                  <h4 className="font-bold text-gray-800">{testi.title}</h4>
                </div>
                <p className="text-gray-600">"{testi.description}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-950 text-white py-20 text-center">
        <div className="max-w-2xl mx-auto px-4" data-aos="fade-up">
          <h2 className="text-3xl font-bold mb-4">Need Personalized Guidance?</h2>
          <p className="mb-6 text-gray-300">Connect with our experts to find the perfect course match for your goals.</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <button className="bg-white text-blue-900 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition">Talk to a Mentor</button>
            <a href="https://wa.me/7000846823" target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-600 transition">
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* 🚀 Responsive VIP Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 px-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-black/60 to-purple-900/70 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 40 }}
              transition={{ type: "spring", stiffness: 120, damping: 14 }}
              className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl
                   w-full max-w-lg sm:max-w-xl md:max-w-2xl
                   p-4 sm:p-6 md:p-8 border border-transparent bg-clip-padding 
                   max-h-[90vh] overflow-y-auto"
              style={{
                borderImage: "linear-gradient(90deg,#3b82f6,#9333ea,#3b82f6) 1",
              }}
            >
              {/* Close */}
              <motion.button
                onClick={() => setShowModal(false)}
                whileHover={{ rotate: 180, scale: 1.2 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="absolute top-3 right-3 text-gray-400 hover:text-red-600 text-xl"
              >
                ✖
              </motion.button>

              {/* Header */}
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl sm:text-2xl md:text-3xl font-extrabold text-center 
                     text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2"
              >
                Enroll for {enquiryForm.course}
              </motion.h2>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="h-1 w-16 sm:w-20 md:w-28 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6"
              />

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
              >
                {[
                  { name: "firstName", type: "text", label: "First Name" },
                  { name: "lastName", type: "text", label: "Last Name" },
                  { name: "phone", type: "tel", label: "Phone" },
                  { name: "email", type: "email", label: "Email" },
                ].map((field, i) => (
                  <div key={i} className="relative col-span-1">
                    <input
                      {...field}
                      value={enquiryForm[field.name]}
                      onChange={handleChange}
                      required={field.name !== "lastName"}
                      className="peer w-full border border-gray-300 rounded-lg bg-white/70 
                           px-3 py-2 sm:py-2.5 pt-5 
                           focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                    />
                    <label className="absolute left-3 top-2 text-gray-500 text-xs transition-all 
                               peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 
                               peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-600">
                      {field.label}
                    </label>
                  </div>
                ))}

                {/* Gender */}
                <div className="col-span-1">
                  <label className="text-xs text-gray-600">Gender</label>
                  <select
                    name="gender"
                    value={enquiryForm.gender}
                    onChange={handleChange}
                    required
                    className="w-full border px-3 py-2 rounded-lg bg-white/70 focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="">Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>

                {/* Qualification */}
                <div className="col-span-1">
                  <label className="text-xs text-gray-600">Qualification</label>
                  <input
                    type="text"
                    name="qualification"
                    value={enquiryForm.qualification}
                    onChange={handleChange}
                    required
                    className="w-full border px-3 py-2 rounded-lg bg-white/70 focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>

                {/* Experience */}
                <div className="col-span-1">
                  <label className="text-xs text-gray-600">Experience</label>
                  <input
                    type="text"
                    name="experience"
                    value={enquiryForm.experience}
                    onChange={handleChange}
                    required
                    className="w-full border px-3 py-2 rounded-lg bg-white/70 focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>

                {/* Batch */}
                <div className="col-span-1">
                  <label className="text-xs text-gray-600">Preferred Batch</label>
                  <select
                    name="preferredBatch"
                    value={enquiryForm.preferredBatch}
                    onChange={handleChange}
                    required
                    className="w-full border px-3 py-2 rounded-lg bg-white/70 focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="">Select Batch</option>
                    <option>Morning</option>
                    <option>Evening</option>
                  </select>
                </div>

                {/* Mode */}
                <div className="col-span-1">
                  <label className="text-xs text-gray-600">Mode of Learning</label>
                  <select
                    name="modeOfLearning"
                    value={enquiryForm.modeOfLearning}
                    onChange={handleChange}
                    required
                    className="w-full border px-3 py-2 rounded-lg bg-white/70 focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="">Select Mode</option>
                    <option>Online</option>
                    <option>Offline</option>
                    <option>Hybrid</option>
                  </select>
                </div>

                {/* Message */}
                <div className="col-span-1 sm:col-span-2">
                  <label className="text-xs text-gray-600">Message</label>
                  <textarea
                    name="message"
                    value={enquiryForm.message}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded-lg bg-white/70 focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.03, backgroundPosition: "200% center" }}
                  className="col-span-1 sm:col-span-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 
                       bg-[length:200%_auto] text-white py-2.5 rounded-lg shadow-md 
                       font-semibold text-sm sm:text-base tracking-wide transition-all duration-500"
                >
                  {isLoading ? "Submitting..." : " Submit Course"}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
export default Course;



