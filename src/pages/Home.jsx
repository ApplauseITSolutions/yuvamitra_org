// src/pages/Home.jsx
import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import ImpactSection from "../components/ImpactSection";
import DonateSaveSection from "../components/DonateSaveSection";
import FundingPartnersSection from "../components/FundingPartnersSection";
import OurWorkSection from "../components/OurWorkSection";
import ReachSection from "../components/ReachSection";
import SdgCommitmentSection from "../components/SdgCommitmentSection";
import StoriesOfChangeSection from "../components/StoriesOfChangeSection";
import AnnualReportsSection from "../components/AnnualReportsSection";


export default function Home() {
  return (
    <main>
      <Hero />
      <AboutSection />
      <ImpactSection />
      <DonateSaveSection />
      <ReachSection />
      <SdgCommitmentSection />
      <OurWorkSection />
      <AnnualReportsSection />
      <StoriesOfChangeSection />
      <FundingPartnersSection />
    </main>
  );
}

