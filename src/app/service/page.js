'use client';
import Image from 'next/image';

const backgroundImage = '/background-img.png';
const backgroundImage2 = '/page-heading-bg_i9miyf.png';

const serviceCards = [
  {
    img: '/about image/service1.jpg',
    title: 'Innovative Ideas',
  },
  {
    img: '/about image/service2.jpg',
    title: 'Creative Designing',
  },
  {
    img: '/about image/service3.jpg',
    title: "Client's Happiness",
  },
];

const servicePoints = [
  'PN INFOSYS Company provides a full range of maintenance and compliance services for Government and Commercial facilities both large and small.',
  'PN INFOSYS believes in developing true partnerships. We foster a collegial environment where individual perspectives are respected and honest dialogue is expected.',
  'PN INFOSYS brings robust skills and forward-looking perspectives to solve customer challenges. We use proven knowledge to make recommendations and provide expert guidance to our customers.',
  'PN INFOSYS is driven to meet client needs with determination and grit. We embrace tough challenges and do not rest until the problem is solved, the right way.',
];

const Service = () => {
  return (
    <main>
      {/* Hero Section */}
      <section>
        <div className="relative">
          <div
            className="bg-cover bg-center h-[80vh] flex flex-col justify-center items-center text-white text-center"
            style={{
              backgroundImage: `url(${backgroundImage.src})`,
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
            <Image
              src={backgroundImage2}
              alt="Foreground"
              fill
              className="object-cover opacity-30"
            />
            <div className="relative z-10 space-y-4 px-4">
              <h1 className="text-4xl md:text-5xl font-bold">Our Services</h1>
              <p className="text-sm md:text-base text-gray-300">
                <a className="text-white font-medium" href="/">Home</a> / Our Service
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 pb-20">
          <h2 className="text-lg font-normal text-center mb-10">
            "PN INFOSYS is a leading global business consulting and IT service company. We provide maintenance and compliance services for Government and Commercial facilities both large and small. Whether you need to run your business more efficiently or accelerate revenue growth, PN INFOSYS can get you there."
          </h2>

          <div className="grid gap-8 md:grid-cols-3 sm:grid-cols-2">
            {serviceCards.map((card, idx) => (
              <div key={idx} className="rounded-xl overflow-hidden shadow-lg bg-white transition duration-500 text-center p-6">
                <div className="flex justify-center items-center overflow-hidden">
                  <div className="transition-transform duration-500 hover:scale-110 w-1/2">
                    <Image
                      src={card.img}
                      alt={`Service ${idx + 1}`}
                      width={300}
                      height={200}
                      className="w-full h-42 object-contain"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">{card.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PN Services Section */}
      <section>
        <div className="bg-[#009df2] w-full px-5 py-10 text-white">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
            {/* Text Section */}
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold text-center md:text-left">PN Services</h1>
              <h2 className="text-lg md:text-xl font-bold text-center md:text-left md:px-4">
                PN INFOSYS provides the best service possible to its customers because for us, our client’s happiness is important.
              </h2>

              <div className="space-y-6">
                {servicePoints.map((desc, idx) => (
                  <div key={idx} className="flex items-start gap-4 px-5 md:px-10">
                    <p className="text-sm sm:text-base">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Section */}
            <div className="md:w-1/2 flex justify-center">
              <Image
                src="/about image/service4.png"
                alt="Learning"
                width={500}
                height={400}
                className="w-full max-w-[500px] animate-[bounce_6s_ease-in-out_infinite]"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Service;
