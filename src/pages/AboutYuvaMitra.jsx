import React, { useEffect, useRef, useState } from "react";
// import aboutImg from "../assets/Images/aboutImg.webp";
import AboutBanner from "../components/layouts/Banners/AboutBanner.jsx";
import {Link} from "react-router-dom";
import AboutSection from "../components/AboutSection";


import {
  ShieldCheck,
  Eye,
  HeartHandshake,
  Sparkles,
  Target,
  ClipboardCheck,
  Leaf,
  Users,
  MapPin
} from "lucide-react";

const values = [
  { label: "Commitment", icon: Target },
  { label: "Integrity", icon: ShieldCheck },
  { label: "Transparency", icon: Eye },
  { label: "Quality", icon: ClipboardCheck },
  { label: "Innovation", icon: Sparkles },
  { label: "Discipline", icon: HeartHandshake },
  { label: "Accountability", icon: Users },
  { label: "Sustainable Development", icon: Leaf },
];


/* ─── Animated counter hook ─── */
function useCounter(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}


/* ─── Intersection observer hook ─── */
function useInView(threshold = 0.2) {
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


/* ─── Stat Card ─── */
function StatCard({ value, suffix, label, inView, delay = 0 }) {
  const count = useCounter(value, 1800, inView);
  return (
    <div
      className="flex flex-col items-center justify-center py-12 px-8 border-r border-white/10 last:border-r-0 hover:bg-white/5 transition-colors duration-300"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      <span className="font-poppins text-5xl lg:text-6xl font-bold text-sky-300 leading-none">
        {count.toLocaleString("en-IN")}{suffix}
      </span>
      <span className="mt-3 text-xs font-semibold tracking-widest uppercase text-white/50">
        {label}
      </span>
    </div>
  );
}


/* ─── VM Card ─── */
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


export default function AboutYuvaMitra() {
  const [statsRef, statsInView] = useInView(0.3);
  const [valuesRef, valuesInView] = useInView(0.2);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      <main
        className="bg-white text-slate-700 "
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <AboutBanner />

     <section className="mt-12 pb-4 md:pb-8"> 
  <AboutSection showButton={false}/>
</section>
   
       <section
  ref={statsRef}
  className="relative overflow-hidden bg-gradient-to-br from-[#133764] to-secondary"
>
          <div className="pointer-events-none absolute -right-20 w-72 h-72 rounded-full bg-sky-500/10 blur-3xl" />
          <div className="mx-auto max-w-5xl grid grid-cols-1 sm:grid-cols-3">
            <StatCard value={28}     suffix="+"       label="Years of Service"    inView={statsInView} delay={0}   />
            <StatCard value={140000} suffix="+"       label="Families Impacted"   inView={statsInView} delay={150} />
            <StatCard value={12}     suffix=" States" label="Nationwide Presence" inView={statsInView} delay={300} />
          </div>
        </section>

    
        <section className="py-8 sm:py-10 md:py-12 bg-[#f7fbff]">
          <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-12">
            {/* Header */}
            <div className="text-center mb-8 sm:mb-10 md:mb-14">
              <h2 className="mt-3 text-2xl sm:text-[28px] md:text-[32px] font-bold text-secondary font-poppins">
                Vision, Mission & <span className="text-primary">Work Area</span>
              </h2>
              <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-primary to-accent" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
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

        <section ref={valuesRef} className="py-8 sm:py-10 md:py-12 bg-white">
          <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-12">
            <div className="text-center mb-8 sm:mb-10 md:mt-12">
              <h2 className="mt-3 text-2xl sm:text-[28px] md:text-[32px] font-bold text-secondary font-poppins">
                Our<span className="text-primary"> Core Values</span>
              </h2>
              <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-primary to-accent" />
            </div>

            {/* Our Core Values */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
              {values.map((v, i) => {
                const Icon = v.icon;
                return (
                  <div
                    key={v.label}
                    className="group flex flex-col items-center justify-center gap-3 p-5 rounded-xl bg-[#f7fbff] border border-sky-100 hover:bg-secondary hover:text-white hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                    style={{
                      opacity: valuesInView ? 1 : 0,
                      transform: valuesInView ? "translateY(0)" : "translateY(20px)",
                      transition: `all 0.4s ease ${i * 80}ms`,
                    }}
                  >
                    {/* ICON */}
                    <div className="p-4 rounded-full bg-primary text-white shadow-lg transition-all duration-300 group-hover:scale-110">
                      <Icon className="w-8 h-8 md:w-8 md:h-8" />
                    </div>
                    {/* TEXT */}
                    <span className="text-sm font-semibold text-center">
                      {v.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}