import React, { useState } from "react";

const stories = [
  {
    title: "A room for rural progress",
    tag: "Community Development",
    videoId: "amZWA9dJYpk",
  },
  {
    title: "Preserving livelihoods with dignity",
    tag: "Livelihoods",
    videoId: "7WbEbbMxzxo",
  },
  {
    title: "Women leading change in their villages",
    tag: "Women & Families",
    videoId: "VtzwzN-fvIQ",
  },
  {
    title: "Voices of resilience and hope",
    tag: "Grassroots Stories",
    videoId: "XnMq2HABtxw",
  },
];

export default function StoriesOfChangeSection() {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section className="relative overflow-hidden bg-white py-8">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[40%] -right-[10%] h-[40%] w-[40%] rounded-full bg-slate-50/50 blur-3xl mix-blend-multiply" />
      </div>

      <div className="relative mx-auto max-w-[1380px] px-6 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          {/* <span className="inline-block rounded-full bg-blue-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary backdrop-blur-sm font-inter mb-4">
            Stories From The Ground
          </span> */}
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-[32px] text-secondary font-bold font-poppins">
              Stories Of <span className="text-primary font-bold">Change</span>
            </h2>
            <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-primary to-accent" />
            {/* <p className="mt-6 text-slate-500 max-w-2xl mx-auto font-inter text-lg leading-relaxed">
              Witness the journey of transformation through the voices of those who have pioneered progress in their own communities with Yuva Mitra.
            </p> */}
          </div>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stories.map((story, index) => (
            <article
              key={story.videoId}
              onClick={() => setActiveVideo(story.videoId)}
              className="group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-blue-100 animate-[storyFadeUp_0.7s_ease-out_forwards]"
              style={{ animationDelay: `${index * 150}ms`, opacity: 0 }}
            >
              <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                <img
                  src={`https://img.youtube.com/vi/${story.videoId}/hqdefault.jpg`}
                  alt={story.title}
                  className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-100"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-md transition-transform duration-300 group-hover:scale-110 shadow-lg border border-white/30">
                    <svg className="h-6 w-6 text-white translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <div className="mb-4 flex items-center">
                    <span className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 transition-colors group-hover:bg-blue-50 group-hover:text-blue-700 font-inter">
                      {story.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold leading-tight text-secondary transition-colors group-hover:text-secondary font-poppins">
                    {story.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-500 font-inter">
                    Watch a short story of transformation from the communities Yuva Mitra supports
                  </p>
                </div>
                
                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-secodary transition-colors duration-300 group-hover:text-secondary font-inter">
                  Watch Video 
                  <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Video Modal Popup */}
      {activeVideo && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm transition-opacity"
          onClick={() => setActiveVideo(null)}
        >
          <div 
            className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-black shadow-2xl animate-in fade-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setActiveVideo(null)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors backdrop-blur-md"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="relative aspect-video w-full bg-black">
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${activeVideo}?autoplay=1&rel=0&modestbranding=1`}
                title="Video Player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes storyFadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
