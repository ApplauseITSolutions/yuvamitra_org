import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, X, Menu, Search } from "lucide-react";
import { menu } from "../../data/menuData";
import Logo from "../../assets/logos/Logo.png";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "../SearchBar";

export default function Navbar() {
  const [open, setOpen] = useState(null);
  const [mobileOpenIndex, setMobileOpenIndex] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchVisible, setMobileSearchVisible] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchPanelRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    if (mobileMenuOpen) {
      window.dispatchEvent(new Event('mobilemenuopen'));
    } else {
      window.dispatchEvent(new Event('mobilemenuclose'));
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  // Close everything on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileOpenIndex(null);
    setSearchOpen(false);
  }, [location.pathname]);

  // Close search panel on outside click
  useEffect(() => {
    if (!searchOpen) return;
    const handler = (e) => {
      if (searchPanelRef.current && !searchPanelRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [searchOpen]);

  // Close search on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") setSearchOpen(false); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const closeMenu = () => {
    setMobileMenuOpen(false);
    setMobileOpenIndex(null);
    setTimeout(() => setMobileSearchVisible(true), 300);
  };

  const toggleMobileSubMenu = (index) => {
    setMobileOpenIndex(mobileOpenIndex === index ? null : index);
  };

  // ── Mobile Drawer ────────────────────────────────────────────────────────────
  const mobileDrawer = (
    <>
      {/* Backdrop */}
      <div
        onClick={closeMenu}
        style={{
          position: "fixed", inset: 0,
          background: "rgba(0,0,0,0.35)",
          zIndex: 9998,
          opacity: mobileMenuOpen ? 1 : 0,
          pointerEvents: mobileMenuOpen ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Drawer */}
      <div
        style={{
          position: "fixed", top: 0, bottom: 0, right: 0,
          width: "100vw",
          background: "#fff", zIndex: 9999,
          display: "flex", flexDirection: "column",
          boxShadow: "-4px 0 24px rgba(0,0,0,0.12)",
          transform: mobileMenuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Drawer Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid #f1f5f9" }}>
          <Link to="/" onClick={closeMenu}>
            <img src={Logo} alt="Logo" style={{ height: 44 }} />
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Link
              to="/donate"
              onClick={closeMenu}
              className="hidden sm:inline-flex bg-primary hover:bg-red-700 hover-bounce text-white px-5 py-2 rounded-full font-bold text-sm shadow-lg shadow-primary/20 transition-all active:scale-95 font-poppins"
            >
              Donate Now
            </Link>
            <button
              onClick={closeMenu}
              aria-label="Close Menu"
              style={{ padding: 8, borderRadius: 10, background: "#f8fafc", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}
            >
              <X size={22} color="#334155" />
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {mobileSearchVisible && (
          <div style={{ padding: "12px 20px", borderBottom: "1px solid #f1f5f9" }}>
            <div style={{ background: "#f8fafc", borderRadius: 12, overflow: "hidden" }}>
              <div className="flex justify-between items-center px-4 py-2 bg-slate-50 border-b border-slate-100">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Search</span>
                <button 
                  onClick={() => setMobileSearchVisible(false)} 
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
                  aria-label="Hide Search"
                >
                  <X size={16} />
                </button>
              </div>
              <SearchBar onClose={closeMenu} />
            </div>
          </div>
        )}

        {/* Menu Items */}
        <div className="mobile-menu-scroll" data-lenis-prevent="true" style={{ flex: 1, overflowY: "scroll", minHeight: 0, padding: "8px 20px 40px" }}>
          {menu.map((item, i) => (
            <div key={i} style={{ borderBottom: "1px solid #f8fafc" }}>
              {!item.children ? (
                <Link
                  to={item.path}
                  onClick={closeMenu}
                  style={{
                    display: "block", padding: "14px 0",
                    fontSize: 15, fontWeight: 600,
                    color: location.pathname === item.path ? "var(--color-primary, #ED1C24)" : "#1e293b",
                    textDecoration: "none",
                  }}
                >
                  {item.title}
                </Link>
              ) : (
                <div>
                  <button
                    onClick={() => toggleMobileSubMenu(i)}
                    style={{
                      width: "100%", padding: "14px 0",
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      background: "none", border: "none", cursor: "pointer",
                      fontSize: 15, fontWeight: 600,
                      color: mobileOpenIndex === i ? "var(--color-primary, #ED1C24)" : "#1e293b",
                    }}
                  >
                    {item.title}
                    <ChevronDown
                      size={18}
                      color={mobileOpenIndex === i ? "var(--color-primary, #ED1C24)" : "#94a3b8"}
                      style={{
                        transform: mobileOpenIndex === i ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.25s ease",
                      }}
                    />
                  </button>

                  <div
                    style={{
                      overflow: "hidden",
                      maxHeight: mobileOpenIndex === i ? 1000 : 0,
                      opacity: mobileOpenIndex === i ? 1 : 0,
                      transition: "max-height 0.3s ease, opacity 0.25s ease",
                    }}
                  >
                    <div style={{ paddingLeft: 16, paddingBottom: 8, borderLeft: "2px solid #f1f5f9" }}>
                      {item.children.map((sub, j) => (
                        <Link
                          key={j}
                          to={sub.path}
                          onClick={closeMenu}
                          style={{
                            display: "block", padding: "10px 12px",
                            fontSize: 14, fontWeight: 600, borderRadius: 8,
                            color: location.pathname === sub.path ? "var(--color-primary, #ED1C24)" : "#475569",
                            background: location.pathname === sub.path ? "rgba(237,28,36,0.05)" : "transparent",
                            textDecoration: "none",
                          }}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Donate button for small phones */}
          <div style={{ marginTop: 24 }} className="sm:hidden flex justify-start">
            <Link
              to="/donate"
              onClick={closeMenu}
              className="w-fit px-7 py-2.5 flex justify-center items-center rounded-full bg-primary hover:bg-red-700 hover-bounce text-white font-bold shadow-lg shadow-primary/20 transition-all active:scale-95 font-poppins"
            >
              Donate Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <header
        className={`sticky top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-xl py-4" : "bg-white/95 backdrop-blur-sm py-4"
        }`}
      >
        <div className="container-custom mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-12">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group z-50 shrink-0">
            <img
              src={Logo}
              alt="Logo"
              className="h-10 sm:h-12 md:h-14 transition-transform group-hover:scale-105"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex font-inter items-center gap-6 xl:gap-10">
            {menu.map((item, i) => (
              <div
                key={i}
                className="relative group"
                onMouseEnter={() => setOpen(i)}
                onMouseLeave={() => setOpen(null)}
              >
                {!item.children ? (
                  <Link
                    to={item.path}
                    className={`text-[16px] font-semibold transition-colors ${
                      location.pathname === item.path ? "text-primary" : "text-slate-700 hover:text-primary"
                    }`}
                  >
                    {item.title}
                  </Link>
                ) : (
                  <div className="flex items-center gap-1 cursor-pointer">
                    <span
                      className={`text-[16px] font-semibold transition-colors group-hover:text-primary ${
                        item.children?.some(sub => location.pathname === sub.path) ? "text-primary" : "text-slate-700"
                      }`}
                    >
                      {item.title}
                    </span>
                    <ChevronDown size={14} className="text-slate-400 group-hover:text-primary transition-colors" />
                  </div>
                )}

                {open === i && item.children && (
                  <div className="absolute top-full left-0 w-70 pt-2 animate-in fade-in slide-in-from-top-2">
                    <div className="bg-white border border-slate-200 shadow-2xl rounded-2xl overflow-hidden">
                      {item.children.map((sub, j) => (
                        <Link
                          key={j}
                          to={sub.path}
                          onClick={() => setOpen(null)}
                          className={`block px-5 py-3 text-[15px] font-semibold transition-all duration-200 ${
                            location.pathname === sub.path
                              ? "bg-primary/10 text-primary"
                              : "text-slate-700 hover:bg-slate-50 hover:text-primary"
                          } ${j !== item.children.length - 1 ? "border-b border-slate-100" : ""}`}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right side: Search + Donate + Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* ── Desktop search icon + expanding panel ── */}
            <div className="relative hidden sm:block" ref={searchPanelRef}>
              <button
                onClick={() => setSearchOpen((v) => !v)}
                aria-label="Search"
                aria-expanded={searchOpen}
                className={`p-2 rounded-xl transition-colors ${
                  searchOpen
                    ? "bg-primary text-white"
                    : "text-slate-600 bg-slate-50 hover:bg-slate-100"
                }`}
              >
                <Search size={20} />
              </button>

              {/* Dropdown search panel */}
              {searchOpen && (
                <div className="absolute right-0 top-full mt-2 w-[420px] bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-top-2 z-50">
                  <div className="flex justify-between items-center px-4 py-2 bg-slate-50 border-b border-slate-100">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Search</span>
                    <button 
                      onClick={() => setSearchOpen(false)} 
                      className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
                      aria-label="Close Search"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <SearchBar onClose={() => setSearchOpen(false)} />
                </div>
              )}
            </div>

            {/* Donate Now */}
            <Link
              to="/donate"
              className="hidden sm:inline-flex bg-primary hover-bounce text-white px-5 lg:px-7 py-2.5 rounded-full font-bold shadow-lg shadow-primary/20 hover:bg-red-700 transition-all active:scale-95 text-sm lg:text-base font-poppins"
            >
              Donate Now
            </Link>

            {/* Hamburger */}
            <button
              className="xl:hidden p-2 text-slate-700 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
              onClick={() => setMobileMenuOpen(prev => !prev)}
              aria-label="Toggle Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {createPortal(mobileDrawer, document.body)}
      <style>{`
        .mobile-menu-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .mobile-menu-scroll::-webkit-scrollbar-track {
          background: transparent; 
        }
        .mobile-menu-scroll::-webkit-scrollbar-thumb {
          background: #cbd5e1; 
          border-radius: 4px;
        }
        .mobile-menu-scroll::-webkit-scrollbar-thumb:hover {
          background: #94a3b8; 
        }
      `}</style>
    </>
  );
}
