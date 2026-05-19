import React, { useEffect, useRef, useState } from "react";

const sdgItems = [
  { number: "1", title:"First Image" , image:"/assets/Images/Sdg/E-WEB-Goal-01.png" },
  {number:"2" , title:"Second Image" ,image:"assets/Images/Sdg/E-WEB-Goal-02.png"},
  {number:"3",title:"Third Image",image:"assets/Images/Sdg/E-WEB-Goal-03.png"}, 
  {number:"4",title:"Fourth Image" , image:"assets/Images/Sdg/E-WEB-Goal-04.png"},
  {number:"5",title:"Fifth Image",image:"assets/Images/Sdg/E-WEB-Goal-05.png"},
  {number:"6",title:"Fifth Image",image:"assets/Images/Sdg/E-WEB-Goal-06.png"},
  { number: "8", title: "Decent Work And Economic Growth", image: "/assets/Images/Sdg/E-WEB-Goal-08.png" },
  { number: "9", title: "Industry, Innovation And Infrastructure", image: "/assets/Images/Sdg/E-WEB-Goal-09.png" },
  { number: "10", title: "Reduced Inequalities", image: "/assets/Images/Sdg/E-WEB-Goal-10.png" },
  { number: "13", title: "Climate Action", image: "/assets/Images/Sdg/E-WEB-Goal-13.png" },
  { number: "15", title: "Life On Land", image: "/assets/Images/Sdg/E-WEB-Goal-15.png" },
  { number: "16", title: "Peace, Justice And Strong Institutions", image: "/assets/Images/Sdg/E-WEB-Goal-16.png" },
];

export default function SdgCommitmentSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-[#fffafc] to-[#f6fbff] py-10 md:py-12"
    >
      {/* Background Ambient Orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-16 top-10 h-64 w-64 rounded-full bg-[#ffdce8] blur-[80px] opacity-60" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#d8ebff] blur-[90px] opacity-70" />
      </div>

      <div className="relative mx-auto max-w-[1380px] px-6 lg:px-12">
        {/* Header Section */}
        <div className="mx-auto max-w-3xl text-center mb-12">
         <h2 className="text-[32px] text-secondary font-bold font-poppins">
            Our Commitment To<span className="text-primary font-bold"> SDG's</span>
          </h2>
          <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-primary to-accent" />
        </div>

        {/* STATIC GRID OF CARDS - IMAGES ONLY */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-10">
          {sdgItems.map((item, i) => (
            <div 
              key={item.number} 
              className={`group relative flex flex-col items-center justify-center transition-all duration-700 transform ${
                isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-90"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="w-full aspect-square flex items-center justify-center transition-all duration-500 relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.1)] transition-transform duration-500 group-hover:scale-[1.15] animate-float-slow"
                  style={{ animationDelay: `${i * 300}ms` }}
                />
              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-float-slow {
          animation: floatSlow 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}