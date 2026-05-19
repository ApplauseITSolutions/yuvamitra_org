

function VMCard({ icon, title, text, accentClass }) {
  return (
    <div className="relative bg-white rounded-2xl p-8 border border-slate-100 shadow-sm overflow-hidden hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
      <div className={`absolute top-0 left-0 right-0 h-1 ${accentClass}`} />
      <div className="mb-6">
  <div className="w-16 h-16 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-slate-100 text-3xl md:text-4xl shadow-sm">
    {icon}
  </div>
</div>
      <h3 className="font-serif text-xl font-bold text-[#0f2847] mb-3">{title}</h3>
      <p className="text-sm leading-relaxed text-slate-500">{text}</p>
    </div>
  );
}

export default function OurVisionMission() {
    return (
          <section className="py-20 md:py-28 bg-[#f7fbff]">
          <div className="mx-auto max-w-[1380px] px-6 lg:px-12">
            {/* Header */}
            <div className="text-center mb-14">
              <p className="text-[0.72rem] font-bold tracking-[0.28em] uppercase text-secondary">
                Our Purpose
              </p>
              <h2
                className="mt-3 text-3xl md:text-5xl font-bold text-secondary"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Vision, Mission & Work Area
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <VMCard
                icon="👁️"
                title="Our Vision"
                accentClass="bg-gradient-to-r from-[#2a6aad] to-sky-400"
                text="Yuva Mitra envisions a developmental process for the alienated sections of society, where people are at the core of its decision making and action, beyond the model of welfare schemes."
              />
              <VMCard
                icon="🎯"
                title="Our Mission"
                accentClass="bg-gradient-to-r from-emerald-600 to-emerald-400"
                text="To ensure socio-economic development of people living in rural areas especially from the alienated section of society by using Land-Water Development and Management, Agri, and Allied livelihood activities involving applied education through community-based institutions keeping people at the core of decision making and action."
              />
              <VMCard
                icon="🗺️"
                title="Our Work Area"
                accentClass="bg-gradient-to-r from-amber-500 to-amber-300"
                text="To actualize our vision we work in the areas of Maharashtra, Punjab and Himachal Pradesh through various development programs. We also work in 12 states of our country in coordination with other social development organizations."
              />
            </div>
          </div>
        </section>
    )
}