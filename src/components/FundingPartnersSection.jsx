import React from "react";

const partnerLogoModules = import.meta.glob(
  "../assets/Images/Partners-logos/*.{png,jpg,jpeg,webp,svg}",
  { eager: true, import: "default" }
);

const logoZoomMap = {
  "1": 1.45, "2": 1.45, "3": 1.4, "4": 1.4,
  "5": 1.45, "6": 1.45, "7": 1.42, "8": 1.42,
  "9": 1.4, "10": 1.42, "11": 1.42, "12": 1.45,
  "13": 1.45, "ATECF": 1.38, "BAJAJ-FINSERV": 1.28,
  "BAJAJ": 1.35, "CGF": 1.38, "ARGHYAM": 1.28,
  "BIRD": 1.28, "GIZ": 1.38, "GLENMARK": 1.32,
  "HT-PF": 1.34, "IIT": 1.3, "IRMA": 1.3,
  "KSB": 1.24, "LT": 1.35, "MAHATMA-PHULE": 1.26,
  "MVP": 1.28, "NABARD": 1.3, "RCT": 1.28,
  "SUKRUT": 1.28, "TATA-AIA": 1.3, "TATA-AUTO": 1.3,
  "TSS": 1.28, "WE-SCHOOL-1": 1.26,
  "WESTERN-SYDNEY": 1.22, "tata-trusts": 1.26,
};

const partnerLogos = Object.entries(partnerLogoModules)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([path, src]) => ({
    src,
    id: path.split("/").pop()?.replace(/\.[^.]+$/, "") || "logo",
    name: path.split("/").pop()?.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ") || "Partner",
  }));

const knowledgePartnerIds = new Set([
  "ARGHYAM", "BIRD", "IIT", "IRMA", "MAHATMA-PHULE",
  "MVP", "SUKRUT", "TSS", "WE-SCHOOL-1", "WESTERN-SYDNEY",
]);

const fundingPartners = partnerLogos.filter((l) => !knowledgePartnerIds.has(l.id));
const knowledgePartners = partnerLogos.filter((l) => knowledgePartnerIds.has(l.id));

function VerticalMarquee({ items, direction = "up", speed = "40s" }) {
  return (
    <div className="overflow-hidden relative h-[400px] sm:h-[500px] md:h-[600px] w-full py-2 mask-gradient-v">
      <div
        className={`flex flex-col gap-3 md:gap-6 ${direction === "up" ? "animate-scroll-up" : "animate-scroll-down"}`}
        style={{ animationDuration: speed }}
      >
        {[...items, ...items].map((logo, index) => (
          <div
            key={index}
            className="group flex items-center justify-center w-full h-[90px] sm:h-[110px] md:h-[140px] p-3 sm:p-4 md:p-6 transition-all duration-500"
          >
            <img
              src={logo.src}
              alt={logo.name}
              className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
              style={{ transform: `scale(${logoZoomMap[logo.id] ?? 1.2})` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}


export default function FundingPartnersSection() {
  // Split each category into columns
  const fundingCol1 = fundingPartners.filter((_, i) => i % 3 === 0);
  const fundingCol2 = fundingPartners.filter((_, i) => i % 3 === 1);
  const fundingCol3 = fundingPartners.filter((_, i) => i % 3 === 2);
  
  const knowledgeCol1 = knowledgePartners.filter((_, i) => i % 2 === 0);
  const knowledgeCol2 = knowledgePartners.filter((_, i) => i % 2 === 1);

  return (
    <section className="py-10 md:py-12 bg-white overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6">
        
        {/* Centered Heading */}
        <div className="text-center mb-16">
          <h2 className="text-[32px] font-black font-poppins text-secondary tracking-tight">
            Our Partners <span className="text-primary"> In Change</span> 
          </h2>
          <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-primary to-accent" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12">
          
          {/* Funding Partners Block */}
          <div className="relative rounded-[2rem] bg-[#f8f9fa] p-5 sm:p-8 md:p-12 border border-slate-100">
            <h3 className="text-center text-2xl md:text-[32px] font-bold text-secondary mb-2 font-poppins">
              Funding Partners
            </h3>
            <div className="mx-auto mb-6 md:mb-8 h-1 w-24 rounded-full bg-gradient-to-r from-primary to-accent" />
            <div className="relative grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 h-[420px] sm:h-[530px] md:h-[650px] items-start">
              <VerticalMarquee items={fundingCol1} direction="up" speed="45s" />
              <VerticalMarquee items={fundingCol2} direction="up" speed="55s" />
              <div className="hidden md:block">
                <VerticalMarquee items={fundingCol3} direction="up" speed="50s" />
              </div>
              
              {/* Fading Overlays for this block */}
              <div className="absolute top-0 left-0 w-full h-16 md:h-24 bg-gradient-to-b from-[#f0f7ff] to-transparent z-10 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-full h-16 md:h-24 bg-gradient-to-t from-[#f0f7ff] to-transparent z-10 pointer-events-none" />
            </div>
          </div>

          {/* Knowledge Partners Block */}
          <div className="relative rounded-[2rem] bg-[#fff5f5] p-5 sm:p-8 md:p-12">
            <h3 className="text-center text-2xl md:text-[32px] font-bold text-primary mb-2 font-poppins">
              Knowledge Partners
            </h3>
            <div className="mx-auto mb-6 md:mb-8 h-1 w-24 rounded-full bg-gradient-to-r from-primary to-accent" />
            <div className="relative grid grid-cols-2 gap-3 md:gap-6 h-[420px] sm:h-[530px] md:h-[650px] items-start">
              <VerticalMarquee items={knowledgeCol1} direction="up" speed="28s" />
              <VerticalMarquee items={knowledgeCol2} direction="up" speed="32s" />
              
              {/* Fading Overlays for this block */}
              <div className="absolute top-0 left-0 w-full h-16 md:h-24 bg-gradient-to-b from-[#fff5f5] to-transparent z-10 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-full h-16 md:h-24 bg-gradient-to-t from-[#fff5f5] to-transparent z-10 pointer-events-none" />
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .mask-gradient-v {
          mask-image: linear-gradient(to bottom, transparent, black 8%, black 92%, transparent);
          -webkit-mask-image: linear-gradient(to bottom, transparent, black 8%, black 92%, transparent);
        }
      `}</style>
    </section>
  );
}