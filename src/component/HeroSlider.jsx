'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useGetAllSlidesQuery } from '../../redux/features/slider/sliderApi';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HeroSlider() {
  const { data, isLoading, isError } = useGetAllSlidesQuery();
  const slides = Array.isArray(data?.slides) ? data.slides : [];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [slides]);

  const prevSlide = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);

  if (isLoading) {
    return (
      <div className="h-[700px] flex items-center justify-center bg-gray-100 animate-pulse">
        <p className="text-gray-500 text-lg">Loading PN Infosys...</p>
      </div>
    );
  }

  if (isError || slides.length === 0) {
    return (
      <div className="h-[700px] flex items-center justify-center bg-red-100">
        <p className="text-red-600 text-lg">No slides found or failed to load.</p>
      </div>
    );
  }

  const { title = '', subtitle = '', image = {} } = slides[index] || {};

  return (
    <div className="relative w-full h-[700px] overflow-hidden group">
      {/* Background Image with Parallax */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {image?.url ? (
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1.2 }}
              transition={{ duration: 7, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <Image
                src={image.url}
                alt={title}
                fill
                priority
                className="object-cover object-center"
              />
            </motion.div>
          ) : (
            <div className="absolute inset-0 bg-gray-400 flex items-center justify-center text-black text-xl font-bold">
              No Image Found
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* VIP Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/60 to-black/20 z-0" />

      {/* Slide Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center z-10">
        <motion.h1
          key={index}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-500 text-transparent bg-clip-text leading-tight drop-shadow-lg"
        >
          {title}
        </motion.h1>

        <motion.p
          key={`sub-${index}`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-5 text-white text-lg sm:text-xl max-w-xl"
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-8"
        >
          <Link
            href="/internship"
            className="relative inline-block px-8 py-3 text-lg font-semibold text-white rounded-full border border-cyan-500 bg-gradient-to-r from-cyan-500/40 via-blue-500/30 to-purple-500/20 hover:from-cyan-500/60 hover:via-blue-500/50 hover:to-purple-500/40 transition-all duration-300 shadow-lg"
          >
            Apply Now
          </Link>
        </motion.div>
      </div>

      {/* Slide Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition shadow-lg"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition shadow-lg"
      >
        <ChevronRight size={28} />
      </button>

      {/* Slide Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, i) => (
          <motion.div
            key={i}
            onClick={() => setIndex(i)}
            animate={{ scale: i === index ? 1.4 : 1, opacity: i === index ? 1 : 0.5 }}
            transition={{ duration: 0.3 }}
            className="w-3 h-3 rounded-full bg-white cursor-pointer"
          />
        ))}
      </div>
    </div>
  );
}
