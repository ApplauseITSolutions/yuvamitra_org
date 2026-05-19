import React, { useRef } from "react";
import agricultureImg from "../assets/Images/Our-Work-imgs/1.webp";
import livelihoodImg from "../assets/Images/Our-Work-imgs/2.webp";
import healthImg from "../assets/Images/Our-Work-imgs/3.webp";
import waterImg from "../assets/Images/Our-Work-imgs/4.webp";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

const workItems = [
  {
    title: "Agriculture",
    description: "Institution Building & Sustainable Agriculture",
    image: agricultureImg,
    path: "/programs/category/agriculture",
  },
  {
    title: "Livelihood and Skill Development",
    description: "Livelihood and Skill Development",
    image: livelihoodImg,
    path: "/programs/category/livelihood",
  },
  {
    title: "Community Leadership & Institution Building",
    description: "Health and Education",
    image: healthImg,
    path: "/programs/category/health",
  },
  {
    title: "Water Resources & Sanitation",
    description: "Water Resource and Development & Management",
    image: waterImg,
    path: "/programs/category/water",
  },
];

export default function OurWorkSection() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8; // Better scrolling distance
      const scrollTo =
        direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;

      scrollRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bg-[#fff5f5] py-8 md:py-16 overflow-hidden relative">
      <div className="max-w-[1380px] mx-auto px-4 md:px-6 lg:px-12">
        {/* Heading */}
        <div className="mb-8 md:mb-12 text-center">
          <h2 className="text-3xl md:text-4xl text-secondary font-bold font-poppins mb-2">
            Our <span className="text-primary">Work</span>
          </h2>
          <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-primary to-accent" />
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-4 md:gap-6 overflow-x-auto pb-8 hide-scrollbar snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {workItems.map((item, index) => (
              <div
                key={index}
                className="flex-none w-[280px] sm:w-[320px] md:w-[380px] h-[380px] md:h-[480px] snap-start"
              >
                <Link
                  to={item.path}
                  className="group/card relative block h-full w-full overflow-hidden rounded-2xl shadow-xl transition-all duration-500 hover:-translate-y-1"
                >
                  {/* Background Image */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                  {/* Content Area - Fixed overlapping using Flexbox */}
                  <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-7">
                    <div className="space-y-2">
                      <h3 className="text-xl md:text-2xl font-bold text-white font-display leading-tight line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-white/80 font-inter line-clamp-2 md:line-clamp-3">
                        {item.description}
                      </p>
                    </div>

                    {/* Button Container - Relative to text, no longer absolute-bottom */}
                    <div className="mt-4 flex justify-start">
                      <div className="inline-flex items-center px-4 py-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-white text-xs font-bold transition-all duration-300 group-hover/card:bg-white group-hover/card:text-black">
                        View More
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-center md:justify-start gap-4 mt-4">
            <button
              onClick={() => scroll("left")}
              className="p-3 rounded-full bg-white shadow-md text-primary hover:bg-primary hover:text-white transition-all active:scale-95"
              aria-label="Previous"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-3 rounded-full bg-white shadow-md text-primary hover:bg-primary hover:text-white transition-all active:scale-95"
              aria-label="Next"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}