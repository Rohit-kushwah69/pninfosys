"use client";
import { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';
import Image from 'next/image';
import { motion } from 'framer-motion';
import HeroSlider from '@/component/HeroSlider';
import WhatsAppButton from '@/component/WhatsAppButton';
import { useGetAllTechnologyQuery } from '../../redux/features/technology/technologyApi';
import { useGetAllEventsQuery } from '../../redux/features/event/eventApi';
import { useGetAllPortfoliosQuery } from '../../redux/features/portfolio/portfolioApi';


const Page = () => {
  // technology
  const { data: technologyData } = useGetAllTechnologyQuery();
  const technology = technologyData?.technology || [];

  // eventData 
  const { data: eventData } = useGetAllEventsQuery();
  const event = eventData?.event || [];

  // portfolio
  const { data: portfolioData } = useGetAllPortfoliosQuery()
  const portfolio = portfolioData?.portfolio || []


  const cards = [
    {
      image: "/Home image/card1.jpg",
      title: "Collaborative Spirit",
      description: "We believe in developing true partnerships and making clients happy.",
    },
    {
      image: "/Home image/card2.png",
      title: "Expert Thinking",
      description: "We bring robust skill and forward-looking perspectives to solve customer challenges.",
    },
    {
      image: "/Home image/card3.jpg",
      title: "Client Success",
      description: "We focus on measurable outcomes and long-term client satisfaction.",
    },
    {
      image: "/Home image/card4.png",
      title: "Industrial Training",
      description: "We provide free industrial internships to novice undergraduates to help them grow.",
    }
  ];
  const services = [
    {
      title: 'WEB DESIGNING',
      description: 'Something which makes PN INFOSYS different from other IT companies is that we train novice students and also make them work on Live projects.'
    },
    {
      title: 'WEB DEVELOPMENT',
      description: 'Something which makes PN INFOSYS different from other IT companies is that we train novice students and also make them work on Live projects.'
    },
    {
      title: 'APP DEVELOPMENT',
      description: 'Something which makes PN INFOSYS different from other IT companies is that we train novice students and also make them work on Live projects.'
    },
    {
      title: 'ANGULAR, PYTHON, DJANGO, LARAVEL',
      description: 'Something which makes PN INFOSYS different from other IT companies is that we train novice students and also make them work on Live projects.'
    },
  ];
  // Learning div
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filteredTech = technology.filter((tech) => {
    const matchesSearch = tech.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || tech.category === category;
    return matchesSearch && matchesCategory;
  });

  const Card = ({ image, title, description }) => (
    <div className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover rounded-xl mb-4 transform transition-transform duration-300 hover:scale-105"
      />
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition">
        Read More
      </button>
    </div>
  );

  return (
    <main className='w-full flex flex-col '>
      <WhatsAppButton />
      <HeroSlider />
      {/* main section */}
      {/* <section >
        <div className="bg-[url('https://res.cloudinary.com/dow1049t2/image/upload/v1729238995/PN_INFOSYS/banner_gkibgn.png')] bg-cover bg-center min-h-screen w-full flex items-center justify-center text-center">
          <div className="text-white space-y-2 max-w-5xl px-6 justify-center md:pt-20">
            <h4 className="text-xl sm:text-xl md:text-xl font-medium">
              What are you waiting for?
            </h4>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Our PN Infosys <br />
              We're ready to help you grow!
            </h1>
            <div className="flex justify-center pt-10">
              <img
                src="/Home image/home.png"
                alt="Home"
                className="w-48 sm:w-60 md:w-72 lg:w-96 animate-float animate-[bounce_5s_ease-in-out_infinite] mt-10"
              />
            </div>
          </div>
        </div>
      </section> */}
      {/* card */}
      {/* Why Choose PN INFOSYS Section */}
      <section className="bg-[#f4f8ff] py-20 px-4 sm:px-6 md:px-12">
        {/* Heading */}
        <div className="text-center sm:text-center md:text-left mb-10 sm:mb-14 md:mb-16 px-2 sm:px-4 max-w-[95%] sm:max-w-3xl md:max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-800 mb-3 sm:mb-4 leading-snug sm:leading-tight">
            Why Choose <span className="text-blue-600">PN INFOSYS?</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 font-medium">
            Empowering your business with innovation, expertise, and partnerships that last.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {cards.map((card, index) => (
            <div
              key={index}
              className="group relative overflow-hidden bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 p-6 sm:p-8 text-center"
            >
              {/* Background Glow Effect */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 opacity-0 group-hover:opacity-30 transition-opacity duration-500 z-0 rounded-3xl"></div>

              {/* Card Image */}
              <div className="relative z-10 mb-5 sm:mb-6">
                <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full p-1 group-hover:scale-110 transition-transform duration-500">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg"
                  />
                </div>
              </div>

              {/* Title */}
              <h3 className="relative z-10 text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors duration-300">
                {card.title}
              </h3>

              {/* Description */}
              <p className="relative z-10 text-gray-600 text-sm sm:text-base">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* learning */}
      <section>
        <div className='bg-[#009df2] w-full px-4 sm:px-6 md:px-8 py-10 text-white'>
          <div className='max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10'>

            {/* Text Section */}
            <div className='md:w-1/2 space-y-6'>
              <h1 className='text-2xl sm:text-4xl md:text-4xl text-center md:text-left font-bold leading-snug'>
                Learning environment,<br />
                Free Internship to novice students.
              </h1>

              <div className='space-y-6'>
                {services.map((service, index) => (
                  <div key={index} className='flex items-start gap-4 px-0 sm:px-0 md:px-6'>
                    <FaCheckCircle className='text-white text-2xl mt-1 shrink-0' />
                    <div>
                      <h2 className='text-lg sm:text-xl font-semibold mb-2'>{service.title}</h2>
                      <p className='text-sm sm:text-base text-white/90'>{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <img
              src="/Home image/learning img.png"
              alt="Learning"
              className='w-full pt-5 max-w-[200px] sm:max-w-[400px] md:max-w-[350px] animate-float animate-[bounce_8s_ease-in-out_infinite]'
            />
          </div>
        </div>
      </section>

      {/* technologies */}
      <section className="relative py-24 bg-white text-gray-800 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-[-120px] left-[-100px] w-[300px] h-[300px] bg-blue-400 rounded-full blur-3xl opacity-30 z-0"></div>
        <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-purple-400 rounded-full blur-3xl opacity-30 z-0"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Heading */}
          <div className="text-center mb-16">
            <h1 className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text drop-shadow-md">
              Technologies
            </h1>
            <p className="text-2xl sm:text-3xl mt-3 text-blue-600 font-semibold">
              We work on..
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-14">
            <input
              type="text"
              placeholder="Search technologies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-1/3 px-4 py-3 rounded-xl bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-500 text-gray-800 shadow-sm"
            />

            <div className="flex flex-wrap gap-3 justify-center">
              {['All', 'Web Designing', 'Web Development'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-6 py-2 rounded-full text-sm font-semibold border transition-all duration-300
                ${category === cat
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg border-transparent'
                      : 'border-gray-300 text-gray-700 hover:bg-blue-500 hover:text-white'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {filteredTech.length > 0 ? (
              filteredTech.map((tech) => (
                <div
                  key={tech._id}
                  className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-md hover:shadow-blue-300 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] group"
                >
                  <div className="w-24 h-24 mx-auto mb-5 relative">
                    <Image
                      src={tech.image.url}
                      alt={tech.title}
                      fill
                      className="object-contain rounded-xl transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 mb-2">{tech.title}</h2>
                  <p className="text-gray-600 text-sm">{tech.description}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400 col-span-full">No technologies found.</p>
            )}
          </div>
        </div>
      </section>

      {/* Our Portfolio */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-4xl font-bold text-gray-800">
              Our <span className="text-blue-600">Portfolio</span>
            </h2>
            <p className="text-gray-500 mt-2">Explore some of our recent projects</p>
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolio.map((item, index) => (
              <motion.a
                key={item._id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group border rounded-xl overflow-hidden shadow hover:shadow-lg bg-white transition-all duration-300 hover:border-blue-500"
              >
                {/* Image */}
                <div className="relative w-full h-56 overflow-hidden">
                  <Image
                    src={item.image.url}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col justify-between min-h-[180px]">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">{item.description}</p>
                  </div>
                  <div className="mt-4 flex items-center text-blue-600 font-medium gap-1 group-hover:gap-2 transition-all">
                    <span>View Project</span>
                    <FiArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Our Service */}
      <section>
        <div className='bg-[#009df2] w-full px-4 sm:px-4 md:px-16 py-10 text-white'>
          <div className='max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10'>

            {/* Text Section */}
            <div className='md:w-1/2 space-y-6'>
              <h1 className='text-4xl sm:text-3xl md:text-4xl text-center md:text-left font-bold'>
                Our Service
              </h1>
              <div className='space-y-6'>

                {/* Service Cards */}
                {[
                  {
                    title: 'INNOVATIVE Ideas',
                    desc: 'PN INFOSYS believes in developing true partnerships. We foster a collegial environment where individual perspectives are respected and honest dialogue is expected.',
                  },
                  {
                    title: 'CREATIVE Designing',
                    desc: 'PN INFOSYS brings robust skills and forward-looking perspectives to solve customer challenges. We use proven knowledge to make recommendations and provide expert guidance to our customers.',
                  },
                  {
                    title: "CLIENT'S Happiness",
                    desc: 'PN INFOSYS is driven to meet client needs with determination and grit. We embrace tough challenges and do not rest until the problem is solved, the right way.',
                  },
                  {
                    title: 'FULL Maintenance',
                    desc: 'PN INFOSYS provides a full range of maintenance and compliance services for Government and Commercial facilities both large and small.',
                  },
                  {
                    title: 'PRACTICAL Training',
                    desc: "We don't use paper and pencil at all in our training sessions. We only provide practical work during training class sessions.",
                  }
                ].map((service, index) => (
                  <div key={index} className='flex items-start gap-4 md:px-5 sm:px-1 px-0'>
                    <FaCheckCircle className='text-white text-2xl mt-1 shrink-0' />
                    <div>
                      <h2 className='text-lg sm:text-xl md:text-lg font-bold mb-2'>{service.title}</h2>
                      <p className='text-sm sm:text-base'>{service.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Image Section */}
            <div className='md:w-1/2 flex justify-center'>
              <img
                src="/home image/service.png"
                alt="service"
                className='w-full md:pt-30 max-w-[400px] sm:max-w-[400px] md:max-w-[600px] animate-float animate-[bounce_9s_ease-in-out_infinite]'
              />
            </div>
          </div>
        </div>
      </section>

      {/* event */}
      <section>
        <div className="py-10">
          <h1 className="text-2xl font-bold text-gray-600 text-center mb-1">News</h1>
          <h2 className="text-4xl text-center text-blue-700  mb-6">Events</h2>

          <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {event.map((card, index) => (
              <Card
                key={index}
                image={card.image.url}
                title={card.title}
                description={card.description}
              />
            ))}
          </div>
        </div>
      </section>

    </main>
  );
};

export default Page;
