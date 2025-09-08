'use client';
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';
const LogoImg = '/colorlogo.png';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };
  const closeMenu = () => {
    setMenuOpen(false);
  };
  const menuItems = [
    { name: 'HOME', href: '/' },
    { name: 'ABOUT', href: 'about' },
    { name: 'SERVICE', href: 'service' },
    { name: 'TRAINING', href: 'training' },
    { name: 'COURSE', href: 'course' },
    {
      name: 'WORKSHOP',
      dropdown: [
        { label: 'MPCT COLLEGE', href: 'workshop/mpctCollege' },
        { label: 'PRESTIGE COLLEGE', href: 'workshop/prestigeCollege' },
        { label: 'XIAOMI MI COMPANY', href: 'workshop/miCompany' },
        { label: 'BENTCHAIR COMPANY', href: 'workshop/bentchairCompany' },
        { label: 'RJIT COLLEGE', href: 'workshop/rjitCollege' },
      ],
    },
    {
      name: 'PLACEMENT',
      dropdown: [
        { label: 'PLACEMENT DESK', href: 'placement/desk' },
        { label: 'PLACEMENT GALLERY', href: 'placement/gallery' },
      ],
    },
    {
      name: 'EVENTS',
      dropdown: [
        { label: 'TOURS', href: 'events/companyTours' },
        { label: "STUDENTS' BIRTHDAY", href: 'events/studentBirthday' },
        { label: 'ANNIVERSARY CELEBRATION', href: 'events/anniversaryCelebration' },
      ],
    },
    { name: 'CONTACT', href: 'contact' },
    { name: 'INTERNSHIP', href: 'internship', button: true },
  ];

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Urbanist:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <header className={`w-full fixed top-0 z-50 font-[Urbanist] transition-all duration-300 ${isScrolled ? 'backdrop-blur-md bg-white/70 shadow-md' : 'bg-white'}`}>
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
          <Link href="/">
            <img
              src={LogoImg}
              alt="PN INFOSYS Logo"
              className="h-12 w-auto hover:scale-105 transition-transform duration-300"
            />
          </Link>

          <div className="lg:hidden">
            <button onClick={handleMenuClick} aria-label="Toggle Menu">
              {menuOpen ? <X className="h-8 w-8 text-gray-900" /> : <Menu className="h-8 w-8 text-gray-900" />}
            </button>
          </div>

          <nav className="hidden lg:flex space-x-6 text-[15px] font-semibold text-gray-800 tracking-wide">
            {menuItems.map((item, idx) => (
              <div key={idx} className="relative group">
                {item.dropdown ? (
                  <>
                    <button className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
                      <span>{item.name}</span>
                      <span className="text-xs">▼</span>
                    </button>
                    <ul className="absolute left-0 top-full mt-2 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 w-56 z-30 border border-gray-100">
                      {item.dropdown.map((subItem, i) => (
                        <li key={i}>
                          <Link
                            href={`/${subItem.href}`}
                            className="block px-4 py-2 hover:bg-blue-50 text-gray-700"
                          >
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : item.button ? (
                  <Link
                    href={`/${item.href}`}
                    className="px-4 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-all"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <Link href={`/${item.href}`} className="hover:text-blue-600 transition-colors">
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="lg:hidden bg-white/90 px-4 pb-6 pt-2 shadow-lg border-t border-gray-100 animate-fadeIn">
            <nav className="space-y-2 text-sm font-medium text-gray-800">
              {menuItems.map((item, idx) => (
                <div key={idx}>
                  {item.dropdown ? (
                    <details className="group">
                      <summary className="cursor-pointer py-2 flex justify-between items-center hover:text-blue-600">
                        <span>{item.name}</span>
                        <span className="text-xs">▼</span>
                      </summary>
                      <ul className="pl-4 mt-1 space-y-1">
                        {item.dropdown.map((subItem, i) => (
                          <li key={i}>
                            <Link
                              href={`/${subItem.href}`}
                              onClick={closeMenu}
                              className="block py-1 text-gray-700 hover:text-blue-600"
                            >
                              {subItem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  ) : item.button ? (
                    <Link
                      href={`/${item.href}`}
                      onClick={closeMenu}
                      className="block text-center border border-blue-600 text-blue-600 px-4 py-2 rounded-full hover:bg-blue-600 hover:text-white transition-all"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <Link
                      href={`/${item.href}`}
                      onClick={closeMenu}
                      className="block py-2 hover:text-blue-600"
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
