import React from "react";
import farmer_img from "../assets/Images/farmer-frame.jpeg";
import { Link } from "react-router-dom";

export default function AboutSection({ showButton = true }) {
  return (
    <section className="py-10 bg-[#E8F1F8]/50 overflow-hidden">
      <div className="max-w-[1380px] mx-auto px-6 lg:px-12">
        
        <div className="flex flex-col lg:flex-row lg:items-stretch gap-8 lg:gap-12">

          {/* Image Side - Left */}
          <div className="relative w-full lg:w-[45%] flex items-stretch justify-center">
            
            <div className="relative z-10 w-full rounded-[2rem] overflow-hidden shadow-2xl group min-h-[280px] sm:min-h-[360px] lg:min-h-0">
              
              {/* IMAGE - covers full column height */}
              <img
                src={farmer_img}
                alt="Yuva Mitra Impact"
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                style={{ minHeight: "280px" }}
              />

              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition duration-500"></div>
            </div>

            {/* Decorative Blur */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 md:w-32 md:h-32 bg-[#3270a2]/10 rounded-full blur-3xl -z-0" />
          </div>

          {/* Text Side - Right */}
          <div className="flex-1 space-y-4 flex flex-col justify-center">

            {/* Heading */}
            <div className="space-y-3">
              <div className="inline-block">
                <h2 className="text-[32px] text-secondary font-bold font-poppins">
                  About <span className="text-primary font-bold">Yuva Mitra</span>
                </h2>
              </div>

              {/* Content */}
              <p className="text-black text-[16px] leading-relaxed text-left md:text-justify [text-align-last:left] hyphens-auto font-inter">
                We work with rural and tribal communities to create people-led, sustainable change. Since 1995, Yuva Mitra has been a secular, non-profit empowering communities through education, water conservation, sustainable agriculture, health, and livelihood development.
              </p>

              <p className="text-black text-[16px] leading-relaxed text-left md:text-justify [text-align-last:left] hyphens-auto font-inter">
                Yuva Mitra is a dynamic non-profit organization with a strong commitment to fostering holistic rural development. Established in 1995, we are registered under various acts, including the Bombay Public Charitable Trust Act, Societies Registration Act, and Foreign Contribution (Regulation) Act. Our journey over the past 28 years has been marked by unwavering dedication to uplifting marginalized communities, emphasizing their active participation in the development process.
              </p>

              <p className="text-black text-[16px] leading-relaxed text-left md:text-justify [text-align-last:left] hyphens-auto font-inter">
                Rooted in participation and dignity, our work has impacted over 3.90 lakh families, helping build a resilient rural India. Our mission spans Water Resource Management, Livelihood Development, Health & Education, and Agricultural Growth across Maharashtra and beyond.
              </p>
            </div>

            {/* Button */}
            {showButton && (
              <Link to="/about/our-history">
                <div className="pt-1 flex justify-start">
                  <button className="bg-primary hover:bg-red-700 hover-bounce text-white px-7 py-2.5 rounded-full font-bold shadow-lg shadow-primary/20 transition-all active:scale-95 font-poppins">
                    Read More
                  </button>
                </div>
              </Link>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}