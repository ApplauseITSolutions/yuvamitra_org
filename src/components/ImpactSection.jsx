import { useEffect, useRef, useState } from "react";

const stats = [
  {
    icon: (
      <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    number: "153645+",
    label: "Farmers Supported",
    iconColor: "#FF4D4D",
  },
  {
    icon: (
      <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 0 1 0 20" /><path d="M12 2v20" /><path d="M2 12h20" />
      </svg>
    ),
    number: "105362+",
    label: "Students Engaged",
    iconColor: "#FF4D4D",
  },
  {
    icon: (
      <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    number: "86825+",
    label: "Women Empowered",
    iconColor: "#FF4D4D",
  },
  {
    icon: (
      <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
      </svg>
    ),
    number: "5244+",
    label: "Villages Impacted",
    iconColor: "#FF4D4D",
  },
  {
    icon: (
      <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="3 11 22 2 13 21 11 13 3 11" />
      </svg>
    ),
    number: "1285+",
    label: "Labours Uplifted",
    iconColor: "#FF4D4D",
  },
  {
    icon: (
      <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    number: "37005+",
    label: "Adolescents Girls Nurtured",
    iconColor: "#FF4D4D",
  },
  {
    icon: (
      <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    number: "3,90,376+",
    label: "Families Impacted",
    iconColor: "#FF4D4D",
  },
];

function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!start) return;
    const numeric = parseInt(target.replace(/[^0-9]/g, ""), 10);
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numeric));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  const formatted = count.toLocaleString();
  return target.includes("+") ? formatted + "+" : formatted;
}

// ... (stats array and useCountUp hook remain the same)

function StatCard({ stat, index, animate }) {
  const val = useCountUp(stat.number, 1800, animate);

  return (
    <div
      className={`relative mt-4 flex flex-col items-center text-center gap-2 rounded-xl p-5 transition-all duration-700 hover:bg-white/10 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(255,77,77,0.15)] ${
        animate ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-90"
      }`}
      style={{
        background: "rgba(255, 255, 255, 0.05)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(8px)",
        transitionDelay: `${index * 100}ms`,
      }}
    >
      {/* Icon Wrapper - Overlapping top edge */}
      <div className="absolute -top-5 flex items-center justify-center w-12 h-12 rounded-full bg-[#1a1a1a] border border-white/10 text-primary shadow-xl group">
        <span className="scale-100 md:scale-110 animate-pulse-slow">{stat.icon}</span>
      </div>
      
      {/* Spacer for the overlapping icon */}
      <div className="h-2" />

      {/* Number */}
      <p className="text-xl md:text-2xl font-bold text-white tracking-tight font-poppins">
        {val}
      </p>

      {/* Label */}
      <p className="text-xs md:text-sm font-medium capitalize tracking-wide text-gray-200 font-inter max-w-[180px]">
        {stat.label}
      </p>
    </div>
  );
}

export default function ImpactSection() {
  const sectionRef = useRef(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimate(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const topRow = stats.slice(0, 4);
  const bottomRow = stats.slice(4);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden py-6 md:py-12"
      style={{ 
        backgroundColor: "#000000",
        backgroundImage: `
          radial-gradient(circle at 20% 30%, rgba(139, 0, 0, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 70%, rgba(139, 0, 0, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, #0a0000 0%, #000000 100%)
        `
      }}
    >
      <div className="relative mx-auto max-w-[1380px] px-4 md:px-12">
        {/* Header */}
        <div className="mb-4 md:mb-12 text-center">
          <h2 className={`text-[32px] font-bold text-white mb-2 tracking-tighter font-poppins transition-all duration-1000 ${animate ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"}`}>
            Our <span className="text-primary">Impact</span>
          </h2>
          <div className={`mx-auto mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-1000 delay-300 ${animate ? "opacity-100" : "opacity-0"}`} />
        </div>

        {/* Top Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-6 md:gap-y-14 mb-8 md:mb-14">
          {topRow.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} animate={animate} />
          ))}
        </div>

        {/* Bottom Row */}
        <div className="flex justify-center">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-12 md:gap-x-6 md:gap-y-14 w-full max-w-5xl">
            {bottomRow.map((stat, i) => (
              <StatCard key={stat.label} stat={stat} index={i + 4} animate={animate} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  );
}