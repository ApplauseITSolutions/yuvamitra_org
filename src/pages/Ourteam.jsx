import { useEffect, useRef, useState } from "react";
import OurteamBanner from "../components/layouts/Banners/OurteamBanner.jsx";
import Img1 from "../assets/yuvamitra-team-img/member1.png";
import Img2 from "../assets/yuvamitra-team-img/member2.png";
import Img3 from "../assets/yuvamitra-team-img/member3.png";
import Img4 from "../assets/yuvamitra-team-img/member4.png";
import Img5 from "../assets/yuvamitra-team-img/member5.png";
import Img6 from "../assets/yuvamitra-team-img/member6.png";
import Img7 from "../assets/yuvamitra-team-img/member7.png";
import Img8 from "../assets/yuvamitra-team-img/member8.png";
import Img9 from "../assets/yuvamitra-team-img/member9.png";
import Img10 from "../assets/yuvamitra-team-img/member10.png";
import Img11 from "../assets/yuvamitra-team-img/member11.png";
import Img12 from "../assets/yuvamitra-team-img/member12.png";
import Img13 from "../assets/yuvamitra-team-img/member13.png";
import Img14 from "../assets/yuvamitra-team-img/Akshay-Photoroom.png";

const FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Outfit:wght@300;400;500;600&display=swap";

const teamSections = [
  {
    title: "Leadership Team",
    cols: "lg:grid-cols-3 max-w-5xl mx-auto",
    members: [
      { name: "Mr. Sunil Pote", role: "Founder & Ex. Executive Director", img: Img1 },
      { name: "Manisha Pote", role: "Executive Director", img: Img2 },
      { name: "Mr. Nilesh Kulkarni", role: "Director- Resource Mobilisation and Operations", img: Img3 },
    ]
  },
  {
    title: "Deputy Program Managers",
    cols: "lg:grid-cols-3 max-w-5xl mx-auto",
    members: [
      { name: "Mr. Atul Surwase", role: "Water Resource Development", img: Img4 },
      { name: "Mr. Hari Daware", role: "Livelihood & Skill Development", img: Img5 },
      { name: "Mr. Chetan Waghulade", role: "Institutional Building & Sustainable Agriculture", img: Img6 },
      { name: "Mr. Sanjay Shinde", role: "Accounts & Finance", img: Img10 },
      { name: "Mr. Akshay Chandorkar", role: "Monitoring and Evaluation", img: Img14 },
    ]
  },
  {
    title: "HR & Administration",
    cols: "lg:grid-cols-2 max-w-3xl mx-auto",
    members: [
      { name: "Vinita Joshi", role: "Sr. Manager HR & Admin", img: Img8, scale: 1.2, origin: "center 18%" },
      { name: "Mr. Yogesh Pagar", role: "Manager – HR and Admin", img: Img9 },
    ]
  },
  {
    title: "Assistant General Managers",
    cols: "lg:grid-cols-4",
    members: [
      { name: "Mr. Shivaji Rathod", role: "Resource Mobilization & Operations", img: Img12 },
      { name: "Ms. Manisha Sapakale", role: "Resource Mobilization & Operations", img: Img11 },
      { name: "Mr. Parag Kale", role: "Special Projects", img: Img7 },
      { name: "Mr. Ankush Suryawanshi", role: "Special Projects", img: Img13 },
    ]
  }
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
      className={`relative bg-white rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] 
      hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2
      transition-all duration-500 ease-out py-6 px-4 flex flex-col items-center text-center
      ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
    >
      {/* Circular Image */}
      <div 
        style={{ width: "204px", height: "204px", minWidth: "204px", minHeight: "204px" }}
        className="relative rounded-full overflow-hidden border-2 border-secondary/20 mb-4 shadow-sm"
      >
        <img
          src={member.img}
          alt={member.name}
          style={{
            transform: hovered 
              ? `scale(${(member.scale || 1) * 1.1})` 
              : `scale(${member.scale || 1})`,
            transformOrigin: member.origin || "center top"
          }}
          className="w-full h-full object-cover object-top transition-transform duration-700"
        />
      </div>

      {/* Text */}
      <div className="flex flex-col items-center justify-center flex-grow font-inter w-full">
        <h3 className="text-primary text-xl font-bold mb-2 tracking-tight font-poppins">
          {member.name}
        </h3>
        <span className="bg-secondary/10 border border-secondary/20 text-secondary px-4 py-1.5 rounded-full text-sm font-medium">
          {member.role}
        </span>
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
    <div className="bg-[#f4f3ef] w-full min-h-screen font-inter">
      <OurteamBanner />

      <div ref={ref} className="max-w-[1380px] mx-auto px-6 lg:px-12 mt-8 pb-24">
        {/* Title & Subtitle */}
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-5 font-poppins">
            Meet <span className="text-primary">Our Team</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            A dedicated group of individuals working together to create a lasting impact and empower communities.
          </p>
        </div>

        <div className="space-y-6">
          {teamSections.map((section, sIndex) => (
            <div key={section.title} className="relative">
              {/* Subtle Gradient Background behind the section */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/[0.03] to-transparent -mx-6 lg:-mx-12 rounded-[40px] -z-10 top-0 bottom-0"></div>
              
              <div className="py-6 px-4">
                <h3 className="text-3xl font-bold text-center text-secondary mb-6 font-poppins">
                  {section.title}
                </h3>
                
                <div className={`grid grid-cols-1 sm:grid-cols-2 ${section.cols} gap-8`}>
                  {section.members.map((m, i) => (
                    <MemberCard key={m.name} member={m} index={i} visible={visible} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
