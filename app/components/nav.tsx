import Button from "./ui/button";
import Image from "next/image";

const navigation = [
  { name: "À propos", href: "#" },
  { name: "Nos projets", href: "#" },
  { name: "Nous contacter", href: "#" },
];

export default function Nav() {
  return (
    <nav
      className="fixed top-8 left-1/2 transform -translate-x-1/2 w-max flex justify-between items-center gap-8 pl-10 sm:pl-16 pr-4 sm:pr-8 py-4 min-w-2/3 z-50 bg-grey-lightest/5 backdrop-blur-md"
      style={
        {
          "--corner-size": "30px",
          clipPath: `polygon(
                      var(--corner-size) 0,
                      100% 0,
                      100% calc(100% - var(--corner-size)),
                      calc(100% - var(--corner-size)) 100%,
                      0 100%,
                      0 var(--corner-size)
                    )`,
        } as React.CSSProperties
      }
    >
      <div
        className="absolute inset-0 bg-linear-160 from-primary-lighter/50 via-primary/50 to-primary-dark/50 -z-1"
        style={
          {
            "--corner-size": "30px",
            "--border-width": "2px",
            clipPath: `polygon(
                      var(--corner-size) 0,
                      calc(100% - var(--border-width)) 0,
                      calc(100% - var(--border-width)) var(--border-width),
                      calc(var(--corner-size) + var(--border-width) / 2) var(--border-width),
                      var(--border-width) calc(var(--corner-size) + var(--border-width) / 2),
                      var(--border-width) calc(100% - var(--border-width)),
                      calc(100% - calc(var(--corner-size) + var(--border-width) / 2)) calc(100% - var(--border-width)),
                      calc(100% - var(--border-width)) calc(100% - calc(var(--corner-size) + var(--border-width) / 2)),
                      calc(100% - var(--border-width)) 0,
                      100% 0,
                      100% calc(100% - var(--corner-size)),
                      calc(100% - var(--corner-size)) 100%,
                      0 100%,
                      0 var(--corner-size)
                    )`,
          } as React.CSSProperties
        }
      ></div>
      <Image
        src="/logo-full.svg"
        alt="Selenium Logo"
        width={100}
        height={100}
        className="h-10 sm:h-12 md:h-14 w-auto"
      />
      <ul className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
        {navigation.map((item) => (
          <li key={item.name}>
            <Button variant="transparent" href={item.href}>
              {item.name}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
