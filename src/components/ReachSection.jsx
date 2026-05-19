import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import mapImg from "../assets/Images/India-Map-State.png";

const coreStates = [
  { state: "Madhya Pradesh", color: "#F5A623", pingColor: "bg-[#F5A623]" },
  { state: "Haryana",        color: "#F5A623", pingColor: "bg-[#F5A623]" },
  { state: "Maharashtra",    color: "#F5A623", pingColor: "bg-[#F5A623]" },
  { state: "Gujarat",        color: "#F5A623", pingColor: "bg-[#F5A623]" },
];

const knowledgeStates = [
  { state: "Odisha",           color: "#2E6DA4", pingColor: "bg-[#2E6DA4]" },
  { state: "Jharkhand",        color: "#2E6DA4", pingColor: "bg-[#2E6DA4]" },
  { state: "West Bengal",      color: "#2E6DA4", pingColor: "bg-[#2E6DA4]" },
  { state: "Karnataka",        color: "#2E6DA4", pingColor: "bg-[#2E6DA4]" },
  { state: "Punjab",           color: "#2E6DA4", pingColor: "bg-[#2E6DA4]" },
  { state: "Himachal Pradesh", color: "#2E6DA4", pingColor: "bg-[#2E6DA4]" },
];

const pinPositions = {
  "Madhya Pradesh":    { left: "43%", top: "52%" },
  "Haryana":           { left: "36%", top: "28%" },
  "Maharashtra":       { left: "34%", top: "63%" },
  "Gujarat":           { left: "22%", top: "52%" },
  "Odisha":            { left: "58%", top: "57%" },
  "Jharkhand":         { left: "57%", top: "48%" },
  "West Bengal":       { left: "65%", top: "49%" },
  "Karnataka":         { left: "37%", top: "74%" },
  "Punjab":            { left: "31%", top: "23%" },
  "Himachal Pradesh":  { left: "37%", top: "19%" },
};

function StateBox({ number, state, isActive, onClick, animate, delay, accentColor }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all duration-300 font-inter ${
        animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } ${
        isActive
          ? "border-transparent text-white shadow-lg scale-[1.02]"
          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:shadow-md"
      }`}
      style={{
        transitionDelay: delay,
        backgroundColor: isActive ? accentColor : undefined,
      }}
    >
      {/* Number badge */}
      <span
        className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[13px] font-bold text-white shadow-sm"
        style={{ backgroundColor: isActive ? "rgba(255,255,255,0.3)" : accentColor }}
      >
        {number}
      </span>
      <span className="text-[15px] font-semibold leading-tight">{state}</span>
    </button>
  );
}

function StatePanel({ title, states, accentColor, activeState, toggle, animate, baseDelay = 0 }) {
  return (
    <div className="flex flex-col gap-3">
      {/* Heading — fixed min-height so both panels' first boxes align */}
      <div className="min-h-[72px] flex flex-col justify-start">
        <h3 className={`text-[20px] font-bold font-poppins text-secondary leading-snug transition-all duration-700 ${
          animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}>
          {title}
        </h3>
        <div className="mt-2 h-1 w-14 rounded-full bg-gradient-to-r from-primary to-accent" />
      </div>
      {/* State boxes */}
      <div className="flex flex-col gap-2">
        {states.map((item, i) => (
          <StateBox
            key={item.state}
            number={i + 1}
            state={item.state}
            isActive={activeState === item.state}
            onClick={() => toggle(item.state)}
            animate={animate}
            delay={`${(baseDelay + i) * 60}ms`}
            accentColor={accentColor}
          />
        ))}
      </div>
    </div>
  );
}

export default function ReachSection() {
  const sectionRef = useRef(null);
  const [animate, setAnimate] = useState(false);
  const [activeState, setActiveState] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimate(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const toggle = (state) => setActiveState(prev => prev === state ? null : state);

  const activeItem = [...coreStates, ...knowledgeStates].find(s => s.state === activeState);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[linear-gradient(180deg,#f8fbff_0%,#eef4fa_100%)] py-8 md:py-8"
    >
      {/* Decorative orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-50/50 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="relative max-w-[1380px] mx-auto px-6 lg:px-12 z-10">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-[32px] text-secondary font-bold font-poppins">
            Our <span className="text-primary">Reach</span>
          </h2>
          <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-primary to-accent" />
        </div>

        {/* Three-column: Core | Map | Knowledge — all top-aligned */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-8 items-start">

          {/* LEFT — Core Interventions */}
          <div className="order-2 lg:order-1">
            <StatePanel
              title="Core Interventions"
              states={coreStates}
              accentColor="#F5A623"
              activeState={activeState}
              toggle={toggle}
              animate={animate}
              baseDelay={0}
            />
          </div>

          {/* CENTER — Map */}
          <div className={`order-1 lg:order-2 flex justify-center transition-all duration-1000 ${
            animate ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}>
            <div className="relative">
              <img
                src={mapImg}
                alt="India Reach Map"
                className="w-[260px] sm:w-[320px] md:w-[380px] lg:w-[400px] h-auto object-contain animate-zoom-in-out block"
                style={{ marginTop: "-8%" }}
              />

              {/* Map pin on active state */}
              {activeState && pinPositions[activeState] && (
                <div
                  className="absolute flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-sm px-3 py-1.5 text-xs font-bold shadow-lg border border-white font-inter whitespace-nowrap z-20 animate-in fade-in zoom-in-95 duration-200"
                  style={{
                    left: pinPositions[activeState].left,
                    top: pinPositions[activeState].top,
                    transform: "translate(-50%, -50%)",
                    color: activeItem?.color,
                  }}
                >
                  <MapPin size={13} style={{ color: activeItem?.color }} />
                  {activeState}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT — Knowledge Partnership */}
          <div className="order-3">
            <StatePanel
              title={<>Knowledge Partnership &amp;<br />Technical Support</>}
              states={knowledgeStates}
              accentColor="#2E6DA4"
              activeState={activeState}
              toggle={toggle}
              animate={animate}
              baseDelay={4}
            />
          </div>

        </div>
      </div>

      <style>{`
        @keyframes zoomInOutMap {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.04); }
        }
        .animate-zoom-in-out {
          animation: zoomInOutMap 10s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
