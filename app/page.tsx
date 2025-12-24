import Nav from "./components/nav";
import Hero from "./components/sections/hero";
import Team from "./components/sections/team";
import Services from "./components/sections/services";
import Contact from "./components/sections/contact";
import Footer from "./components/sections/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Team />
      <Services />
      <Contact />
      <Footer />
    </>
  );
}
