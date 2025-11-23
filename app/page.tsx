import Nav from "./components/nav";
import Hero from "./components/sections/hero";
import Team from "./components/sections/team";
import Services from "./components/sections/services";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Team />
      <Services />
      <div className="min-h-screen"></div>
    </>
  );
}
