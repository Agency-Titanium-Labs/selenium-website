import Hero from "@/components/sections/hero";
import Team from "@/components/sections/team";
import Services from "@/components/sections/services";
import Projects from "@/components/sections/projects";
import Contact from "@/components/sections/contact";
import Footer from "@/components/sections/footer";
import { getServices } from "@/lib/services";

export default async function Home() {
  const services = await getServices();

  return (
    <>
      <Hero />
      <Team />
      <Services services={services} />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}
