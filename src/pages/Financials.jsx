import { useState } from "react";
import FinancialsBanner from "../components/layouts/Banners/FinancialsBanner.jsx";

const financialData = [
  {
    id: 1,
    title: "Financial Year 2023-2024",
    pdfs: [
      { id: 1, title: "1 April 2023 - 30 June 2023",   url: "https://yuvamitra.org/wp-content/uploads/2024/07/1-Fcra-Fund-Received-for-the-period-of-1st-April-2023-to-30th-June-2023.pdf" },
      { id: 2, title: "1 July 2023 to 30 Sept 2023",   url: "https://yuvamitra.org/wp-content/uploads/2024/07/2-Fcra-Fund-Received-for-the-period-of-1st-July-2023-to-30th-September-2023.pdf" },
      { id: 3, title: "1 Oct 2023 to 31 Dec 2023",     url: "https://yuvamitra.org/wp-content/uploads/2024/07/3-Fcra-Fund-Received-for-the-period-of-1st-October-2023-to-31st-December-2023.pdf" },
      { id: 4, title: "1 Jan 2024 to 31 March 2024",   url: "https://yuvamitra.org/wp-content/uploads/2024/07/4-Fcra-Fund-Received-for-the-period-of-1st-January-2024-to-31st-March-2024.pdf" },
    ],
  },
  {
    id: 2,
    title: "Financial Year 2022-2023",
    pdfs: [
      { id: 1, title: "1 April 2022 - 30 June 2022",   url: "https://yuvamitra.org/wp-content/uploads/2024/07/1-Fcra-Fund-Received-for-the-period-of-1st-April-2022-to-30th-June-2022.pdf" },
      { id: 2, title: "1 July 2022 to 30 Sept 2022",   url: "https://yuvamitra.org/wp-content/uploads/2024/07/2-Fcra-Fund-Received-for-the-period-of-1st-July-2022-to-30th-September-2022.pdf" },
      { id: 3, title: "1 Oct 2022 to 31 Dec 2022",     url: "https://yuvamitra.org/wp-content/uploads/2024/07/3-Fcra-Fund-Received-for-the-period-of-1st-October-2022-to-31st-December-2022.pdf" },
      { id: 4, title: "1 Jan 2023 to 31 March 2023",   url: "https://yuvamitra.org/wp-content/uploads/2024/07/4-Fcra-Fund-Received-for-the-period-of-1st-January-2023-to-31st-March-2023.pdf" },
    ],
    balanceSheet: {
      subtitle: "1 April 2022 to 31 March 2023",
      url: "https://yuvamitra.org/wp-content/uploads/2024/07/FCRA-Balance-Sheet-April-2022-to-March-2023.pdf",
    },
  },
  {
    id: 3,
    title: "Financial Year 2021-2022",
    pdfs: [
      { id: 1, title: "1 April 2021 - 30 June 2021",   url: "https://yuvamitra.org/wp-content/uploads/2024/07/1-Fcra-Fund-Received-for-the-period-of-1st-April-2021-to-30th-June-2021.pdf" },
      { id: 2, title: "1 July 2021 to 30 Sept 2021",   url: "https://yuvamitra.org/wp-content/uploads/2024/07/2-Fcra-Fund-Received-for-the-period-of-1st-June-2021-to-30th-September-2021.pdf" },
      { id: 3, title: "1 Oct 2021 to 31 Dec 2021",     url: "https://yuvamitra.org/wp-content/uploads/2024/07/3-Fcra-Fund-Received-for-the-period-of-1st-October-2021-to-31st-December-2021.pdf" },
      { id: 4, title: "1 Jan 2022 to 31 March 2022",   url: "https://yuvamitra.org/wp-content/uploads/2024/07/4-Fcra-Fund-Received-for-the-period-of-1st-January-2022-to-31st-March-2022.pdf" },
    ],
    balanceSheet: {
      subtitle: "1 April 2021 to 31 March 2022",
      url: "https://yuvamitra.org/wp-content/uploads/2024/07/FCRA-Balance-Sheet-April-2021-to-March-2022.pdf",
    },
  },
  {
    id: 4,
    title: "Financial Year 2020-2021",
    pdfs: [
      { id: 1, title: "1 April 2020 - 30 June 2020",   url: "https://yuvamitra.org/wp-content/uploads/2024/07/1-Fcra-Fund-Received-for-the-period-of-1st-April-2020-to-30th-June-2020.pdf" },
      { id: 2, title: "1 July 2020 to 30 Sept 2020",   url: "https://yuvamitra.org/wp-content/uploads/2024/07/2-Fcra-Fund-Received-for-the-period-of-1st-July-2020-to-30th-September-2020.pdf" },
      { id: 3, title: "1 Oct 2020 to 31 Dec 2020",     url: "https://yuvamitra.org/wp-content/uploads/2024/07/2-FCRA-Fund-Received-for-the-Period-of-1st-October-2019-to-31st-December-2019.pdf" },
      { id: 4, title: "1 Jan 2021 to 31 March 2021",   url: "https://yuvamitra.org/wp-content/uploads/2024/07/4-Fcra-Fund-Received-for-the-period-of-1st-January-2021-to-31st-March-2021.pdf" },
    ],
    balanceSheet: {
      subtitle: "1 April 2019 to 31 March 2020",
      url: "https://yuvamitra.org/wp-content/uploads/2024/07/FCRA-Balance-Sheet-April-2019-to-March-2020.pdf",
    },
  },
  {
    id: 5,
    title: "Financial Year 2019-2020",
    pdfs: [
      { id: 1, title: "1 April 2019 - 30 June 2019",   url: "https://yuvamitra.org/wp-content/uploads/2024/07/4-FCRA-Fund-Received-for-the-Period-of-1st-April-2019-to-30th-June-2019.pdf" },
      { id: 2, title: "1 July 2019 to 30 Sept 2019",   url: "https://yuvamitra.org/wp-content/uploads/2024/07/3-FCRA-Fund-Received-for-the-Period-of-1st-July-2019-to-30th-September-2019.pdf" },
      { id: 3, title: "1 Oct 2019 to 31 Dec 2019",     url: "https://yuvamitra.org/wp-content/uploads/2024/07/2-FCRA-Fund-Received-for-the-Period-of-1st-October-2019-to-31st-December-2019.pdf" },
      { id: 4, title: "1 Jan 2020 to 31 March 2020",   url: "https://yuvamitra.org/wp-content/uploads/2024/07/1-FCRA-Fund-Received-for-the-Period-of-1st-January-2020-to-31st-March-2020.pdf" },
    ],
    balanceSheet: {
      subtitle: "1 April 2018 to 31 March 2019",
      url: "https://yuvamitra.org/wp-content/uploads/2024/07/FCRA-Balance-Sheet-April-2019-to-March-2020.pdf",
    },
  },
  {
    id: 6,
    title: "Financial Year 2018-2019",
    pdfs: [
      { id: 1, title: "1 April 2018 - 30 June 2018",   url: "https://yuvamitra.org/wp-content/uploads/2024/07/8-FCRA-Fund-Received-for-the-Period-of-1st-April-2018-to-30th-June-2018.pdf" },
      { id: 2, title: "1 July 2018 to 30 Sept 2018",   url: "https://yuvamitra.org/wp-content/uploads/2024/07/7-FCRA-Fund-Received-for-the-Period-of-1st-July-2018-to-30th-September-2018.pdf" },
      { id: 3, title: "1 Oct 2018 to 31 Dec 2018",     url: "https://yuvamitra.org/wp-content/uploads/2024/07/6-FCRA-Fund-Received-for-the-Period-of-1st-october-2018-to-31st-December-2018.pdf" },
      { id: 4, title: "1 Jan 2019 to 31 March 2019",   url: "https://yuvamitra.org/wp-content/uploads/2024/07/5-FCRA-Fund-Received-for-the-Period-of-1st-Janaury-2019-to-31st-March-2019.pdf" },
    ],
    balanceSheet: {
      subtitle: "1 April 2018 to 31 March 2019",
      url: "https://yuvamitra.org/wp-content/uploads/2024/07/FCRA-Balance-Sheet-April-2018-to-March-2019.pdf",
    },
  },
  {
    id: 7,
    title: "Financial Year 2017-2018",
    pdfs: [
      { id: 1, title: "1 April 2017 - 30 June 2017",   url: "https://yuvamitra.org/wp-content/uploads/2024/07/12-FCRA-Fund-Received-for-the-Period-of-1st-April-2017-to-30th-June-2017.pdf" },
      { id: 2, title: "1 July 2017 to 30 Sept 2017",   url: "https://yuvamitra.org/wp-content/uploads/2024/07/11-FCRA-Fund-Received-for-the-Period-of-1st-July-2017-to-30th-September-2017.pdf" },
      { id: 3, title: "1 Oct 2017 to 31 Dec 2017",     url: "https://yuvamitra.org/wp-content/uploads/2024/07/10-FCRA-Fund-Received-for-the-Period-of-1st-october-2017-to-31st-December-2017.pdf" },
      { id: 4, title: "1 Jan 2018 to 31 March 2018",   url: "https://yuvamitra.org/wp-content/uploads/2024/07/9-FCRA-Fund-Received-for-the-Period-of-1st-Janaury-2018-to-31st-March-2018.pdf" },
    ],
    balanceSheet: {
      subtitle: "1 April 2017 to 31 March 2018",
      url: "https://yuvamitra.org/wp-content/uploads/2024/07/FCRA-Balance-Sheet-April-2017-to-March-2018.pdf",
    },
  },
  {
    id: 8,
    title: "Financial Year 2016-2017",
    pdfs: [
      { id: 1, title: "1 April 2016 - 30 June 2016",   url: "https://yuvamitra.org/wp-content/uploads/2024/07/16-FCRA-Fund-Received-for-the-Period-of-1st-April-2016-to-30th-June-2016.pdf015-to-30th-June-2015.pdf" },
      { id: 2, title: "1 July 2016 to 30 Sept 2016",   url: "https://yuvamitra.org/wp-content/uploads/2024/07/15-FCRA-Fund-Received-for-the-Period-of-1st-July-2016-to-30th-September-2016.pdf" },
      { id: 3, title: "1 Oct 2016 to 31 Dec 2016",     url: "https://yuvamitra.org/wp-content/uploads/2024/07/14-FCRA-Fund-Received-for-the-Period-of-1st-october-2016-to-31st-December-2016.pdf" },
      { id: 4, title: "1 Jan 2017 to 31 March 2017",   url: "https://yuvamitra.org/wp-content/uploads/2024/07/13-FCRA-Fund-Received-for-the-Period-of-1st-Janaury-2017-to-31st-March-2017.pdf" },
    ],
     balanceSheet: {
      subtitle: "1 April 2016 to 31 March 2017",
      url: "https://yuvamitra.org/wp-content/uploads/2024/07/FCRA-Balance-Sheet-April-2016-to-March-2017.pdf",
    },
  },
  {
    id: 9,
    title: "Financial Year 2015-2016",
    pdfs: [
      { id: 1, title: "1 April 2015 - 30 June 2015",   url: "https://yuvamitra.org/wp-content/uploads/2024/07/20-FCRA-Fund-Received-for-the-Period-of-1st-April-2015-to-30th-June-2015.pdf" },
      { id: 2, title: "1 July 2015 to 30 Sept 2015",   url: "https://yuvamitra.org/wp-content/uploads/2024/07/19-FCRA-Fund-Received-for-the-Period-of-1st-July-2015-to-30th-September-2015.pdf" },
      { id: 3, title: "1 Oct 2015 to 31 Dec 2015",     url: "https://yuvamitra.org/wp-content/uploads/2024/07/18-FCRA-Fund-Received-for-the-Period-of-1st-october-2015-to-31st-December-2015.pdf" },
      { id: 4, title: "1 Jan 2016 to 31 March 2016",   url: "https://yuvamitra.org/wp-content/uploads/2024/07/17-FCRA-Fund-Received-for-the-Period-of-1st-Janaury-2016-to-31st-March-2016.pdf" },
    ],
  },
];

// ── FCRA Balance Sheet card — title + subtitle, click to open PDF ─────────────
function BalanceSheetCard({ balanceSheet }) {
  return (
    <div className="mt-8 rounded-2xl border-2 border-secondary/20 bg-[#f0f5ff] overflow-hidden shadow-sm">
      <a
        href={balanceSheet.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-5 px-6 py-5 hover:bg-[#e6eeff] transition-colors"
      >
        {/* PDF icon */}
        <div className="flex-shrink-0">
          <svg width="42" height="50" viewBox="0 0 40 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:-translate-y-1">
            <path d="M0 4C0 1.79086 1.79086 0 4 0H26L40 14V44C40 46.2091 38.2091 48 36 48H4C1.79086 48 0 46.2091 0 44V4Z" fill="#DBEAFE"/>
            <path d="M26 0V14H40L26 0Z" fill="#BFDBFE"/>
            <rect x="8" y="24" width="24" height="13" rx="2" fill="white"/>
            <text x="12" y="34" fill="#3270a2" fontSize="9" fontWeight="bold" fontFamily="sans-serif">PDF</text>
          </svg>
        </div>

        {/* Text */}
        <div className="flex-1">
          <p className="text-[17px] font-bold font-poppins text-secondary group-hover:text-blue-800 transition-colors">
            FCRA Project Balance Sheet
          </p>
          <p className="mt-0.5 text-[14px] font-medium text-slate-500 font-inter group-hover:text-slate-700 transition-colors">
            {balanceSheet.subtitle}
          </p>
        </div>

        {/* Arrow */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300 group-hover:text-secondary transition-colors flex-shrink-0">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
        </svg>
      </a>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function Financials() {
  const [openRows, setOpenRows] = useState(new Set([0]));

  const toggleRow = (rowIndex) => {
    setOpenRows(prev => {
      const next = new Set(prev);
      next.has(rowIndex) ? next.delete(rowIndex) : next.add(rowIndex);
      return next;
    });
  };

  return (
    <>
      <FinancialsBanner />

      <section className="bg-white mt-12 pb-16 md:pb-24">
        <div className="mx-auto max-w-[1380px] px-6 lg:px-12">

          <div className="mb-14 text-center">
            <h2 className="text-[32px] md:text-[40px] font-bold font-poppins tracking-tight text-secondary">
              Financial <span className="text-primary">Reports</span>
            </h2>
            <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-primary to-accent" />
          </div>

          <div className="mx-auto space-y-6">
            {Array.from({ length: Math.ceil(financialData.length / 2) }, (_, rowIndex) => {
              const rowItems = financialData.slice(rowIndex * 2, rowIndex * 2 + 2);
              const isOpen = openRows.has(rowIndex);

              return (
                <div key={rowIndex} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  {rowItems.map((item) => (
                    <div key={item.id} className="rounded-lg border border-gray-100 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] bg-white transition-all duration-300">

                      {/* Accordion Header */}
                      <button
                        onClick={() => toggleRow(rowIndex)}
                        className={`flex w-full items-center gap-5 px-6 py-5 transition-all focus:outline-none ${
                          isOpen ? "bg-[#f8fbff] border-b border-blue-50" : "bg-[#fafafa] hover:bg-white"
                        }`}
                      >
                        <div className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300 ${
                          isOpen ? "bg-[#3270a2] border-[#3270a2] text-white" : "bg-white border-gray-300 text-gray-400"
                        }`}>
                          {isOpen ? (
                            <svg width="10" height="2" viewBox="0 0 10 2" fill="currentColor"><rect width="10" height="2" rx="1"/></svg>
                          ) : (
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><rect x="4" y="0" width="2" height="10" rx="1"/><rect x="0" y="4" width="10" height="2" rx="1"/></svg>
                          )}
                        </div>
                        <h3 className={`text-[17px] font-bold font-poppins transition-colors duration-300 ${isOpen ? "text-secondary" : "text-gray-700"}`}>
                          {item.title}
                        </h3>
                      </button>

                      {/* Accordion Content */}
                      {isOpen && (
                        <div className="bg-white px-6 py-8">
                          {/* Quarterly PDFs grid */}
                          <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2">
                            {item.pdfs.map((pdf) => (
                              <a
                                key={pdf.id}
                                href={pdf.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-start gap-4 transition-all hover:opacity-80"
                              >
                                <div className="relative mt-1 flex-shrink-0">
                                  <svg width="42" height="50" viewBox="0 0 40 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:-translate-y-1">
                                    <path d="M0 4C0 1.79086 1.79086 0 4 0H26L40 14V44C40 46.2091 38.2091 48 36 48H4C1.79086 48 0 46.2091 0 44V4Z" fill="#E2E8F0"/>
                                    <path d="M26 0V14H40L26 0Z" fill="#CBD5E1"/>
                                    <rect x="8" y="24" width="24" height="13" rx="2" fill="white"/>
                                    <text x="12" y="34" fill="#64748B" fontSize="9" fontWeight="bold" fontFamily="sans-serif">PDF</text>
                                  </svg>
                                </div>
                                <div className="flex-1">
                                  <p className="text-[15px] font-medium leading-snug text-[#3270a2] transition-colors group-hover:text-[#183b72]">
                                    {pdf.title}
                                  </p>
                                </div>
                              </a>
                            ))}
                          </div>

                          {/* FCRA Balance Sheet — featured section */}
                          {item.balanceSheet && (
                            <BalanceSheetCard balanceSheet={item.balanceSheet} />
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
