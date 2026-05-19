import bannerImage from "../../../assets/Images/ngo-banner-bg.webp";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function PrivacyPolicyBanner() {
  return (
    <section className="relative h-[220px] md:h-[320px] flex items-end overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={bannerImage}
          alt="Privacy Policy – Yuva Mitra"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f1f5c]/92 to-[#2E3192]/75" />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-[1380px] mx-auto px-6 lg:px-12 pb-10">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight">
          Privacy Policy
        </h1>
        <nav className="flex items-center gap-2 text-sm text-blue-200 font-medium">
          <Link to="/" className="hover:text-white transition-colors duration-200">
            Home
          </Link>
          <ChevronRight size={14} className="opacity-60" />
          <span className="text-white">Privacy Policy</span>
        </nav>
      </div>
    </section>
  );
}
