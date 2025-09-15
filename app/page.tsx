import HeroSection from "./components/hero-section";
import Nav from "./components/nav";

export default function Home() {
  return (
    <div className="relative">
      <Nav />
      <HeroSection />
      <div className="min-h-screen"></div>
      <div className="min-h-screen"></div>
    </div>
  );
}
