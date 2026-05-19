import React, { useEffect, useRef, useState } from "react";
import officeImg from "../assets/Images/OurHistoryImg.png";
import OurHistoryBanner from "../components/layouts/Banners/OurHistoryBanner.jsx";
import Lenis from "lenis";
import {
  Eye,
  HeartHandshake,
  Target,
  Leaf,
  Users,
  MapPin,
  Droplets,
  Sprout,
  HeartPulse,
  Landmark,
  Waves,
  Stethoscope,
  TrendingUp,
  GraduationCap,
  Building2,
  CloudRain,
  Store,
  Globe2
} from "lucide-react";
import ngoBanner from "../assets/Images/Impact-bg.png";

/* â”€â”€â”€ useInView â”€â”€â”€ */
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* â”€â”€â”€ Smooth scroll â”€â”€â”€ */
function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);
}

/* â”€â”€â”€ Data â”€â”€â”€ */
const milestones = [
  { year: "1995", label: "Establishment of Yuva Mitra", desc: "Founded with initiatives like Balmitra and Nisarg Mitra, aimed at improving rural children's skills and protecting biodiversity.", color: "from-[#2a6aad] to-sky-400", bg: "bg-sky-50", border: "border-sky-200", yearBg: "bg-gradient-to-r from-[#2a6aad] to-sky-400", icon: <Leaf size={28} className="text-sky-500" /> },
  { year: "2004", label: "For Farmers, For Profit", desc: "Revived defunct DBI systems and promoted participatory irrigation management through the formation of Water User Associations.", color: "from-emerald-600 to-emerald-400", bg: "bg-emerald-50", border: "border-emerald-200", yearBg: "bg-gradient-to-r from-emerald-600 to-emerald-400", icon: <Droplets size={28} className="text-emerald-500" /> },
  { year: "2007", label: "Stepping into Social Research", desc: "Expanded focus to create livelihood opportunities for landless families through Goatery-Based Livelihood for Women.", color: "from-amber-500 to-amber-300", bg: "bg-amber-50", border: "border-amber-200", yearBg: "bg-gradient-to-r from-amber-500 to-amber-300", icon: <Users size={28} className="text-amber-500" /> },
  { year: "2008", label: "Improving Livelihoods", desc: "Broadened scope through the Jalsamruddhi program and water development activities across Maharashtra.", color: "from-[#2a6aad] to-sky-400", bg: "bg-sky-50", border: "border-sky-200", yearBg: "bg-gradient-to-r from-[#2a6aad] to-sky-400", icon: <Waves size={28} className="text-sky-500" /> },
  { year: "2011", label: "Establishment of Yuva Mitra (Phase II)", desc: "Strong presence in Health & Education with initiatives like Arogya Mitra, menstrual hygiene management, WASH, and the Barakhadi express program.", color: "from-rose-600 to-rose-400", bg: "bg-rose-50", border: "border-rose-200", yearBg: "bg-gradient-to-r from-rose-600 to-rose-400", icon: <HeartPulse size={28} className="text-rose-500" /> },
  { year: "2013", label: "Improving Adolescent Lives", desc: "Launched focused programs for adolescent health, education, and social development targeting rural youth.", color: "from-violet-600 to-violet-400", bg: "bg-violet-50", border: "border-violet-200", yearBg: "bg-gradient-to-r from-violet-600 to-violet-400", icon: <GraduationCap size={28} className="text-violet-500" /> },
  { year: "2015", label: "Livelihood from Livestock", desc: "Scaled the Goatery-Based Livelihood model for women, creating sustainable income for landless families.", color: "from-emerald-600 to-emerald-400", bg: "bg-emerald-50", border: "border-emerald-200", yearBg: "bg-gradient-to-r from-emerald-600 to-emerald-400", icon: <Sprout size={28} className="text-emerald-500" /> },
  { year: "2016", label: "Institution Building Milestone", desc: "Built robust institutions including Water User Associations (WUAs), FPC/FPOs, Farmers' clubs, and Joint Liability groups.", color: "from-amber-500 to-amber-300", bg: "bg-amber-50", border: "border-amber-200", yearBg: "bg-gradient-to-r from-amber-500 to-amber-300", icon: <Building2 size={28} className="text-amber-500" /> },
  { year: "2017", label: "Strengthening Drought Resilience", desc: "Established Krushak Mitra FPC and strengthened drought resilience programs across vulnerable districts in Maharashtra.", color: "from-[#2a6aad] to-sky-400", bg: "bg-sky-50", border: "border-sky-200", yearBg: "bg-gradient-to-r from-[#2a6aad] to-sky-400", icon: <CloudRain size={28} className="text-sky-500" /> },
  { year: "2018", label: "Market Linkages", desc: "Created direct market linkages for farmers and producer groups, improving income and reducing dependence on middlemen.", color: "from-rose-600 to-rose-400", bg: "bg-rose-50", border: "border-rose-200", yearBg: "bg-gradient-to-r from-rose-600 to-rose-400", icon: <Store size={28} className="text-rose-500" /> },
  { year: "2020", label: "Expansion into New Territories", desc: "Special focus on Nandurbar District with the Lakhpati Kisan & Tribal Development Fund projects in collaboration with Shabari Mahamandal and NABARD.", color: "from-violet-600 to-violet-400", bg: "bg-violet-50", border: "border-violet-200", yearBg: "bg-gradient-to-r from-violet-600 to-violet-400", icon: <MapPin size={28} className="text-violet-500" /> },
  { year: "2023", label: "Nurturing Ecosystems", desc: "Nurturing a sustainable ecosystem for tribal communities across 12 states through knowledge partnerships and technical support.", color: "from-emerald-600 to-emerald-400", bg: "bg-emerald-50", border: "border-emerald-200", yearBg: "bg-gradient-to-r from-emerald-600 to-emerald-400", icon: <Globe2 size={28} className="text-emerald-500" /> },
  { year: "Beyond", label: "Way Forward", desc: "Committed to empowering 1 million unique households with a minimum income of Rs. 1 Lakh per annum over the next 10 years.", color: "from-amber-500 to-amber-300", bg: "bg-amber-50", border: "border-amber-200", yearBg: "bg-gradient-to-r from-amber-500 to-amber-300", icon: <TrendingUp size={28} className="text-amber-500" /> },
];


// function VMCard({ icon, title, text, accentClass }) {
//   return (
//     <div className="relative bg-white rounded-2xl p-8 border border-slate-100 shadow-sm overflow-hidden hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
//       <div className={`absolute top-0 left-0 right-0 h-1 ${accentClass}`} />
//       <div className="mb-6">
//   <div className="w-16 h-16 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-slate-100 text-3xl md:text-4xl shadow-sm">
//     {icon}
//   </div>
// </div>
//       <h3 className="font-serif text-xl font-bold text-[#0f2847] mb-3">{title}</h3>
//       <p className="text-sm leading-relaxed text-slate-500">{text}</p>
//     </div>
//   );
// }

function VMCard({ icon, title, text, accentClass, iconBg }) {
  return (
    <div className="relative bg-white rounded-2xl p-5 sm:p-6 md:p-8 border border-slate-100 shadow-sm overflow-hidden hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
      <div className={`absolute top-0 left-0 right-0 h-1 ${accentClass}`} />
      <div className="mb-4 md:mb-6">
        <div className={`w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-xl ${iconBg} text-white shadow-md`}>
          {icon}
        </div>
      </div>
      <h3 className="font-poppins text-lg md:text-xl font-bold text-[#0f2847] mb-2 md:mb-3">{title}</h3>
      <p className="text-sm md:text-base font-inter leading-relaxed text-black sm:text-justify sm:hyphens-auto">{text}</p>
    </div>
  );
}

const impactAreas = [
  { icon: <Droplets size={22} className="text-white" />, iconBg: "bg-sky-600", title: "Water Resource Development & Management", desc: "Our initiatives have led to the revival of defunct DBI systems and the establishment of Water User Associations, fostering participatory irrigation management.", bg: "bg-sky-50 border-sky-200" },
  { icon: <Sprout size={22} className="text-white" />, iconBg: "bg-emerald-600", title: "Livelihood & Lifeskill Development", desc: "We create sustainable livelihood opportunities, particularly for landless families, through innovative projects like Goatery-Based Livelihood for Women and the Jalsamruddhi program.", bg: "bg-emerald-50 border-emerald-200" },
  { icon: <HeartPulse size={22} className="text-white" />, iconBg: "bg-rose-600", title: "Health & Education", desc: "We implement impactful programs such as Arogya Mitra for malnutrition eradication, menstrual hygiene management, WASH, and the Barakhadi express program for children's education.", bg: "bg-rose-50 border-rose-200" },
  { icon: <Landmark size={22} className="text-white" />, iconBg: "bg-amber-600", title: "Institution Building & Agricultural Development", desc: "Our commitment extends to building robust institutions including Water User Associations (WUAs), Farmer Producer Companies (FPC/FPOs), Farmers' clubs, and Joint Liability groups.", bg: "bg-amber-50 border-amber-200" },
];

export default function OurHistory() {
  useLenis();
  const [whoRef, whoInView] = useInView(0.1);
  const [timelineRef, tlInView] = useInView(0.05);
  const [impactRef, impactInView] = useInView(0.1);
  const [initRef, initInView] = useInView(0.1);
  const [roleRef, roleInView] = useInView(0.1);

  return (
    <>
      {/* <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      /> */}

      <main className="bg-white text-slate-700 font-Poppins" >
        <OurHistoryBanner />

       {/* Who We Are section */}
<section className="pt-10 pb-12 sm:pt-12 sm:pb-14 md:pt-14 md:pb-16 bg-gradient-to-b from-[#eef6fc] to-white">
  <div
    ref={whoRef}
    className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center"
  >
    {/* Image Container */}
    <div
      className="relative group"
      style={{
        opacity: whoInView ? 1 : 0,
        transform: whoInView ? "translateX(0)" : "translateX(-40px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      <div className="absolute -inset-2 rounded-3xl bg-sky-400/8 blur-md group-hover:bg-sky-400/12 transition duration-500" />

      <div className="relative rounded-2xl overflow-hidden border-2 border-white shadow">
        <img
          src={officeImg}
          alt="Yuva Mitra Office Building"
          className="w-full h-[260px] sm:h-[340px] md:h-[420px] lg:h-[480px] object-cover transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:rotate-1"
        />
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition duration-500" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0f2847]/85 to-transparent px-6 pt-12 pb-5">
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-sky-200">
            Yuva Mitra Headquarters · Maharashtra
          </p>
        </div>
      </div>

      <div className="absolute -bottom-5 -right-5 bg-[#0f2847] text-white rounded-2xl px-5 py-3 shadow-xl border-2 border-sky-400/30 transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-105">
        <p className="text-2xl font-bold font-serif text-sky-300">1995</p>
        <p className="text-[0.65rem] uppercase tracking-widest text-white/60">Founded</p>
      </div>
    </div>

    {/* Text Content */}
    <div
      className="w-full" // Removed max-w-xl to prevent awkward horizontal gaps
      style={{
        opacity: whoInView ? 1 : 0,
        transform: whoInView ? "translateX(0)" : "translateX(40px)",
        transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s",
      }}
    >
      <h2 className="font-poppins text-secondary font-bold text-2xl sm:text-[32px] md:text-[32px] leading-tight">
        A Dynamic Force for <span className="text-primary"> Rural Change</span>
      </h2>
      
      {/* 2. Removed mx-auto to keep the line aligned with the text left-edge */}
      <div className="mt-3 mx-auto w-24 h-1 rounded-full bg-gradient-to-r from-primary to-accent" />

      <div className="mt-6 sm:mt-8 space-y-4 text-sm text-16px sm:text-[1rem] leading-[1.8] text-black sm:text-justify sm:hyphens-auto [text-align-last:left]">
        <p>
          Yuva Mitra is a dynamic non-profit organization with a strong commitment to
          fostering holistic rural development. Established in 1995, we are registered
          under various acts including the Bombay Public Charitable Trust Act, Societies
          Registration Act, and Foreign Contribution (Regulation) Act.
        </p>
        <p>
          Over 28 years, our journey has been defined by unwavering dedication to
          uplifting marginalized communities and encouraging their active participation
          in the development process.
        </p>
      </div>

      <div className="mt-6 sm:mt-8 flex flex-wrap gap-2 sm:gap-3">
        {["Bombay Public Charitable Trust Act", "Societies Registration Act", "FCRA Registered"].map((tag) => (
          <span key={tag} className="px-4 py-2 rounded-full text-[11px] font-bold font-inter bg-white text-secondary border border-sky-100 shadow-sm">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
</section>

        <section className="py-3 sm:py-8 md:py-8 bg-[#f7fbff]">
          <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-12">
            {/* Header */}
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <h2 className="mt-3 text-2xl sm:text-[28px] md:text-[32px] font-bold text-secondary font-poppins">
                Vision, Mission & <span className="text-primary">Work Area</span>
              </h2>
              <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-primary to-accent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              <VMCard
                icon={<Eye size={24} />}
                title="Our Vision"
                accentClass="bg-gradient-to-r from-[#2a6aad] to-sky-400"
                iconBg="bg-[#2a6aad]"
                text="Yuva Mitra envisions a developmental process for the alienated sections of society, where people are at the core of its decision making and action, beyond the model of welfare schemes."
              />
              <VMCard
                icon={<Target size={24} />}
                title="Our Mission"
                accentClass="bg-gradient-to-r from-emerald-600 to-emerald-400"
                iconBg="bg-emerald-600"
                text="To ensure socio-economic development of people living in rural areas especially from the alienated section of society by using Land-Water Development and Management, Agri, and Allied livelihood activities involving applied education through community-based institutions keeping people at the core of decision making and action."
              />
              <VMCard
                icon={<MapPin size={24} />}
                title="Our Work Area"
                accentClass="bg-gradient-to-r from-amber-500 to-amber-300"
                iconBg="bg-amber-500"
                text="To actualize our vision we work in the areas of Maharashtra, Punjab and Himachal Pradesh through various development programs. We also work in 12 states of our country in coordination with other social development organizations."
              />
            </div>
          </div>
        </section>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            TIMELINE â€” 28 YEARS OF MILESTONES
            Redesigned: 2-col grid, large cards,
            readable text, compact vertical spacing
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <section ref={timelineRef} className="py-3 sm:py-8 md:py-8 bg-white">
          <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-12 font-inter text-black">

            <div className="text-center mb-10 sm:mb-12 md:mb-14">
              <h2 className="mt-3 text-2xl sm:text-[28px] md:text-[32px] font-bold text-secondary font-poppins">
                28 Years Of <span className="text-primary">Milestones</span>
              </h2>
              <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-primary to-accent" />
            </div>

            {/* Timeline (center line + alternating content) */}
            <div className="relative">
              {/* Center line */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px bg-slate-300" />

              {/* Top marker removed to avoid overlap with first milestone dot */}

              <div className="space-y-8 md:space-y-10 pt-1">
                {milestones.map((m, i) => {
                  const isLeft = i % 2 === 0;
                  const animStyle = {
                    opacity: tlInView ? 1 : 0,
                    transform: tlInView ? "translateY(0)" : "translateY(18px)",
                    transition: `opacity 0.5s ease ${i * 60}ms, transform 0.5s ease ${i * 60}ms`,
                  };

                  return (
                    <div
                      key={`${m.year}-${i}`}
                      className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] md:gap-x-12"
                    >
                      {/* Mobile: stacked timeline */}
                      <div className="md:hidden relative pl-8" style={animStyle}>
                        <div className="absolute left-0 top-1 bottom-1 w-px bg-slate-300" />
                        <div className="absolute left-0 top-2 w-3 h-3 -translate-x-1/2 rounded-full bg-primary ring-2 ring-primary/15" />
                        <div className="flex items-center gap-2">
                          <span className="text-primary font-extrabold tracking-wide text-sm">{m.year}</span>
                          <div className="h-px flex-1 bg-slate-300" />
                          <div className="p-2 bg-white border-2 border-slate-100 rounded-full shadow-md z-10 relative flex-shrink-0">
                            {m.icon}
                          </div>
                          <div className="h-px flex-1 bg-slate-300" />
                        </div>
                        <div className="mt-3 pb-2">
                          <p className="text-sm leading-snug font-semibold text-black">
                            {m.label}
                          </p>
                          <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                            {m.desc}
                          </p>
                        </div>
                      </div>

                      {/* Desktop left side */}
                      <div className="hidden md:block">
                        {isLeft ? (
                          <div style={animStyle}>
                            <div className="flex items-center">
                              <span className="text-primary font-extrabold tracking-wide">{m.year}</span>
                              <div className="mx-4 h-px flex-1 bg-slate-300" />
                              <div className="p-3 bg-white border-2 border-slate-100 rounded-full shadow-md hover:scale-125 hover:-translate-y-1 hover:rotate-6 hover:shadow-xl transition-all duration-300 z-10 relative cursor-pointer">
                                {m.icon}
                              </div>
                              <div className="ml-4 h-px flex-1 bg-slate-300" />
                            </div>
                            <div className="mt-3 max-w-[22rem] mx-auto text-center">
                              <p className="text-sm md:text-[16px] leading-snug font-semibold text-black text-justified">
                                {m.label}
                              </p>
                              <p className="mt-1.5 text-sm md:text-[16px] leading-snug text-center text-black text-justified">
                                {m.desc}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div />
                        )}
                      </div>

                      {/* Center dot */}
                      <div className="hidden md:flex relative items-start justify-center">
                        <div className="mt-1 w-3 h-3 rounded-full bg-primary ring-2 ring-primary/15" />
                      </div>

                      {/* Desktop right side */}
                      <div className="hidden md:block">
                        {!isLeft ? (
                          <div style={animStyle}>
                            <div className="flex items-center">
                              <div className="mr-4 h-px flex-1 bg-slate-300" />
                              <div className="p-3 bg-white border-2 border-slate-100 rounded-full shadow-md hover:scale-125 hover:-translate-y-1 hover:-rotate-6 hover:shadow-xl transition-all duration-300 z-10 relative cursor-pointer">
                                {m.icon}
                              </div>
                              <div className="mx-4 h-px flex-1 bg-slate-300" />
                              <span className="text-primary font-extrabold tracking-wide">{m.year}</span>
                            </div>
                            <div className="mt-3 max-w-[22rem] mx-auto text-center">
                              <p className="text-sm md:text-[16px] leading-snug font-semibold text-black text-justified">
                                {m.label}
                              </p>
                              <p className="mt-1.5 text-sm md:text-[16px] leading-snug text-black text-justified">
                                {m.desc}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            OUR IMPACT
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <section className="py-3 sm:py-8 md:py-8 bg-white" ref={impactRef}>
          <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-12">
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <h2 className="mt-3 text-2xl sm:text-[28px] md:text-[32px] font-bold text-secondary font-poppins">
                Our <span className="text-primary">Impact</span>
              </h2>
              <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-primary to-accent" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
              {impactAreas.map((area, i) => (
                <div
                  key={area.title}
                  className={`rounded-2xl border p-5 sm:p-6 md:p-7 ${area.bg} hover:-translate-y-1 hover:shadow-lg transition-all duration-300`}
                  style={{
                    opacity: impactInView ? 1 : 0,
                    transform: impactInView ? "translateY(0)" : "translateY(24px)",
                    transition: `opacity 0.5s ease ${i * 100}ms, transform 0.5s ease ${i * 100}ms`,
                  }}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className={`flex-shrink-0 mt-1 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-xl ${area.iconBg} shadow-md`}>{area.icon}</div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-[#0f2847] mb-1.5 sm:mb-2 font-poppins">
                        {area.title}
                      </h3>
                      <p className="text-xs sm:text-sm leading-relaxed text-slate-600 sm:text-justify sm:hyphens-auto font-inter">{area.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            OUR INITIATIVES
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <section
          ref={initRef}
          className="relative w-full overflow-hidden py-3 sm:py-8 md:py-8"
          style={{
            backgroundColor: "#000000",
            backgroundImage: `
      radial-gradient(circle at 20% 30%, rgba(139, 0, 0, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(139, 0, 0, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 50% 50%, #0a0000 0%, #000000 100%)
    `
          }}
        >
          <div className="relative mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-12">

            {/* Header */}
            <div className="mb-10 sm:mb-12 md:mb-14 text-center">
              <h2 className={`text-2xl sm:text-3xl md:text-[32px] font-bold text-white mb-3 tracking-tight font-poppins transition-all duration-1000 ${initInView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"
                }`}>
                Our <span className="text-primary">Initiatives</span>
              </h2>

              <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-primary to-accent" />
            </div>

            {/* Cards Container */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

              {[
                { text: "Founded in 1995 with initiatives like Balmitra and Nisarg Mitra, aimed at improving rural children's skills.", icon: <Leaf size={22} /> },
                { text: "Revived defunct DBI systems and promoted participatory irrigation to empower local farmers.", icon: <Droplets size={22} /> },
                { text: "Expanded focus to create livelihood opportunities for landless families through sustainable models.", icon: <HeartHandshake size={22} /> },
                { text: "Broadened scope through the Jalsamruddhi program focusing on water conservation.", icon: <Waves size={22} /> },
                { text: "Strong presence in Health & Education through Arogya Mitra and rural school support.", icon: <Stethoscope size={22} /> },
                { text: "Special focus on Nandurbar District with Lakhpati Kisan projects for economic growth.", icon: <TrendingUp size={22} /> },
              ].map((item, i) => (

                <div
                  key={i}
                  className={`relative flex flex-col items-center text-center gap-2 rounded-xl p-4 sm:p-6 transition-all duration-700 hover:bg-white/10 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(255,77,77,0.15)] ${initInView ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
                    }`}
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(8px)",
                    transitionDelay: `${i * 100}ms`,
                  }}
                >

                  {/* Icon */}
                  <div className="absolute -top-6 flex items-center justify-center w-12 h-12 rounded-full bg-[#1a1a1a] border border-white/10 text-primary shadow-lg">
                    {item.icon}
                  </div>

                  <div className="h-6" />

                  {/* Text */}
                  <p className="text-xs sm:text-sm md:text-base leading-relaxed text-gray-200">
                    {item.text}
                  </p>

                </div>
              ))}
            </div>
          </div>
        </section>



        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            OUR ROLE â€” NABARD
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <section className="py-3 sm:py-8 md:py-8 bg-white" ref={roleRef}>
          <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-12">
            <div
              className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-8 sm:gap-10 lg:gap-16 items-start"
              style={{
                opacity: roleInView ? 1 : 0,
                transform: roleInView ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
              }}
            >
              {/* LEFT BLUE CARD */}
              <div className="bg-[#0f2847] rounded-3xl p-7 sm:p-10 md:p-14 text-white relative overflow-hidden flex flex-col justify-center min-h-[280px] sm:min-h-[340px] md:min-h-[400px]">
                {/* Decorative subtle light effect */}
                <div className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl" />

                <p className="text-[0.75rem] font-bold font-inter tracking-[0.3em] uppercase text-sky-400 mb-6">
                  Our Role
                </p>

                <h2 className="text-[32px] sm:text-[32px] md:text-[32px] font-poppins font-semibold leading-[1.3] text-white mb-5 sm:mb-6">
                  Resource Support Organisation appointed by <span className="text-[#80caff] text-[32px] font-poppins font-bold">NABARD</span>
                </h2>

                <div className="w-16 h-1.5 rounded-full bg-sky-400 mb-8" />

                <p className="text-[1rem] leading-relaxed text-slate-300 text-[16px] font-light font-inter">
                  for the development of Farmer Producers Organizations (FPOs) in Maharashtra state.
                </p>
              </div>

              {/* RIGHT CONTENT AREA */}
              <div className="flex flex-col justify-between h-full py-4">
                <div className="space-y-4 sm:space-y-6 text-sm sm:text-[1.05rem] leading-[1.8] text-black text-[16px] font-inter">
                  <p className="text-justify"> {/* Added text-justify here */}
                    Yuva Mitra is appointed as a Resource Support Organization by NABARD for the
                    development of Farmer Producers Organizations (FPOs) in Maharashtra state. We
                    are dedicated to building institutions that empower farmers, including Water
                    User Associations (WUAs), FPC/FPOs, Farmers' clubs, and Joint Liability groups.
                  </p>
                  <p className="text-justify"> {/* Added text-justify here */}
                    At Yuva Mitra, our commitment to rural development is unwavering, and we
                    continue to make a meaningful impact on the lives of countless individuals and
                    communities. Together, we strive for a brighter and more prosperous future for all.
                  </p>
                </div>

                {/* BOTTOM INSTITUTION GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 ">
                  {[
                    "Water User Associations (WUAs)",
                    "FPC / FPOs",
                    "Farmers' Clubs",
                    "Joint Liability Groups",
                  ].map((inst) => (
                    <div
                      key={inst}
                      className="flex items-center gap-3 sm:gap-4 bg-[#f8fbff] rounded-xl px-4 sm:px-6 py-4 sm:py-5 border border-blue-50/80 text-sm sm:text-[0.95rem] font-medium text-[#1e3a8a] transition-all hover:bg-blue-50"
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-sky-400 flex-shrink-0 shadow-[0_0_8px_rgba(56,189,248,0.6)]" />
                      {inst}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            CLOSING CTA
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <section className="relative py-3 sm:py-8 md:py-8 min-h-[320px] md:min-h-[380px] flex items-center overflow-hidden">

          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={ngoBanner}
              alt="NGO Impact"
              className="w-full h-full object-cover"
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/60"></div>
          </div>

          {/* Content */}
          <div className="relative mx-auto max-w-4xl px-6 text-center">

            {/* Glass Card */}
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-6 md:p-8 shadow-xl">

              <h2 className="text-[32px] md:text-[32px] font-bold font-poppins text-white leading-snug">
                Together, we build a future filled with hope, dignity, and opportunity.
              </h2>

              <p className="mt-4 text-white/80 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                For over <span className="font-semibold text-white">28 years</span>, we have worked at the grassroots to empower communities through education, water conservation, and sustainable livelihoods.
              </p>

              <a
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 bg-primary hover:bg-red-700 hover-bounce text-white font-bold px-7 py-2.5 rounded-full shadow-lg shadow-primary/20 transition-all active:scale-95 font-poppins"
              >
                Get In Touch 
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
