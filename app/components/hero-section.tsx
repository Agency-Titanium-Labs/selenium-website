import Button from "./ui/button";

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center gap-12 min-h-screen px-4">
      <h1 className="text-6xl font-bold text-center max-w-xl">
        L&apos;alliage parfait du{" "}
        <span
          className="text-transparent"
          style={{ WebkitTextStroke: "1px var(--color-primary)" }}
        >
          design
        </span>{" "}
        & du <span className="text-primary">dev</span>
      </h1>
      <div className="flex items-center gap-4">
        <Button>Nous contacter</Button>
        <Button variant="outline">Proute</Button>
      </div>
    </section>
  );
}
