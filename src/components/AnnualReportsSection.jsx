import { useState } from "react";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

import cover7 from "../assets/Images/pdfs/pdf7.png";
import cover1 from "../assets/Images/pdfs/pdf1.png";
import cover2 from "../assets/Images/pdfs/pdf2.png";
import cover3 from "../assets/Images/pdfs/pdf3.png";
import cover4 from "../assets/Images/pdfs/pdf4.png";
import cover5 from "../assets/Images/pdfs/pdf5.png";

// Local PDF — served from src/assets, Vite will bundle it
import pdf2425 from "../assets/Images/pdfs/Annual Report 2024-2025-1.pdf";
import pdf2 from "../assets/Images/pdfs/YUVA-MITRA-ANNUAL-REPORT-2021-22_compressed.pdf";

// Reports ordered newest → oldest
const reports = [
  {
    year: "2024–25",
    title: "Annual Report 2024–25",
    url: pdf2425,
    cover: cover7,
    isFlipBook: false,
    color: "from-primary to-red-700",
  },
  {
    year: "2023–24",
    title: "Annual Report 2023–24",
    url: "https://yuvamitra.org/wp-content/uploads/2024/09/Yuva-Mitra-Annual-Report-2023-24.pdf",
    cover: cover2,
    isFlipBook: false,
    color: "from-secondary to-blue-800",
  },
  {
    year: "2022–23",
    title: "Annual Report 2022–23",
    url: "https://yuvamitra.org/wp-content/uploads/2024/06/Annual-Report-2022-2023_compressed.pdf",
    cover: cover3,
    isFlipBook: false,
    color: "from-emerald-600 to-emerald-800",
  },
  {
    year: "2021–22",
    title: "Annual Report 2021–22",
    url: pdf2,
    cover: cover4,
    isFlipBook: false,
    color: "from-amber-500 to-amber-700",
  },
  {
    year: "2019–20",
    title: "Annual Report 2019–20",
    url: "https://yuvamitra.org/wp-content/uploads/2024/06/Yuva-Mitra-Annual-Report-2019-20_compressed.pdf",
    cover: cover5,
    isFlipBook: false,
    color: "from-teal-600 to-teal-800",
  },
];

function ReportCard({ report }) {
  return (
    <a
      href={report.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white border border-slate-100"
      aria-label={`Open ${report.title}`}
    >
      {/* Cover image — 3:4 portrait ratio */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "3/4" }}>
        <img
          src={report.cover}
          alt={`${report.title} cover`}
          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/55 transition-all duration-300 flex items-center justify-center z-10">
          <span className="opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2 bg-white text-slate-900 font-bold px-5 py-2.5 rounded-full shadow-xl text-sm font-poppins">
            <ExternalLink size={15} />
            {report.isFlipBook ? "Open Flip Book" : "Open PDF"}
          </span>
        </div>

        {/* Year badge */}
        <div className={`absolute top-2 right-3 z-20 px-3 py-1 rounded-full text-white text-xs font-bold font-poppins shadow-md bg-gradient-to-r ${report.color}`}>
          {report.year}
        </div>

        {/* Interactive badge for flip-book */}
        {report.isFlipBook && (
          <div className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-full bg-accent text-white text-[10px] font-bold font-poppins shadow-md">
            Interactive
          </div>
        )}
      </div>

      {/* Card footer */}
      <div className="px-4 py-3 flex items-center justify-between bg-white">
        <div>
          <p className="text-sm font-bold text-slate-800 font-poppins leading-tight">{report.title}</p>
          <p className="text-xs text-slate-400 mt-0.5 font-inter">
            {report.isFlipBook ? "Interactive Flip Book" : "PDF Document"}
          </p>
        </div>
        <ExternalLink size={16} className="text-slate-300 group-hover:text-primary transition-colors flex-shrink-0 ml-2" />
      </div>
    </a>
  );
}

export default function AnnualReportsSection() {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3;

  const canPrev = startIndex > 0;
  const canNext = startIndex + visibleCount < reports.length;

  const prev = () => canPrev && setStartIndex((i) => i - 1);
  const next = () => canNext && setStartIndex((i) => i + 1);

  return (
    <section className="py-8 md:py-12 bg-[#f8f9fb] overflow-hidden">
      <div className="max-w-[1380px] mx-auto px-6 lg:px-12">

        {/* Heading */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-[32px] font-bold font-poppins text-secondary leading-tight">
            Our Annual <span className="text-primary">Reports</span>
          </h2>
          {/* <p className="mt-3 text-slate-500 text-base font-inter max-w-xl mx-auto">
            Explore our journey of impact — transparency and accountability, year by year.
          </p> */}
          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-primary to-accent" />
        </div>

        {/* Desktop: 3-up sliding carousel */}
        <div className="hidden md:block">
          <div className="grid grid-cols-3 gap-6">
            {reports.slice(startIndex, startIndex + visibleCount).map((report) => (
              <ReportCard key={report.url} report={report} />
            ))}
          </div>

          {reports.length > visibleCount && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={prev}
                disabled={!canPrev}
                className="p-3 rounded-full bg-white shadow-md text-primary hover:bg-primary hover:text-white transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Previous"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex items-center gap-2">
                {reports.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setStartIndex(Math.min(i, reports.length - visibleCount))}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i >= startIndex && i < startIndex + visibleCount
                        ? "w-6 bg-primary"
                        : "w-2 bg-slate-300"
                    }`}
                    aria-label={`Report ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                disabled={!canNext}
                className="p-3 rounded-full bg-white shadow-md text-primary hover:bg-primary hover:text-white transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Next"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Mobile: horizontal swipe scroll */}
        <div className="md:hidden">
          <div
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {reports.map((report) => (
              <div key={report.url} className="flex-none w-[72vw] max-w-[280px] snap-start">
                <ReportCard report={report} />
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-slate-400 mt-3 font-inter">Swipe to see more →</p>
        </div>

      </div>
    </section>
  );
}
