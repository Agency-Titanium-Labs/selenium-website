import Hero from "@/components/sections/hero";
import Team from "@/components/sections/team";
import Services from "@/components/sections/services";
import Projects from "@/components/sections/projects";
import Contact from "@/components/sections/contact";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Team />
      <Services />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}
