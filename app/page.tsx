import Nav from "./components/nav";
import HeroSection from "./components/hero-section";
import TeamSection from "./components/team-section";

export default function Home() {
  return (
    <div className="relative">
      <Nav />
      <HeroSection />
      <TeamSection />
      <section id="projects" className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Nos projets</h2>
          <p className="text-grey-lightest/80">Cette section sera bientôt disponible.</p>
        </div>
      </section>
      <section id="contact" className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Nous contacter</h2>
          <p className="text-grey-lightest/80">Cette section sera bientôt disponible.</p>
        </div>
      </section>
    </div>
  );
}
