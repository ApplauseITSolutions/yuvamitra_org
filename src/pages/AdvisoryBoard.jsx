import React, { useEffect, useRef, useState } from "react";
import AdvisoryBanner from "../components/layouts/Banners/AdvisoryBanner.jsx";
import member1 from "../assets/Images/AdvisoryBoard1.png";
import member2 from "../assets/Images/AdvisoryBoard2.png";
import member3 from "../assets/Images/AdvisoryBoard3.png";

/* ─── useInView hook ─── */
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

/* ─── Member Data ─── */
const members = [
  {
    id: 1,
    number: "01",
    name: "Mr. M.V. Ashok",
    image: member1,
    role: "Advisory Board Member",
    badge: "NABARD · Rural Dev.",
    domains: ["Rural Development", "Banking & Finance", "Grassroots Policy"],
    bio: [
      "Mr. M.V. Ashok, formerly holding the esteemed position of Chief General Manager at NABARD, brings a wealth of experience in the effective execution of rural development initiatives. His tenure included the leadership of State regional offices across Maharashtra and Jharkhand, and he held a pivotal role as a Board member of NABFINS. With a profound understanding of grassroots development, he also served as a District Development Manager in Kannur district, Kerala, and contributed as a faculty member at BIRD, Lucknow. Mr. Ashok’s expertise extends to the successful implementation of sustainable rural development programs, adding a diverse dimension to his accomplished career"
    ],
  },
  {
    id: 2,
    number: "02",
    name: "Ms. Judy Rodrigues",
    image: member2,
    role: "Advisory Board Member",
    badge: "HDFC · CSR · Social",
    domains: ["Financial Services", "CSR", "Legal & Credit"],
    bio: [
     "Ms. Judy Rodrigues holds a remarkable legacy of more than 35 years at HDFC Ltd. Her journey commenced within the legal team and progressed to encompass the management of diverse portfolios, ranging from the service centre to the credit hub. She further fortified her expertise through a three-year practice at the sessions court. Renowned among her peers for her approachability, willingness to assist, and commitment to social initiatives, Ms. Rodrigues has consistently made her mark. During her tenure at HDFC, she played a vital role within the CSR team, actively contributing to the organization’s endeavours in societal betterment. Recognized as an enabler of goodwill, those familiar with her can attest to her capability in uniting people and resources for the service of causes. Through her exemplary contributions, she serves as an inspiration for the upcoming generation, emphasizing the significance of growing not in isolation, but in harmony with society"
    ],
  },
  {
    id: 3,
    number: "03",
    name: "Mr. Sham Padekar",
    image: member3,
    role: "Advisory Board Member",
    badge: "Arts · Theatre · Akashwani",
    domains: ["Marathi Theatre", "Broadcasting", "Literature"],
    bio: [
      "Mr. Sham Padekar, having earned his B. Com degree in Nashik, stands as a dynamic individual engaged in the realms of Anchoring, Acting, and Directing. His contributions have reached diverse platforms such as Lokhitwadi Mandal, Akhil Bharatiya Maratha Natya Parishad, Sanskar Bharti, Kusumagraj Smarak, NAB, Sarda Udyog Samuha, and YCMOU. He has lent his expertise to the hosting of various singing programs and interviews at Nashik Akashwani Kendra. His talents extend to the theatrical domain, where he actively participates as an actor in Marathi plays and films. His reputation as a poet and writer is well established, as evidenced by his published works, along with his directorial achievements in the realm of plays. Notably, he was honored by the Akhil Bhartiya Marathi Natya Parishad, Mumbai, as the Best Anchor. His affiliation with Yuva Mitra has spanned a decade, attesting to his enduring commitment to the organization’s endeavours."
    ],
  },
];

/* Team Cards Themes */
const CARD_THEMES = [
  { bg: "bg-sky-50",    border: "border-sky-100",    accent: "bg-primary" },
  { bg: "bg-emerald-50", border: "border-emerald-100", accent: "bg-emerald-600" },
  { bg: "bg-sky-50",   border: "border-sky-100",   accent: "bg-primary" },
];

function TeamCard({ member, index }) {
  const [ref, inView] = useInView(0.1);
  const theme = CARD_THEMES[index % CARD_THEMES.length];

  return (
    <div
      ref={ref}
      className={`relative rounded-2xl overflow-hidden border ${theme.border} ${theme.bg} shadow-sm transition-all duration-700 hover:shadow-xl hover:-translate-y-1`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
      }}
    >
    
      <div className="p-4 md:p-10 flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center">
        {/* Image Container */}
        <div className="w-full md:w-[220px] flex-shrink-0 relative group">
          <div className="absolute -inset-2 bg-white/40 rounded-2xl blur-lg group-hover:bg-white/60 transition duration-500" />

          {/* On mobile: image + badge side by side in a row */}
          <div className="relative flex flex-row md:flex-col items-center gap-4 md:gap-0">
            <div className="w-24 sm:w-32 md:w-full flex-shrink-0 overflow-hidden rounded-xl bg-white shadow-md border border-black/5">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Name visible only on mobile, next to image */}
            <div className="flex flex-col gap-1 md:hidden">
              <h3 className="font-poppins font-bold text-secondary text-lg leading-tight">
                {member.name}
              </h3>
              <div className={`self-start px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white ${theme.accent}`}>
                {member.badge}
              </div>
            </div>
          </div>

          {/* Badge — desktop only */}
          <div className="mt-4 hidden md:flex justify-center">
            <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white ${theme.accent}`}>
              {member.badge}
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="flex-1 min-w-0">
          {/* Name — desktop only */}
          <div className="hidden md:flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <h3 className="font-poppins font-bold text-secondary text-xl md:text-2xl">
              {member.name}
            </h3>
            <span className="text-primary font-medium text-sm md:text-base">
              {member.headline}
            </span>
          </div>

          <div className="w-12 h-0.5 bg-slate-300 mb-4 md:mb-6" />

          <div className="space-y-3 text-[13px] sm:text-[14px] md:text-[15px] leading-relaxed text-black font-inter text-justify">
            {member.bio.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Highlights/Domains */}
          <div className="mt-4 md:mt-8 flex flex-wrap gap-2">
            {member.domains.map((domain) => (
              <span key={domain} className="px-3 py-1 bg-white/60 border border-black/5 rounded-lg text-[11px] font-semibold text-secondary">
                {domain}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdvisoryBoard() {
  const [ref, inView] = useInView(0.1);

  return (
    <div className="bg-[#f7fbff] min-h-screen font-inter pb-4">
      <AdvisoryBanner />

      <section className="max-w-[1380px] mx-auto px-6 lg:px-10 py-10 md:py-12">
        {/* Themed Header */}
        {/* */}

        <div className="space-y-6 md:space-y-16">
          {members.map((member, idx) => (
            <TeamCard key={member.id} member={member} index={idx} />
          ))}
        </div>
      </section>
    </div>
  );
}
