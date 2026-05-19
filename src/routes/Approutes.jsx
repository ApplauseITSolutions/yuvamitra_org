import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import Home from "../pages/Home";
import AboutYuvaMitra from "../pages/AboutYuvaMitra";
import OurHistory from "../pages/OurHistory";
import AdvisoryBoard from "../pages/AdvisoryBoard";
import Trustees from "../pages/Trustees";
import Ourteam from "../pages/Ourteam";
import AllPrograms from "../pages/AllPrograms";
import ProgramDetail from "../pages/ProgramDetail";
import ScrollToTop from "../components/ScrollTotop";
import Financials from "../pages/Financials";
import Donate from "../pages/Donate";
import Contact from "../pages/Contact";
import Careers from "../pages/Careers";
import PrivacyPolicy from "../pages/PrivacyPolicy";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about/about-yuva-mitra" element={<AboutYuvaMitra />} />
          <Route path="about/our-history" element={<OurHistory />} />
          <Route path="about/advisory-board" element={<AdvisoryBoard />} />
          <Route path="about/trustees" element={<Trustees />} />
          <Route path="about/leadership-team" element={<Ourteam />} />
          <Route path="programs" element={<AllPrograms />} />
          <Route path="programs/category/:category" element={<AllPrograms />} />
          <Route path="programs/details/:slug" element={<ProgramDetail />} />
          <Route path="resources/financials" element={<Financials/>}/>
          <Route path="donate" element={<Donate/>}/>
          <Route path="contact" element={<Contact/>}/>
          <Route path="careers" element={<Careers/>}/>
          <Route path="privacy-policy" element={<PrivacyPolicy/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}