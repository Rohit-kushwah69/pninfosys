'use client';
import React from 'react';
import Link from 'next/link';
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
} from 'react-icons/fa';
const LogoImg = '/colorlogo.png';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 font-[Poppins] pt-20 pb-12 border-t border-gray-300">
      <div className="max-w-[1300px] mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">

        {/* Brand & About */}
        <div>
          <img
            src={LogoImg}
            alt="PN INFOSYS"
            className="h-16 mb-4 transition-transform duration-300"
          />
          <h2 className="text-2xl font-bold mb-3">PN INFOSYS</h2>
          <p className="text-[15px] text-gray-600 leading-7">
            We are a trusted IT company in Gwalior offering Web Development, UI/UX, Python Automation, Data Science, and Industrial Training.
          </p>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-xl font-semibold mb-5">Our Services</h3>
          <ul className="space-y-3 text-[16px] text-gray-700">
            {[
              'Website Development',
              'UI/UX & Branding',
              'Python Automation',
              'Internship Training',
            ].map((service, idx) => (
              <li key={idx} className="hover:text-indigo-600 transition cursor-pointer">{service}</li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-5">Quick Links</h3>
          <ul className="space-y-3 text-[16px] text-gray-700">
            {[
              { href: '/', label: 'Home' },
              { href: '/about', label: 'About Us' },
              { href: '/services', label: 'Services' },
              { href: '/training', label: 'Training' },

            ].map((link, i) => (
              <li key={i}>
                <Link
                  href={link.href}
                  className="hover:text-indigo-600 transition duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-xl font-semibold mb-5">Get in Touch</h3>
          <p className="text-[15px] text-gray-700 leading-7 mb-5">
            📍 Gwalior, India<br />
            📧 support@pninfosys.com<br />
            ☎ +91 7000846823<br />
            ☎ +91 7415289378
          </p>

          <h4 className="text-lg font-semibold mb-3">Follow Us</h4>
          <div className="flex space-x-5">
            <a
              href="https://www.facebook.com/pninfosys/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-gray-500 hover:text-blue-600 transition"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://www.linkedin.com/company/pninfosys/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-gray-500 hover:text-sky-600 transition"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-gray-500 hover:text-pink-500 transition"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://www.youtube.com/@pninfosys"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="text-gray-500 hover:text-red-600 transition"
            >
              <FaYoutube size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-16 border-t border-gray-300 pt-6 text-center text-[15px] text-gray-500">
        © 2025 <strong className="text-gray-700 font-medium">PN INFOSYS GWALIOR</strong>. All Rights Reserved.
        <div className="text-sm text-gray-400 mt-2">
          Designed & Developed by <span className="text-indigo-600">PN INFOSYS Team</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
