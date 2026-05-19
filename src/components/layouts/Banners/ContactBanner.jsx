import bannerImage from "../../../assets/Images/ngo-banner-bg.webp";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function ContactBanner() {
  return (
    <section className="relative h-[220px] md:h-[320px] flex items-end overflow-hidden">

      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={bannerImage}
          alt="Contact US – Yuva Mitra"
          className="w-full h-full object-cover"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f1f5c]/92 to-[#2E3192]/75" />
        {/* Subtle bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Content — aligned with navbar max-w */}
      <div className="relative z-10 w-full max-w-[1380px] mx-auto px-6 lg:px-12 pb-10">

        {/* Eyebrow label */}
        {/* <p className="uppercase tracking-[0.3em] text-xs font-bold mb-2 text-blue-300">
          Yuva Mitra
        </p> */}

        {/* Page Title */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight">
         Contact Us
        </h1>

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-blue-200 font-medium">
          <Link to="/" className="hover:text-white transition-colors duration-200">
            Home
          </Link>
          <ChevronRight size={14} className="opacity-60" />
          <span className="text-white">Contact Us</span>
        </nav>
      </div>
    </section>
  );
}