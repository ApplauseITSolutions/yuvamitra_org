import React from "react";
import { motion as Motion } from "framer-motion";
import TrusteesBanner from "../components/layouts/Banners/TrusteesBanner.jsx";

import somduttImg from "../assets/Images/Trustees/1.png";
import manabImg from "../assets/Images/Trustees/2.png";
import manishaImg from "../assets/Images/Trustees/3.png";
import img4 from "../assets/Images/Trustees/4.png";
import img5 from "../assets/Images/Trustees/5.png";
import img6 from "../assets/Images/Trustees/6.png";
import img7 from "../assets/Images/Trustees/userProfile.webp";

const trustees = [
  {
    id: 1,
    name: "CA Somdutt Lad",
    image: somduttImg,
    bio: "Mr. Somdutta Lad, a Chartered Accountant, commenced his career at HDFC Ltd. Yet, his commitment to rural India led him to join Yuva Mitra. There, he contributed significantly to projects spanning traditional irrigation revitalization, livelihood advancement, and Health & Nutrition Programs. A key player in cultivating Farmers Producer Organizations, he later founded Nutrisoul Foods & Services Pvt. Ltd., embodying the ethos of “Anna He Purna Brahma.” Under his leadership, the “Millet era” brand emerged, showcasing his steadfast commitment to organizational growth",
    tags: ["Finance", "Agriculture"],
  },
  {
    id: 2,
    name: "Mr. Manab Bose",
    image: manabImg,
    bio: "Mr. Manab Bose, a dedicated professor at IIM Udaipur, holds a Master’s degree in English from Jadavpur University. With diverse roles in GE, Colgate Palmolive India, and Bharat Petroleum, he co-founded the Parikrma Humanity Foundation, providing English medium education to over 2000 underprivileged students. His contributions to Yuva Mitra include advancing the Goat-Based Women Livelihood Program. A prolific researcher, his works, including “Public Leadership in the Public Sector,” are published in clinical journals. His memberships in international associations focus on organizational psychodynamics and psychoanalysis",
    tags: ["Education", "Research"],
  },
  {
    id: 3,
    name: "Mrs. Manisha Pote",
    image: manishaImg,
    bio: "Mrs. Manisha, an accomplished professional with MA and MSW degrees, served as a college lecturer at the College of Social Work in Nashik for a year. Since 2001, she’s been an integral part of Yuva Mitra, contributing as Secretary and Program Director. During her tenure, she spearheaded impactful initiatives like Arogya Mitra and Sukanya, focusing on health and education for adolescent girls. Specializing in gender-based equality and women’s empowerment, she amplifies her impact as a master trainer in these vital fields. Her enduring commitment and multifaceted expertise significantly shape the organization’s initiatives for positive societal change",
    tags: ["Women Empowerment", "Health"],
  },
  {
    id: 4,
    name: "PROF. DR. SAMPAT KALE",
    image: img4,
    bio: "Prof. Dr. Sampat, a distinguished development sociologist with a Ph.D. from the University of Pune, boasts over two decades in the sector and twelve years in academia. His impressive record includes eight books, three documentaries, and numerous articles on subjects like nomadic tribes, migration, and farmers' suicides. A member of esteemed societies, including the Indian Sociological Society, he presently serves as a Senior Assistant Professor at the Tata Institute of Social Sciences, Tuljapur Campus. His role extends to being the Programme Convener for the MA/MSc in Sustainable Livelihoods and Natural Resources Governance program",
    tags: ["Finance", "Agriculture"],
  },
  {
    id: 5,
    name: "Mrs.Madhusha Malpathak",
    image: img5,
    bio: "Mrs. Madhusha is a B.com graduate and has worked in a commercial bank in Nashik. She is associated with Yuva Mitra for 18 years",
    tags: ["Education", "Research"],
  },
  {
    id: 6,
    name: "DR. ROHIT JAIN",
    image: img6,
    bio: "Mr. Jain, an M.A. in Social Work, is an esteemed Associate Professor at Tata Institute of Social Science (TISS), Tuljapur Campus. Holding the pivotal role of Program Convener for the MA/M.Sc. program in Development Policy, Planning, and Practice, he brings a wealth of expertise. His earlier tenure as Program Coordinator for the UNICEF-sponsored PGDWASH program underscores his commitment to impactful initiatives at the intersection of academia and practical development. With a robust background, he significantly contributes to shaping the discourse and application of development policies and practices",
    tags: ["Women Empowerment", "Health"],
  },
  {
    id: 7,
    name: "Mr. Prashant Virkar",
    image: img7,
    bio: "Mr. Prashant Virkar is working with a multinational company in Nashik and has been associated with Yuva Mitra as a trustee for 5 years.",
    tags: ["Corporate", "Governance"],
  },
];

// Keep the same pastel palette used on AdvisoryBoard so Trustees matches that page.
const CARD_THEMES = [
  { bg: "bg-sky-50",    border: "border-sky-100",    accent: "bg-primary" },
  { bg: "bg-emerald-50", border: "border-emerald-100", accent: "bg-emerald-600" },
  { bg: "bg-sky-50",   border: "border-sky-100",   accent: "bg-primary" },
];

function TrusteeRowCard({ trustee, index }) {
  const theme = CARD_THEMES[index % CARD_THEMES.length];

  return (
    <Motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -4, scale: 1.01 }}
      className={`group relative rounded-xl md:rounded-2xl overflow-hidden border ${theme.border} ${theme.bg} shadow-sm transition-transform duration-300 hover:shadow-md`}
    >
      <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-start">
        {/* Image */}
        <div className="w-[160px] flex-shrink-0">
          <div className="w-[160px] aspect-square overflow-hidden rounded-xl bg-white/70 ring-1 ring-black/10 transition-transform duration-300 group-hover:scale-[1.02]">
            {trustee.image ? (
              <img
                src={trustee.image}
                alt={trustee.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-slate-100">
                <svg viewBox="0 0 80 80" className="w-20 h-20 text-slate-300" fill="currentColor">
                  <circle cx="40" cy="30" r="18" />
                  <ellipse cx="40" cy="72" rx="28" ry="18" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Text */}
        <div className="flex-1">
          <h3 className="font-poppins font-semibold text-base sm:text-lg text-black">
            {trustee.name}
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-black font-inter text-left md:text-justify">
            {trustee.bio}
          </p>
        </div>
      </div>
    </Motion.div>
  );
}


export default function Trustees() {
  return (
    <main className="bg-white min-h-screen font-inter">
      <TrusteesBanner />

      <section className="max-w-[1380px] mx-auto px-6 lg:px-12 py-10 md:py-12">
        <div className="space-y-6 md:space-y-8">
          {trustees.map((t, idx) => (
            <TrusteeRowCard key={t.id} trustee={t} index={idx} />
          ))}
        </div>
      </section>
    </main>
  );
}
