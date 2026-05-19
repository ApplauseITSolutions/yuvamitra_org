import { useEffect, useRef, useState } from "react";
import OurteamBanner from "../components/layouts/Banners/OurteamBanner.jsx";
import Img1 from "../assets/Images/Ourteam/1.webp";
import Img2 from "../assets/Images/Ourteam/2.webp";
import Img3 from "../assets/Images/Ourteam/3.webp";
import Img4 from "../assets/Images/Ourteam/4.webp";
import Img5 from "../assets/Images/Ourteam/5.webp";
import Img6 from "../assets/Images/Ourteam/6.webp";
import Img7 from "../assets/Images/Ourteam/7.webp";
import Img8 from "../assets/Images/Ourteam/8.webp";
import Img9 from "../assets/Images/Ourteam/9.webp";
import Img10 from "../assets/Images/Ourteam/10.png";
import Img11 from "../assets/Images/Ourteam/11.jpg";

const FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Outfit:wght@300;400;500;600&display=swap";

const team = [
  { name: "Sunil Pote", role: "Founder & Ex. Executive Director", img: Img1 },
  { name: "Manisha Pote", role: "Executive Director", img: Img2 },
  { name: "Nilesh Kulkarni", role: "Head – Resource & Mobilization", img: Img3 },
  { name: "Sanjay Shinde", role: "Manager – Accounts & Legal", img: Img4 },
  { name: "Atul Surwase", role: "Program Manager – Water Resource Development & Management", img: Img5 },
  { name: "Hari Daware", role: "Program Manager – Livelihood & Skill Development", img: Img6 },
  { name: "Chetan Waghulade", role: "Program Manager – Institution Building", img: Img7 },
  { name: "Yogesh Pagar", role: "Manager – HR and Admin", img: Img8 },
  { name: "Manisha Sapakale", role: "Manager – Resource & Mobilization", img: Img9 },
  { name: "Shivaji Rathod", role: "Manager – Resource & Mobilization", img: Img10 },
  { name: "Parag Kale", role: "Program Manager – RMC", img: Img11 },
];

/* ---------------- HOOK ---------------- */
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setVisible(true);
        obs.disconnect();
      }
    }, { threshold });

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, visible];
}

/* ---------------- CARD ---------------- */
function MemberCard({ member, index, visible }) {
  const [hovered, setHovered] = useState(false);
  const delay = (index % 4) * 0.1;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ transitionDelay: `${delay}s` }}
      className={`relative overflow-hidden rounded-md bg-[#f4f3ef]
      transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)]
      ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={member.img}
          alt={member.name}
          className={`w-full h-full object-cover object-top transition duration-700
          ${hovered ? "scale-105 brightness-90" : "brightness-100"}`}
        />
      </div>

      {/* Text */}
      <div className="px-4 py-4 bg-[#f4f3ef]">
        <h3 className="text-[#0d1b2a] text-[16px] font-bold leading-snug">
          {member.name}
        </h3>
        <div className="w-6 h-[1px] bg-[#0d1b2a]/30 my-2" />
        <p className="text-slate-500 text-[16px] leading-relaxed">
          {member.role}
        </p>
      </div>
    </div>
  );
}

/* ---------------- MAIN ---------------- */
export default function Ourteam() {
  const [ref, visible] = useInView(0.08);

  useEffect(() => {
    if (!document.getElementById("ot-gfonts")) {
      const l = document.createElement("link");
      l.id = "ot-gfonts";
      l.rel = "stylesheet";
      l.href = FONTS_URL;
      document.head.appendChild(l);
    }
  }, []);

  return (
    <div className="bg-[#f4f3ef] w-full min-h-screen">
      <OurteamBanner />

      <div ref={ref} className="max-w-[1380px] mx-auto px-6 lg:px-12 mt-12 pb-[80px]">
        <div className="text-[16px] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {team.map((m, i) => (
            <MemberCard key={m.name} member={m} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </div>
  );
}
