'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  FaTachometerAlt,
  FaImages,
  FaBook,
  FaLaptopCode,
  FaBriefcase,
  FaCalendarAlt,
  FaUsers,
  FaUserTie,
  FaPhoneAlt,
  FaBookOpen,
} from 'react-icons/fa';

export default function Sidebar({ isOpen = true, closeSidebar }) {
  const pathname = usePathname();

  const navLinks = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: <FaTachometerAlt /> },
    { label: 'Slider', href: '/admin/slider', icon: <FaImages /> },
    { label: 'Course', href: '/admin/course', icon: <FaBook /> },
    { label: 'Course Enquiry', href: '/admin/courseEnquiry', icon: <FaBookOpen /> },
    { label: 'Technology', href: '/admin/technology', icon: <FaLaptopCode /> },
    { label: 'Portfolio', href: '/admin/portfolio', icon: <FaBriefcase /> },
    { label: 'Event', href: '/admin/event', icon: <FaCalendarAlt /> },
    { label: 'Team', href: '/admin/team', icon: <FaUsers /> },
    { label: 'Internship', href: '/admin/internship', icon: <FaUserTie /> },
    { label: 'Contact', href: '/admin/contact', icon: <FaPhoneAlt /> },
    { label: 'Learning', href: '/admin/learning', icon: <FaBookOpen /> },
    { label: 'Experience', href: '/admin/experience', icon: <FaBookOpen /> },
  ];

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: isOpen ? 0 : -300 }}
      transition={{ type: 'spring', stiffness: 80, damping: 20 }}
      className="fixed lg:static top-0 left-0 h-full w-64 bg-gray-900 text-white shadow-2xl flex flex-col z-50"
    >
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-700 flex justify-between items-center bg-gray-800 sticky top-0 z-10">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        {closeSidebar && (
          <button
            onClick={closeSidebar}
            className="lg:hidden text-white text-xl hover:text-red-400 transition"
          >
            ✕
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        {navLinks.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeSidebar}
              className={`flex items-center gap-3 p-3 rounded-md text-sm font-medium transition-all duration-200
                ${isActive
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md'
                  : 'hover:bg-gray-800 hover:pl-4'
                }`}
            >
              <span className="text-lg">{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </motion.aside>
  );
}
