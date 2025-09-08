'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaCode, FaPalette, FaBullhorn, FaUsers,
  FaProjectDiagram, FaChalkboardTeacher,
  FaYoutube, FaInstagram, FaWhatsapp, FaEnvelope
} from 'react-icons/fa';
import WhatsAppButton from '@/component/WhatsAppButton';
import { useCreateInternshipMutation } from '../../../redux/features/internship/internshipApi';

const Internship = () => {

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    internshipDomain: "",
    internshipType: "Full-time",
    skills: "",
    message: "",
  });
  const [resume, setResume] = useState(null);
  const [createInternship, { isLoading }] = useCreateInternshipMutation()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (let key of ["name", "email", "phone", "internshipDomain", "message"]) {
      if (!form[key]) {
        alert(`Please fill out the ${key} field`);
        return;
      }
    }
    if (!resume) {
      alert("Please upload your resume");
      return;
    }

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (key === "skills") {
          formData.append(key, value ? value.split(",").map((s) => s.trim()) : []);
        } else {
          formData.append(key, value);
        }
      });
      formData.append("resume", resume);

      const result = await createInternship(formData);

      if (result.error) {
        alert(result.error.data?.message || result.error.message || "Failed to submit.");
      } else {
        alert("Internship application submitted successfully!");
        setForm({
          name: "",
          email: "",
          phone: "",
          internshipDomain: "",
          internshipType: "Full-time",
          skills: "",
          message: "",
        });
        setResume(null);
      }
    } catch (err) {
      console.error(err);
      alert("Unexpected error occurred. Please try again.");
    }
  };


  return (
    <div className="bg-white text-gray-800">
      <WhatsAppButton />

      {/* Hero Section */}
      <section className="relative bg-cover bg-center min-h-[80vh] flex items-center justify-center text-center px-6"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1551434678-e076c223a692')` }}>
        <div className="absolute inset-0 bg-black/60"></div>
        <motion.div className="relative z-10 max-w-3xl" initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}>
          <h1 className="text-white text-4xl md:text-6xl font-bold mb-4">Internship at PN INFOSYS</h1>
          <p className="text-white text-lg">Gain real experience, grow your skills, and get certified by experts.</p>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div>
            <FaUsers size={50} className="text-blue-600 mx-auto mb-2" />
            <h3 className="text-2xl font-bold">500+ Interns Trained</h3>
          </div>
          <div>
            <FaProjectDiagram size={50} className="text-green-600 mx-auto mb-2" />
            <h3 className="text-2xl font-bold">100+ Projects Delivered</h3>
          </div>
          <div>
            <FaChalkboardTeacher size={50} className="text-purple-600 mx-auto mb-2" />
            <h3 className="text-2xl font-bold">Industry Mentorship</h3>
          </div>
        </div>
      </section>

      {/* Domains */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Web Development',
              icon:
                <FaCode size={40} className="text-blue-500" />,
              desc: 'Learn HTML, CSS, JavaScript, React, Node.js & more.'
            },
            {
              title: 'UI/UX Design',
              icon:
                <FaPalette size={40} className="text-pink-500" />,
              desc: 'Figma, wireframes, design systems, and prototypes.'
            },
            {
              title: 'Digital Marketing',
              icon:
                <FaBullhorn size={40} className="text-yellow-500" />,
              desc: 'Master SEO, Google Ads, content & brand marketing.'
            }
          ].map((item, index) => (
            <motion.div key={index}
              className="bg-white shadow-xl rounded-xl p-6 text-center hover:shadow-2xl transition duration-300" whileHover={{
                scale: 1.05
              }} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{
                delay: index *
                  0.2
              }}>
              <div className="mb-4">{item.icon}</div>
              <h4 className="text-xl font-bold mb-2">{item.title}</h4>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">Internship Journey</h2>
          <ol className="border-l-4 border-blue-500 pl-6 space-y-10">
            {[
              'Apply Online & Choose Domain',
              'Attend Live Orientation Session',
              'Get Project Access & Start Building',
              'Submit Work & Get Reviewed',
              'Evaluation + Feedback',
              'Get Certified & Placement Help'
            ].map((step, i) => (
              <motion.li key={i} initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{
                delay: i *
                  0.2
              }}>
                <div className="relative">
                  <span className="absolute w-4 h-4 bg-blue-500 rounded-full -left-6 top-1.5"></span>
                  <h3 className="text-lg font-semibold">{step}</h3>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* Apply Form */}
      <section
        className="py-16 bg-gradient-to-br from-gray-100 via-gray-50 to-white min-h-screen flex items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
          className="w-full max-w-2xl p-8 bg-white rounded-3xl shadow-2xl border border-gray-200">
          <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-600 drop-shadow-md">
            Apply for Internship
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            {["name", "email", "phone", "internshipDomain"].map((field) => (
              <motion.div key={field} whileFocus={{ scale: 1.02 }}>
                <input type={field === "email" ? "email" : field === "phone" ? "tel" : "text"} name={field} placeholder={
                  field === "internshipDomain" ? "Internship Domain (e.g. Web Development)" : field.charAt(0).toUpperCase() +
                    field.slice(1)} value={form[field]} onChange={handleChange}
                  className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-300 rounded-xl p-3 transition-all duration-300 outline-none shadow-sm"
                  required />
              </motion.div>
            ))}

            <motion.textarea name="message" placeholder="Write a message..." value={form.message} onChange={handleChange}
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-300 rounded-xl p-3 transition-all duration-300 outline-none shadow-sm"
              required rows={4} />

            <motion.input type="text" name="skills" placeholder="Skills (comma separated, e.g. React, Node.js)"
              value={form.skills} onChange={handleChange}
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-300 rounded-xl p-3 transition-all duration-300 outline-none shadow-sm" />

            <motion.select name="internshipType" value={form.internshipType} onChange={handleChange}
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-300 rounded-xl p-3 transition-all duration-300 outline-none shadow-sm"
              required>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Remote">Remote</option>
              <option value="Onsite">Onsite</option>
            </motion.select>

            <motion.label htmlFor="resume"
              className="flex items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 text-gray-500">
              {resume ? resume.name : "Upload your resume (.pdf, .doc, .docx)"}
              <input id="resume" type="file" accept=".pdf,.doc,.docx" onChange={(e) => setResume(e.target.files[0])}
                className="hidden"
                required
              />
            </motion.label>

            <motion.button type="submit" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg disabled:bg-gray-400 transition-all duration-300">
              {isLoading ? "Submitting..." : "Submit Application"}
            </motion.button>
          </form>
        </motion.div>
      </section>

      {/* Social Media */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold mb-6">Connect with PN INFOSYS</h3>
          <div className="flex justify-center space-x-8 text-2xl">
            <a href="https://www.youtube.com/@pninfosys" target="_blank" rel="noopener noreferrer"
              className="text-red-600 hover:scale-110 transition">
              <FaYoutube />
            </a>
            <a href="https://www.instagram.com/pninfosys" target="_blank" rel="noopener noreferrer"
              className="text-pink-500 hover:scale-110 transition">
              <FaInstagram />
            </a>
            <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer"
              className="text-green-500 hover:scale-110 transition">
              <FaWhatsapp />
            </a>
            <a href="mailto:info@pninfosys.com" className="text-gray-700 hover:scale-110 transition">
              <FaEnvelope />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Internship;