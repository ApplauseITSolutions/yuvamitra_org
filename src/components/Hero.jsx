import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import HeroBanner1 from "../assets/Images/hero1.jpg";
import HeroBanner3 from "../assets/Images/hero3.jpg";
import HeroBanner4 from "../assets/Images/hero4.jpg";

const slides = [
  {
    image: HeroBanner1,
    title: "Transforming Rural Lives",
    subtitle: "Transforming Rural Lives",
    description:
      "Building resilient communities through water conservation, sustainable livelihoods, health, and education.",
    buttonText: "Donate Now",
    accent: "bg-primary",
  },
  {
    image: HeroBanner3,
    title: "Empowering Communities, Creating Change",
    subtitle: "Empowering Communities, Creating Change.",
    description:
      "Working hand in hand with rural and tribal communities to build self-reliant and sustainable futures.",
    buttonText: "Donate Now",
    accent: "bg-primary",
  },
  {
    image: HeroBanner4,
    title: "From Villages to Lasting Impact",
    subtitle: "From Villages to Lasting Impact.",
    description:
      "Strengthening agriculture, women empowerment, water security, and rural development across communities.",
    buttonText: "Donate Now",
    accent: "bg-primary",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) =>
      prev === slides.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  return (
    <section className="relative h-[55vh] sm:h-[60vh] lg:h-[70vh] min-h-[380px] w-full overflow-hidden">
      
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[5000ms] ease-linear"
            style={{
              backgroundImage: `url(${slide.image})`,
              transform: index === current ? "scale(1)" : "scale(1.1)",
            }}
          />

          {/* ✅ Gradient Overlay (MAIN FIX) */}
          <div className="absolute inset-0 z-[1] 
            bg-gradient-to-r 
            from-black/70 via-black/50 to-black/20 
            sm:from-black/60 sm:via-black/40 sm:to-transparent"
          />

          {/* Content */}
          <div className="relative z-[2] h-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-12 flex items-center">
            <div className="max-w-2xl space-y-3 sm:space-y-5 text-center sm:text-left">

              {/* Title */}
              <h1 
                key={`title-${current}`}
                className="font-bold leading-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] animate-fade-in-up [animation-delay:200ms] font-poppins whitespace-nowrap"
                style={{ fontSize: "clamp(1.1rem, 3.5vw, 3.25rem)" }}
              >
                {slide.title.split(" ").map((word, i) => (
                  <span key={i} className={i === 1 ? "text-accent" : ""}>
                    {word}{" "}
                  </span>
                ))}
              </h1>

              {/* Description */}
              <p 
                key={`desc-${current}`}
                className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 max-w-xl mx-auto sm:mx-0 animate-fade-in-up [animation-delay:400ms] font-inter"
              >
                {slide.description}
              </p>

              {/* Buttons */}
              <div 
                key={`btns-${current}`}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 justify-center sm:justify-start animate-fade-in-up [animation-delay:600ms] font-poppins"
              >
                
                {/* Primary Button */}
                <Link
                  to="/donate"
                  className={`${slide.accent} hover:bg-red-700 hover-bounce text-white px-7 py-2.5 text-center rounded-full font-bold shadow-lg shadow-primary/20 transition-all active:scale-95 font-poppins w-fit mx-auto sm:mx-0`}
                >
                  {slide.buttonText}
                </Link>

                {/* Secondary Button */}
           
              </div>

              {/* Navigation Arrows Grouped with Content */}
            <div className="flex items-center gap-6 py-4 pt-6 justify-center sm:justify-start animate-fade-in-up [animation-delay:800ms]">
  
  <div className="flex gap-3">
    <button
      onClick={(e) => { e.preventDefault(); prevSlide(); }}
      className="w-10 h-10 rounded-full backdrop-blur-md text-white flex items-center justify-center hover:bg-primary transition-all shadow-lg"
    >
      <ChevronLeft size={20} strokeWidth={2.5} />
    </button>

    <button
      onClick={(e) => { e.preventDefault(); nextSlide(); }}
      className="w-10 h-10 rounded-full backdrop-blur-md text-white flex items-center justify-center hover:bg-primary transition-all shadow-lg"
    >
      <ChevronRight size={20} strokeWidth={2.5} />
    </button>
  </div>
</div>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
  {slides.map((_, i) => (
    <button
      key={i}
      onClick={() => setCurrent(i)}
     className={`h-2 rounded-full transition-all duration-300 ${
  i === current
    ? "w-8 bg-accent shadow-md"
    : "w-2 bg-white border border-white/80 shadow-sm"
}`}
    />
  ))}
</div>

      {/* Indicators in Center Bottom
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 transition-all duration-300 rounded-full ${
              i === current ? "w-8 bg-accent" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div> */}
    </section>
  );
}