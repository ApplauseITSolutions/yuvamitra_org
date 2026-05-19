import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Leaf,
  Droplets,
  Monitor,
  Building2,
  Sprout,
  Cpu,
  HeartPulse,
  Flame,
  Users,
  TreePine,
  Loader2,
  Share2,
  MessageCircle
} from "lucide-react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import AllProgramsBanner from "../components/layouts/Banners/AllProgramsBanner.jsx";
import { programs } from "../data/ProgramData.jsx";
import { useParams } from "react-router-dom";
import ngoBanner from "../assets/Images/Impact-bg.png";

const INITIAL_COUNT = 12;
const LOAD_MORE_COUNT = 6;


/* ── Google Font ── */
const FontLink = () => (
  <link
    // href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap"
    // rel="stylesheet"
  />
);

/* ── useInView hook ── */
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

/* ── Category icon map ── */
const categoryIcons = {
  Agriculture: Leaf,
  "Market Linkage": Building2,
  "Skill Development": Cpu,
  "Farmer Services": Sprout,
  "Water Conservation": Droplets,
  "Digital Literacy": Monitor,
  "Health & Sanitation": HeartPulse,
  "Tribal Agriculture": TreePine,
  "Clean Energy": Flame,
  "Women Empowerment": Users,
};

/* ── Single Program Card ── */
function ProgramCard({ program, index, isNew }) {
  const [ref, inView] = useInView(0.08);
  const [showShare, setShowShare] = useState(false);
  const Icon = categoryIcons[program.category] || Leaf;

  const shareUrl = `${window.location.origin}/programs/details/${program.slug}`;

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.55s ease ${(index % LOAD_MORE_COUNT) * 0.1}s, transform 0.55s ease ${(index % LOAD_MORE_COUNT) * 0.1}s`,
      }}
      className={`group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full ${
        isNew ? "ring-2 ring-[#E53935]/20" : ""
      }`}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[16/9] w-full flex-shrink-0">
        {program.image ? (
          <img
            src={program.image}
            alt={program.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div 
            className="w-full h-full flex items-center justify-center bg-gray-50 relative overflow-hidden"
            style={{ backgroundColor: program.categoryColor + "15" }}
          >
            <Icon size={48} style={{ color: program.categoryColor }} className="opacity-40" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
              <Icon size={180} style={{ color: program.categoryColor }} />
            </div>
          </div>
        )}
        {/* Category Pill */}
        {/* <div
          className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-xs font-semibold backdrop-blur-sm shadow-sm"
          style={{ backgroundColor: program.categoryColor + "ee" }}
        >
          <Icon size={11} />
          {program.category}
        </div> */}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        {/* Meta */}
        <div className="flex items-center gap-3 mb-3 text-[10px] text-gray-400 uppercase tracking-widest font-bold relative">
          <div className="relative">
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowShare(!showShare);
              }}
              className="flex items-center gap-1 hover:text-primary transition-colors"
            >
              <Share2 size={12} />
              Share
            </button>

            {/* Floating Share Menu */}
            {showShare && (
              <div className="absolute bottom-full left-0 mb-3 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-gray-100 p-2 flex gap-2 z-[100] animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-300">
                {[
                  { icon: <FaFacebookF size={14} />, color: "text-[#1877F2]", url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}` },
                  { icon: <FaTwitter size={14} />, color: "text-[#1DA1F2]", url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}` },
                  { icon: <FaLinkedinIn size={14} />, color: "text-[#0A66C2]", url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}` },
                  { icon: <MessageCircle size={14} />, color: "text-[#25D366]", url: `https://api.whatsapp.com/send?text=${encodeURIComponent(program.title + " " + shareUrl)}` },
                ].map((s, i) => (
                  <a
                    key={i}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-lg bg-gray-50 ${s.color} hover:bg-gray-100 transition-all hover:scale-110`}
                  >
                    {s.icon}
                  </a>
                ))}
                {/* Small arrow */}
                <div className="absolute top-full left-4 -mt-1 border-8 border-transparent border-t-white" />
              </div>
            )}
          </div>
          
          <span className="opacity-30">|</span>
          
          {/* <Link 
            to={`/programs/details/${program.slug}#comments`}
            className="hover:text-primary transition-colors"
          >
            0 Comments
          </Link> */}
        </div>

        {/* Title */}
        <h3 className="text-[20px] font-bold font-Poppins text-gray-900 uppercase tracking-wide mb-2 leading-snug group-hover:text-[#E53935] transition-colors duration-300 line-clamp-2">
          {program.title}
        </h3>

        {/* Excerpt */}
        <p className="text-[15px] text-black mb-4 line-clamp-3">
          {program.excerpt}
        </p>

        {/* Animated underline */}
        <div className="w-10 h-0.5 bg-[#E53935] mb-4 group-hover:w-full transition-all duration-500 ease-out" />

        {/* Read More */}
        <Link
          to={`/programs/details/${program.slug}`}
          className="mt-auto inline-flex items-center gap-2 text-sm font-bold text-[#2E3192] hover:text-[#E53935] transition-colors duration-300 group/btn w-fit"
        >
          READ MORE
          <ArrowRight
            size={13}
            className="opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-300"
          />
        </Link>
      </div>
    </div>
  );
}

/* ── Stats Banner ── */
// function StatsBanner() {
//   const [ref, inView] = useInView(0.1);
//   const stats = [
//     { value: "13+", label: "Years of Impact" },
//     { value: "32", label: "FPOs Promoted" },
//     { value: "13,623+", label: "Farmers Empowered" },
//     { value: "190+", label: "Villages Reached" },
//   ];
//   return (
//     <div ref={ref} className="bg-gradient-to-r from-[#0f1f5c] to-[#2E3192] py-12 px-6">
//       <div className="max-w-[1380px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
//         {stats.map((s, i) => (
//           <div
//             key={i}
//             style={{
//               opacity: inView ? 1 : 0,
//               transform: inView ? "translateY(0)" : "translateY(20px)",
//               transition: `all 0.55s ease ${i * 0.12}s`,
//             }}
//           >
//             <div className="text-4xl md:text-5xl font-extrabold text-white mb-1">{s.value}</div>
//             <div className="text-xs text-blue-200 uppercase tracking-widest font-semibold">{s.label}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

/* ── Section Header ── */
function SectionHeader() {
  const [ref, inView] = useInView(0.2);
  return (
    <div
      ref={ref}
      className="text-center mb-14"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: "all 0.7s ease",
      }}
    >
      {/* <p className="text-[#E53935] text-xs uppercase tracking-[0.3em] font-bold mb-3">What We Do</p>
      <h2 className="text-3xl md:text-5xl font-extrabold text-secondary mb-4 leading-tight">
        Our Programs &amp; Initiatives
      </h2>
      <p className="max-w-2xl mx-auto text-gray-500 text-base md:text-lg leading-relaxed">
        Explore the wide range of programs through which Yuva Mitra is transforming lives across
        rural Maharashtra and beyond.
      </p> */}
      {/* <div className="flex justify-center mt-6 gap-2">
        <span className="w-10 h-1 rounded-full bg-[#E53935]" />
        <span className="w-4 h-1 rounded-full bg-[#2E3192]" />
        <span className="w-2 h-1 rounded-full bg-gray-300" />
      </div> */}
    </div>
  );
}

/* ── Load More Button ── */
function LoadMoreButton({ onClick, loading, hasMore, total, shown }) {
  if (!hasMore) return null;
  return (
    <div className="flex flex-col items-center gap-3 mt-14">
      {/* Progress indicator */}
      <p className="text-sm text-gray-400 font-medium">
        Showing <span className="font-bold text-gray-700">{shown}</span> of{" "}
        <span className="font-bold text-gray-700">{total}</span> programs
      </p>

      

      {/* Progress bar */}
      {/* <div className="w-48 h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#E53935] to-[#2E3192] rounded-full transition-all duration-500"
          style={{ width: `${(shown / total) * 100}%` }}
        />
      </div> */}

      {/* Button */}
      <button
        onClick={onClick}
        disabled={loading}
        className="group mt-3 inline-flex items-center gap-3 bg-primary hover:bg-red-700 hover-bounce text-white font-bold px-7 py-2.5 rounded-full shadow-lg shadow-primary/20 transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed font-poppins"
      >
        <span className="flex items-center gap-3">
  {loading ? (
    <>
      <Loader2 size={20} className="animate-spin" />
      Loading...
    </>
  ) : (
    <>
      {/* <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /> */}
      Load More Programs
    </>
  )}
</span>
          
      </button>
    </div>
  );
}

/* ── Main Page ── */
export default function AllPrograms() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [loading, setLoading] = useState(false);
  const [newStartIndex, setNewStartIndex] = useState(-1);
  const { category } = useParams();

 const filteredPrograms = category
  ? programs.filter(p => p.categorySlug === category)
  : programs;

  console.log("Filtered Programs:", filteredPrograms);

const visiblePrograms = filteredPrograms.slice(0, visibleCount);

 const hasMore = visibleCount < filteredPrograms.length;

  const handleLoadMore = () => {
    setLoading(true);
    setNewStartIndex(visibleCount);
    /* Simulate a brief loading delay for UX polish */
    setTimeout(() => {
     setVisibleCount((prev) =>
  Math.min(prev + LOAD_MORE_COUNT, filteredPrograms.length)
);
      setLoading(false);
    }, 600);
  };

  return (
    <div className="bg-[#f8f9fb] min-h-screen font-Inter">
      <FontLink />
      <AllProgramsBanner />
      {/* <StatsBanner /> */}

      {/* Programs Grid */}
      <section className="max-w-[1380px] mx-auto px-6 lg:px-12 mt-12 pb-20">
        <SectionHeader />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {visiblePrograms.map((program, index) => (
            <ProgramCard
              key={program.id}
              program={program}
              index={index}
              isNew={index >= newStartIndex && newStartIndex !== -1}
            />
          ))}
        </div>

        <LoadMoreButton
          onClick={handleLoadMore}
          loading={loading}
          hasMore={hasMore}
          total={filteredPrograms.length}
          shown={visiblePrograms.length}
        />
      </section>

      {/* CTA Section */}
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
    </div>
  );
}
