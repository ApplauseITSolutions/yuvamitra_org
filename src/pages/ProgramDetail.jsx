import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Share2,
  ChevronRight,
  MessageSquare,
  MessageCircle,
  Users,
  Target,
  Heart,
  Globe,
} from "lucide-react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { programs } from "../data/ProgramData.jsx";

/* ── Google Fonts ── */
const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&family=Inter:wght@300;400;500;600;700&display=swap"
    rel="stylesheet"
  />
);

/* ── useInView Hook ── */
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ── Hero Section with Blue Background ── */


function HeroSection({ program }) {
  const words = program.title.split(" ");
  const mid = Math.ceil(words.length / 2);

  return (
    <section className="bg-gray-100 pt-16 pb-10 flex items-center justify-center">
      <div className="max-w-[1200px] w-full px-6 text-center">
        <h1 className="text-[32px] font-bold font-Poppins leading-tight">

          <span className="text-secondary">
            {words.slice(0, mid).join(" ")}
          </span>{" "}

          <span className="text-primary">
            {words.slice(mid).join(" ")}
          </span>
          <div className="mx-auto mt-2 h-1 w-24 rounded-full bg-gradient-to-r from-primary to-accent" />

        </h1>
      </div>
    </section>
  );
}


/* ── Hero Image Section ── */
function ImageSection({ program }) {
  const [imgRef, imgInView] = useInView(0.15);

  return (
    <div className="bg-white pb-16" ref={imgRef}>
      <div className="max-w-[1380px] mx-auto px-6">
        <div
          className={`rounded-2xl overflow-hidden shadow-xl aspect-video bg-gray-200 transition-all duration-700 ${imgInView
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95"
            }`}
        >
          <img
            src={program.image}
            alt={program.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

/* ── Stats Section ── */
// function StatsSection({ program }) {
//   const [statsRef, statsInView] = useInView(0.2);

//   return (
//     <div className="bg-white py-20">
//       <div className="max-w-6xl mx-auto px-6 md:px-8">
//         <div
//           ref={statsRef}
//           className="grid grid-cols-2 md:grid-cols-4 gap-8"
//         >
//           {program.stats.map((stat, i) => (
//             <div
//               key={i}
//               className={`text-center transition-all duration-1000 ${
//                 statsInView
//                   ? "opacity-100 translate-y-0"
//                   : "opacity-0 translate-y-8"
//               }`}
//               style={{ transitionDelay: `${i * 150}ms` }}
//             >
//               <div className="text-4xl md:text-5xl font-merriweather font-bold text-blue-600 mb-3">
//                 {stat.value}
//               </div>
//               <div className="text-gray-600 font-medium text-sm">
//                 {stat.label}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

/* ── Gallery Grid with Lightbox ── */
function GalleryGrid({ images = [] }) {
  const [lightboxIdx, setLightboxIdx] = useState(null);

  const closeLightbox = () => setLightboxIdx(null);
  const prevImg = () => setLightboxIdx((i) => (i - 1 + images.length) % images.length);
  const nextImg = () => setLightboxIdx((i) => (i + 1) % images.length);

  useEffect(() => {
    if (lightboxIdx === null) {
      document.body.style.overflow = '';
      return;
    }
    document.body.style.overflow = 'hidden';
    const handler = (e) => {
      if (e.key === 'ArrowRight') nextImg();
      if (e.key === 'ArrowLeft') prevImg();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [lightboxIdx]);

  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {images.map((img, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-xl shadow-md cursor-pointer group aspect-[4/3]"
            onClick={() => setLightboxIdx(i)}
          >
            <img
              src={img}
              alt={`Gallery ${i + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 shadow-lg">
                <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox — portal to body to escape stacking context */}
      {lightboxIdx !== null && createPortal(
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 99999, background: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100vw', height: '100vh' }}
          onClick={(e) => { if (e.target === e.currentTarget) closeLightbox(); }}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            style={{ position: 'absolute', top: 16, right: 16, zIndex: 10 }}
            className="text-white bg-white/10 hover:bg-white/25 rounded-full w-10 h-10 flex items-center justify-center transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prevImg(); }}
            style={{ position: 'absolute', left: 16, zIndex: 10 }}
            className="text-white bg-white/10 hover:bg-white/25 rounded-full w-11 h-11 flex items-center justify-center transition"
          >
            <ArrowLeft size={22} />
          </button>

          {/* Main Image */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px 80px', width: '100%' }}>
            <img
              src={images[lightboxIdx]}
              alt={`Gallery ${lightboxIdx + 1}`}
              style={{ maxHeight: '65vh', maxWidth: '100%', borderRadius: 12, objectFit: 'contain' }}
            />
          </div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); nextImg(); }}
            style={{ position: 'absolute', right: 16, zIndex: 10 }}
            className="text-white bg-white/10 hover:bg-white/25 rounded-full w-11 h-11 flex items-center justify-center transition"
          >
            <ArrowRight size={22} />
          </button>

          {/* Thumbnail strip */}
          <div style={{ width: '100%', padding: '0 16px 16px', display: 'flex', gap: 8, overflowX: 'auto', justifyContent: 'center' }}>
            {images.map((img, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setLightboxIdx(i); }}
                style={{
                  flexShrink: 0, width: 60, height: 60, borderRadius: 8, overflow: 'hidden',
                  border: i === lightboxIdx ? '2px solid #fff' : '2px solid rgba(255,255,255,0.2)',
                  opacity: i === lightboxIdx ? 1 : 0.55,
                  transform: i === lightboxIdx ? 'scale(1.1)' : 'scale(1)',
                  transition: 'all 0.2s',
                }}
              >
                <img src={img} alt={`thumb ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>
            ))}
          </div>

          {/* Counter */}
          <div style={{ position: 'absolute', top: 16, left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>
            {lightboxIdx + 1} / {images.length}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

/* ── Main Content Section ── */
function ContentSection({ program }) {
  const [contentRef, contentInView] = useInView(0.05);

  return (
    <div className="bg-gray-100 mt-8 pb-2">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-12">

        <div
          ref={contentRef}
          className={`transition-all duration-1000 ${
            contentInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-12"
          }`}
        >

          {/* IMAGE — full width within navbar-aligned container */}
          <div className="w-full mb-8">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src={program.image}
                alt={program.title}
                className="w-full max-h-[480px] object-cover"
              />
            </div>
          </div>

          {/* PROJECT INFO */}
          {program.projectInfo && (
            <div className="mb-8 flex flex-col items-center text-center space-y-1">
              {program.projectInfo.map((info, index) => (
                <p
                  key={index}
                  className="text-gray-800 font-semibold text-[14px] sm:text-[15px] tracking-wide"
                >
                  {info}
                </p>
              ))}
            </div>
          )}

          {/* CONTENT */}
          <div>

            {/* Overview */}
            <div className="mb-10">
              <h2 className="text-[26px] sm:text-[32px] font-bold font-Poppins text-gray-900 mb-4">
                Overview
              </h2>
              <p className="text-gray-700 text-[16px] leading-relaxed font-Inter font-medium sm:text-justify sm:hyphens-auto">
                {program.overview}
              </p>
            </div>

            {/* Sections */}
          <div className="space-y-10">
  {(program.sections || []).map((section, i) => (
    <div key={i} className={section.type === "gallery" ? "" : "border-l-4 border-blue-600 pl-6"}>

      {/* ✅ Heading */}
      {section.heading && section.type !== "gallery" && (
        <h3 className="text-[20px] font-bold font-Poppins text-gray-900 mb-3">
          {section.heading}
        </h3>
      )}

      {/* ✅ Gallery Heading */}
      {section.heading && section.type === "gallery" && (
        <div className="mb-6 flex items-center gap-3">
          <h3 className="text-[24px] sm:text-[28px] font-bold font-Poppins text-gray-900">
            {section.heading}
          </h3>
          <div className="flex-1 h-[2px] bg-gradient-to-r from-blue-600 to-transparent rounded-full" />
        </div>
      )}

      {/* ✅ TEXT */}
      {section.type === "text" && (
        <div className="space-y-3">
          {Array.isArray(section.content)
            ? section.content.map((para, index) => (
                <p key={index} className="text-gray-700 text-[16px] leading-relaxed font-Inter font-medium sm:text-justify sm:hyphens-auto">
                  {para}
                </p>
              ))
            : (
                <p className="text-gray-700 text-[16px] leading-relaxed font-Inter font-medium sm:text-justify sm:hyphens-auto">
                  {section.content}
                </p>
              )}
        </div>
      )}

      {/* ✅ LIST */}
      {section.type === "list" && (
        <div className="space-y-3">
          {section.title && (
            <p className="text-gray-700 text-[16px] leading-relaxed font-Inter font-medium sm:text-justify sm:hyphens-auto">
              {section.title}
            </p>
          )}

          <ul className="list-disc pl-5 space-y-2 text-gray-700 text-[16px] leading-relaxed font-Inter font-medium sm:text-justify sm:hyphens-auto">
            {(Array.isArray(section.content) ? section.content : [section.content]).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {/* ✅ IMAGE */}
      {section.type === "image" && (
        <div className="mt-4 flex flex-wrap gap-4">
          {(Array.isArray(section.content) ? section.content : [section.content]).map((img, index) => (
            <img
              key={index}
              src={img}
              alt={section.heading}
              className="w-full max-w-[500px] rounded-lg shadow-md"
            />
          ))}
        </div>
      )}

      {/* ✅ MIXED (LIST + IMAGE or TEXT + IMAGE) */}
      {section.type === "mixed" && (
        <div className="space-y-4">

          {/* optional intro text */}
          {section.title && (
            <p className="text-gray-700 text-[16px] leading-relaxed font-Inter font-medium sm:text-justify sm:hyphens-auto">
              {section.title}
            </p>
          )}

          {/* list */}
          {section.content?.list && (
            <ul className="list-disc pl-5 space-y-2 text-gray-700 text-[16px] leading-relaxed font-Inter font-medium sm:text-justify sm:hyphens-auto">
              {section.content.list.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}

          {/* images */}
          {section.content?.images && (
            <div className="flex flex-wrap gap-4 mt-4">
              {section.content.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="section"
                  className="w-full max-w-[500px] rounded-lg shadow-md"
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* ✅ GALLERY */}
      {section.type === "gallery" && (
        <GalleryGrid images={section.content} heading={section.heading} />
      )}

    </div>
  ))}
</div>

          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Share & Tags Section ── */
function ShareSection({ program }) {
  return (
    <div className="bg-gray-100 py-8 border-t border-gray-200">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3">
            {program.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium border border-gray-200"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Share Buttons */}
          <div className="flex items-center gap-4">
            <span className="text-gray-600 font-medium text-sm">Share:</span>
            <div className="flex items-center gap-3">
              {[
                {
                  icon: <FaFacebookF size={18} />,
                  color: "text-blue-600 hover:bg-blue-100",
                  url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
                },
                {
                  icon: <FaTwitter size={18} />,
                  color: "text-sky-500 hover:bg-sky-100",
                  url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`,
                },
                {
                  icon: <FaLinkedinIn size={18} />,
                  color: "text-blue-700 hover:bg-blue-100",
                  url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
                },
                {
                  icon: <MessageCircle size={18} />,
                  color: "text-green-600 hover:bg-green-100",
                  url: `https://api.whatsapp.com/send?text=${encodeURIComponent(program.title + " " + window.location.href)}`,
                },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${social.color}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavigationSection({ programs, currentSlug }) {
  const currentIndex = programs.findIndex((p) => p.slug === currentSlug);
  const prev = currentIndex > 0 ? programs[currentIndex - 1] : null;
  const next = currentIndex < programs.length - 1 ? programs[currentIndex + 1] : null;

  return (
    <div className="bg-gray-100 py-10 border-t border-gray-200">
      {/* ✅ SAME WIDTH (unchanged) */}
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Reduced gap */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Previous */}
          {prev ? (
            <Link
              to={`/programs/details/${prev.slug}`}
              className="group p-5 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:border-secondary hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-2 text-secondary font-semibold text-xs mb-2">
                <ArrowLeft size={16} />
                PREVIOUS PROGRAM
              </div>

              <h4 className="text-base font-merriweather font-bold text-gray-900 group-hover:text-secondary transition">
                {prev.shortTitle}
              </h4>
            </Link>
          ) : (
            <div />
          )}

          {/* Next */}
          {next ? (
            <Link
              to={`/programs/details/${next.slug}`}
              className="group p-5 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:border-secondary hover:shadow-md transition-all text-right"
            >
              <div className="flex items-center justify-end gap-2 text-secondary font-semibold text-xs mb-2">
                NEXT PROGRAM
                <ArrowRight size={16} />
              </div>

              <h4 className="text-base font-merriweather font-bold text-gray-900 group-hover:text-secondary transition">
                {next.shortTitle}
              </h4>
            </Link>
          ) : (
            <div />
          )}

        </div>
      </div>
    </div>
  );
}

/* ── 404 Not Found ── */
function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="text-7xl mb-6">🌍</div>
      <h1 className="text-4xl font-merriweather font-bold text-gray-900 mb-4">
        Program Not Found
      </h1>
      <p className="text-gray-600 text-lg font-light mb-10 max-w-sm text-center">
        We couldn't find the program you're looking for.
      </p>
      <button
        onClick={() => navigate("/programs")}
        className="bg-secondary hover:bg-blue-900 hover-bounce text-white font-bold px-7 py-2.5 rounded-full shadow-lg shadow-secondary/20 transition-all active:scale-95 font-poppins"
      >
        ← Back to Programs
      </button>
    </div>
  );
}

/* ── Main Component ── */
export default function ProgramDetail() {
  const { slug } = useParams();
  const program = programs.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (program) {
      document.title = `${program.title} | Yuva Mitra`;
    }
  }, [slug, program]);

  if (!program) return <NotFound />;

  return (
    <div className="min-h-screen bg-gray-100" style={{ fontFamily: "'Inter', sans-serif" }}>
      <FontLink />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&family=Inter:wght@300;400;500;600;700&display=swap');
        
        .font-merriweather {
          font-family: 'Merriweather', serif;
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>

      <HeroSection program={program} />
      {/* <ImageSection program={program} /> */}
      <ContentSection program={program} />
      {/* <ObjectivesSection program={program} /> */}
      <ShareSection program={program} />
      <NavigationSection programs={programs} currentSlug={program.slug} />
      {/* <CommentsSection /> */}
    </div>
  );
}
