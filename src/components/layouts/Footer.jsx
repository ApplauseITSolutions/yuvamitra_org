import logo from "../../assets/logos/yuva-Mitra-footer-logo.png";
import { FiFacebook, FiInstagram, FiYoutube } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Map } from "lucide-react";

const programs = [
  { name: "Water Resource Development & Management", path: "/programs/category/water" },
  { name: "Livelihood & Skill Development", path: "/programs/category/livelihood" },
  { name: "Health & Education", path: "/programs/category/health" },
  { name: "Institution Building And Sustainable Agriculture", path: "/programs/category/agriculture" },
];

const quickLinks = [
  { name: "Privacy Policy", path: "/privacy-policy" },
  { name: "Careers", path: "/careers" },
  { name: "Contacts", path: "/contact" },
];

const socialLinks = [
  { name: "Facebook", href: "https://www.facebook.com/AncoraThemes/", icon: FiFacebook },
  { name: "Instagram", href: "https://www.instagram.com/ancora_themes/", icon: FiInstagram },
  { name: "YouTube", href: "https://www.youtube.com/channel/UCdIjRh7-lPVHqTTKpaf8PLA", icon: FiYoutube },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#1f2f5f] text-white">

      {/* Top Wave */}
      <div className="absolute inset-x-0 top-0 text-white">
        <svg
          viewBox="0 0 1440 140"
          className="h-14 w-full md:h-16"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,64L48,53.3C96,43,192,21,288,32C384,43,480,85,576,101.3C672,117,768,107,864,90.7C960,75,1056,53,1152,53.3C1248,53,1344,75,1392,85.3L1440,96L1440,0L0,0Z"
          />
        </svg>
      </div>

      {/* MAIN CONTAINER */}
      <div className="relative mx-auto max-w-[1380px] px-6 lg:px-12 pt-24 pb-8 md:pb-12">

        {/* FLEX LAYOUT */}
        <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-8 py-2">

          {/* LEFT - LOGO & ADDRESS */}
          <div className="flex flex-col items-start text-left w-full md:w-auto md:max-w-sm">
            <img src={logo} alt="Yuva Mitra" className="h-16 w-auto" />
            <div className="mt-6 text-[15px] leading-relaxed text-white/85 font-inter">
              <div className="flex items-start gap-2 mb-1">
                <MapPin size={16} className="text-white flex-shrink-0 mt-[3px]" />
                <span className="font-semibold text-white">Our Address</span>
              </div>
              <p>Mitrangan Campus, Ghoti - Sinnar Highway,</p>
              <p>Harsule Shivar, Lonarwadi, Pincode - 422103</p>
              <p>Taluka-Sinnar, District - Nashik, Maharashtra, India.</p>
            </div>
          </div>

          {/* CENTER - PROGRAMS */}
          <div className="flex flex-col items-start text-left w-full md:w-auto">
            <h3 className="text-xl font-bold mb-6 font-poppins">Programs</h3>
            <div className="space-y-3 text-[15px] text-white/85 font-inter">
              {programs.map((program) => (
                <Link
                  key={program.name}
                  to={program.path}
                  className="block hover:text-[#9fd0ff] transition"
                >
                  {program.name}
                </Link>
              ))}
            </div>
          </div>

          {/* RIGHT - CONTACT */}
          <div className="flex flex-col items-start text-left w-full md:w-auto">
            <h3 className="text-xl font-bold mb-6 font-poppins">Contact Us</h3>
            <div className="space-y-4 text-[15px] font-medium text-white/90 font-inter">
              <a href="tel:+919527402400" className="flex items-center gap-3 hover:text-[#9fd0ff] transition-colors">
                <Phone size={18} className="text-white" />
                <span>+91 9527402400</span>
              </a>
              <a href="mailto:admin@yuvamitra.org" className="flex items-center gap-3 hover:text-[#9fd0ff] transition-colors">
                <Mail size={18} className="text-white" />
                <span>admin@yuvamitra.org</span>
              </a>
            </div>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map(({ name, href, icon: Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all hover:scale-110"
                  aria-label={name}
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="mt-6 border-t border-white/10 pt-4">
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-0 text-[14px] text-white/70 font-inter">

            {/* Copyright */}
            <div className="flex-grow text-center md:text-left">
              <p>Copyright &copy; 2026 Yuva Mitra. All rights reserved.</p>
            </div>

            {/* Quick Links + Sitemap */}
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="hover:text-white transition whitespace-nowrap"
                >
                  {link.name}
                </Link>
              ))}

              {/* Sitemap — opens XML in new tab */}
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-white transition whitespace-nowrap"
              >
                <Map size={13} />
                Sitemap
              </a>
            </div>

            <div className="hidden md:block md:w-14" />
          </div>
        </div>

      </div>
    </footer>
  );
}
