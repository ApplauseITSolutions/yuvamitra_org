import { useState, useEffect, useRef, useCallback } from "react";
import { Search, X, ArrowRight, FileText, Users, Briefcase, Phone, Home, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { programs } from "../data/ProgramData.jsx";

// ── Static site index ─────────────────────────────────────────────────────────
const STATIC_PAGES = [
  { title: "Home",                    path: "/",                              category: "Page",     icon: Home },
  { title: "About Yuva Mitra",        path: "/about/about-yuva-mitra",        category: "About",    icon: Users },
  { title: "Our History",             path: "/about/our-history",             category: "About",    icon: BookOpen },
  { title: "Advisory Board",          path: "/about/advisory-board",          category: "About",    icon: Users },
  { title: "Trustees",                path: "/about/trustees",                category: "About",    icon: Users },
  { title: "Leadership Team",         path: "/about/leadership-team",         category: "About",    icon: Users },
  { title: "Water Resource Development & Management", path: "/programs/category/water",      category: "Programs", icon: Briefcase },
  { title: "Livelihood & Skill Development",          path: "/programs/category/livelihood", category: "Programs", icon: Briefcase },
  { title: "Institution Building & Sustainable Agriculture", path: "/programs/category/agriculture", category: "Programs", icon: Briefcase },
  { title: "Health & Education",      path: "/programs/category/health",      category: "Programs", icon: Briefcase },
  { title: "All Programs",            path: "/programs",                      category: "Programs", icon: Briefcase },
  { title: "Financials",              path: "/resources/financials",          category: "Resources",icon: FileText },
  { title: "Careers",                 path: "/careers",                       category: "Page",     icon: Briefcase },
  { title: "Contact Us",              path: "/contact",                       category: "Page",     icon: Phone },
  { title: "Donate",                  path: "/donate",                        category: "Page",     icon: Home },
  { title: "Privacy Policy",          path: "/privacy-policy",                category: "Page",     icon: FileText },
];

// Build full index: static pages + every program
const buildIndex = () => [
  ...STATIC_PAGES,
  ...programs.map((p) => ({
    title: p.title,
    path: `/programs/details/${p.slug}`,
    category: p.category || "Program",
    excerpt: p.excerpt || "",
    icon: Briefcase,
  })),
];

const INDEX = buildIndex();

// Simple fuzzy match — checks if every word in the query appears in the target string
function matches(query, item) {
  const q = query.toLowerCase().trim();
  const haystack = `${item.title} ${item.category} ${item.excerpt || ""}`.toLowerCase();
  return q.split(/\s+/).every((word) => haystack.includes(word));
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function SearchBar({ onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Run search whenever query changes
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setActiveIndex(0);
      return;
    }
    const found = INDEX.filter((item) => matches(query, item)).slice(0, 8);
    setResults(found);
    setActiveIndex(0);
  }, [query]);

  const go = useCallback(
    (path) => {
      navigate(path);
      onClose();
    },
    [navigate, onClose]
  );

  const handleKey = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[activeIndex]) {
      go(results[activeIndex].path);
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  // Category colour chips
  const categoryColor = {
    Page:      "bg-slate-100 text-slate-500",
    About:     "bg-blue-50 text-blue-600",
    Programs:  "bg-green-50 text-green-700",
    Program:   "bg-green-50 text-green-700",
    Resources: "bg-amber-50 text-amber-700",
  };

  return (
    <div className="w-full">
      {/* Input row */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100">
        <Search size={18} className="text-slate-400 flex-shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Search pages, programs, topics…"
          className="flex-1 bg-transparent text-[15px] font-inter text-slate-800 placeholder:text-slate-400 outline-none"
          autoComplete="off"
          spellCheck={false}
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="text-slate-400 hover:text-slate-600 transition-colors"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Results */}
      {results.length > 0 && (
        <ul className="max-h-[60vh] overflow-y-auto py-2">
          {results.map((item, i) => {
            const Icon = item.icon || FileText;
            const isActive = i === activeIndex;
            return (
              <li key={item.path}>
                <button
                  onClick={() => go(item.path)}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                    isActive ? "bg-primary/5" : "hover:bg-slate-50"
                  }`}
                >
                  <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${isActive ? "bg-primary text-white" : "bg-slate-100 text-slate-500"}`}>
                    <Icon size={15} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-[14px] font-semibold font-inter truncate ${isActive ? "text-primary" : "text-slate-800"}`}>
                      {item.title}
                    </p>
                    {item.excerpt && (
                      <p className="text-[12px] text-slate-400 truncate mt-0.5">{item.excerpt}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${categoryColor[item.category] || "bg-slate-100 text-slate-500"}`}>
                      {item.category}
                    </span>
                    <ArrowRight size={14} className={`transition-colors ${isActive ? "text-primary" : "text-slate-300"}`} />
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {/* Empty state */}
      {query.trim() && results.length === 0 && (
        <div className="px-4 py-8 text-center">
          <p className="text-slate-400 text-sm font-inter">No results for <span className="font-semibold text-slate-600">"{query}"</span></p>
          <p className="text-slate-300 text-xs mt-1">Try a different keyword</p>
        </div>
      )}

      {/* Hint when empty */}
      {!query && (
        <div className="px-4 py-4">
          <p className="text-[11px] text-slate-400 font-inter mb-2 uppercase tracking-wider font-semibold">Quick links</p>
          <div className="flex flex-wrap gap-2">
            {["Programs", "Donate", "Contact Us", "Careers", "Financials"].map((label) => {
              const item = INDEX.find((x) => x.title === label);
              return item ? (
                <button
                  key={label}
                  onClick={() => go(item.path)}
                  className="text-[12px] font-semibold px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 hover:bg-primary hover:text-white transition-all font-inter"
                >
                  {label}
                </button>
              ) : null;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
