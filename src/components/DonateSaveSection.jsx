import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import mapImg from "../assets/Images/OurHistoryImg.png";

export default function DonateSaveSection() {
  return (
    <section className="py-10 md:py-16 bg-white overflow-hidden">
      <div className="max-w-[1380px] mx-auto px-6 lg:px-12">
        
        {/* CHANGE HERE: 
            flex-col-reverse: Image (bottom in HTML) moves to TOP on mobile.
            lg:flex-row: Text (Left) and Image (Right) on desktop.
        */}
        <div className="flex flex-col-reverse lg:flex-row lg:items-center gap-10 lg:gap-20">

          {/* Left Content */}
          <div className="flex-1 space-y-6 w-full flex flex-col justify-center">
            <div className="space-y-3 text-center lg:text-left">
              <h2 className="text-[32px]  text-secondary font-bold font-poppins leading-tight">
                Donate <span className="text-primary"> & Save</span>
              </h2>
              <p className="text-base md:text-lg text-black leading-relaxed font-medium font-inter">
                Your small donation can change someone's entire world.
              </p>
            </div>

            <div className="space-y-4 text-black text-[16px] md:text-base leading-relaxed text-justify font-inter">
              <p>
                When you make a donation under <span className="font-bold text-gray-800">Section 80G</span> to <span className="font-bold text-gray-800">Yuva Mitra</span>, you don't just support a cause—you transform lives.Your contribution helps a child gain access to education, a farmer secure water for sustainable farming, a girl receive safe menstrual health support, a woman build a livelihood, and a family access clean drinking water.
              </p>

              <p>
                Yuva Mitra is registered under <span className="font-bold text-gray-800">Section 12A(a)</span> of the Income Tax Act, 1961, making your donation eligible for tax benefits.
              </p>

              <ul className="space-y-3 list-disc pl-5 text-black text-left">
                <li>
                  <span className="font-bold">Make a secure online donation through our donation page</span>
                </li>
                <li>
                  <span className="font-bold">Receive your 80G tax-exemption certificate via email after donating</span>
                </li>
                <li>
                  <span className="font-bold">Use the certificate while filing your income tax return to claim your Section 80G deduction</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 flex justify-center lg:justify-start">
              <Link
                to="/donate"
                className="w-full sm:w-auto hover-bounce bg-primary hover:bg-red-700 text-white px-7 py-2.5 rounded-full font-bold shadow-lg shadow-primary/20 transition-all active:scale-95 font-poppins flex items-center justify-center"
              >
                Donate Now
              </Link>
            </div>
          </div>

          {/* Right Illustration (Now appears FIRST on mobile) */}
          <div className="flex-1 w-full">
            <div className="relative z-10 w-full aspect-video lg:aspect-square max-h-[500px] mx-auto">
              <img
                src={mapImg}
                alt="India Map Empowerment"
                className="w-full h-full object-cover rounded-2xl shadow-xl border-4 border-white transform transition-transform duration-500 hover:scale-[1.01]"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}