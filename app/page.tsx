import Nav from "./components/nav";
import HeroSection from "./components/hero-section";
import TeamSection from "./components/team-section";
import ServicesSection from "./components/services-section";

export default function Home() {
  return (
    <div className="relative">
      <Nav />
      <HeroSection />
      <TeamSection />
      <ServicesSection />
      <div className="min-h-screen"></div>
    </div>
  );
}
