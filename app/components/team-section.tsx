import Image from "next/image";
import Button from "./ui/button";

const teamMembers = [
  {
    name: "Antoine",
    description:
      "Le pixel-perfect, c'est son truc. Il transforme les maquettes en interfaces fluides, rapides et responsives.\nReact, animations web, accessibilité... rien ne lui échappe.",
    role: "Dev frontend",
    imageUrl: "/team/antoine.png",
    portfolioUrl: "https://antoinefavereau.fr/",
    tools: [
      {
        name: "Visual Studio Code",
        iconUrl: "/tools/vscode.svg",
      },
      {
        name: "Figma",
        iconUrl: "/tools/figma.svg",
      },
      {
        name: "React",
        iconUrl: "/tools/react.svg",
      },
    ],
  },
  {
    name: "Athéna",
    description:
      "Le pixel-perfect, c'est son truc. Il transforme les maquettes en interfaces fluides, rapides et responsives.\nReact, animations web, accessibilité... rien ne lui échappe.",
    role: "Dev frontend",
    imageUrl: "/team/athena.png",
    portfolioUrl: "https://antoinefavereau.fr/",
    tools: [
      {
        name: "Visual Studio Code",
        iconUrl: "/tools/vscode.svg",
      },
      {
        name: "Figma",
        iconUrl: "/tools/figma.svg",
      },
      {
        name: "React",
        iconUrl: "/tools/react.svg",
      },
    ],
  },
  {
    name: "Anatholy",
    description:
      "Le pixel-perfect, c'est son truc. Il transforme les maquettes en interfaces fluides, rapides et responsives.\nReact, animations web, accessibilité... rien ne lui échappe.",
    role: "Dev frontend",
    imageUrl: "/team/anatholy.png",
    portfolioUrl: "https://antoinefavereau.fr/",
    tools: [
      {
        name: "Visual Studio Code",
        iconUrl: "/tools/vscode.svg",
      },
      {
        name: "Figma",
        iconUrl: "/tools/figma.svg",
      },
      {
        name: "React",
        iconUrl: "/tools/react.svg",
      },
    ],
  },
  {
    name: "Rémi",
    description:
      "Le pixel-perfect, c'est son truc. Il transforme les maquettes en interfaces fluides, rapides et responsives.\nReact, animations web, accessibilité... rien ne lui échappe.",
    role: "Dev frontend",
    imageUrl: "/team/remi.png",
    portfolioUrl: "https://antoinefavereau.fr/",
    tools: [
      {
        name: "Visual Studio Code",
        iconUrl: "/tools/vscode.svg",
      },
      {
        name: "Figma",
        iconUrl: "/tools/figma.svg",
      },
      {
        name: "React",
        iconUrl: "/tools/react.svg",
      },
    ],
  },
];

export default function TeamSection() {
  return (
    <section className="flex flex-col items-center gap-12 p-12 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-center">Notre équipe</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-12">
        {teamMembers.map((member) => (
          <li
            key={member.name}
            className="group team-member-card relative bg-grey-lightest/5 backdrop-blur-md max-w-3xs"
            style={
              {
                "--corner-size": "30px",
                clipPath: `polygon(
                  var(--corner-size) 0,
                  var(--corner-size) -50%,
                  100% -50%,
                  100% 100%,
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
                    calc(100% - var(--border-width)) calc(100% - var(--border-width)),
                    calc(100% - var(--border-width)) 0,
                    100% 0,
                    100% 100%,
                    0 100%,
                    0 var(--corner-size)
                  )`,
                } as React.CSSProperties
              }
            ></div>
            <Image
              src="/background dots.svg"
              alt=""
              width={100}
              height={100}
              className="absolute top-40 left-6 w-16 h-auto pointer-events-none select-none"
            />
            <Image
              src={member.imageUrl}
              alt={member.name}
              width={500}
              height={500}
              className="relative w-full h-auto mt-8 scale-110 group-hover:scale-85 origin-top transition-transform duration-500 ease-in-out delay-100 group-hover:delay-0"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
                maskRepeat: "no-repeat",
                maskSize: "cover",
              }}
            />
            <p className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-2 py-1 text-sm font-orbitron font-medium bg-primary text-grey-darkest">
              {member.role}
            </p>
            <ul className="absolute top-2 right-2 flex flex-col gap-2">
              {member.tools.map((tool) => (
                <li key={tool.name}>
                  {/* <img src={tool.iconUrl} alt={tool.name} /> */}
                </li>
              ))}
            </ul>
            <div
              className="absolute bottom-0 left-0 w-full flex flex-col items-center gap-4 p-4 bg-grey-darkest/60 backdrop-blur-xs text-xl transform translate-y-[calc(100%-2rem-1.2em)] group-hover:translate-y-0 transition-transform duration-500 ease-in-out group-hover:delay-50"
              style={
                {
                  "--corner-size": "20px",
                  clipPath: `polygon(
                    0 var(--corner-size),
                    20% var(--corner-size),
                    calc(20% + var(--corner-size)) 0,
                    calc(80% - var(--corner-size)) 0,
                    80% var(--corner-size),
                    100% var(--corner-size),
                    100% 100%,
                    0 100%
                  )`,
                } as React.CSSProperties
              }
            >
              <div
                className="team-member-bg absolute inset-0 bg-linear-160 from-primary-lighter/50 via-primary/50 to-primary-dark/50 bg-[auto_200%] -z-1 transition-[background-position] duration-500 ease-in-out group-hover:delay-50"
                style={
                  {
                    "--corner-size": "20px",
                    "--border-width": "2px",
                    "--bg-pos-normal":
                      "center bottom calc(-100% - 2rem - 1.2em)",
                    "--bg-pos-hover": "center 100%",
                    backgroundPosition: "var(--bg-pos-normal)",
                    clipPath: `polygon(
                      0 var(--corner-size),
                      20% var(--corner-size),
                      calc(20% + var(--corner-size)) 0,
                      calc(80% - var(--corner-size)) 0,
                      80% var(--corner-size),
                      calc(100% - var(--border-width)) var(--corner-size),
                      calc(100% - var(--border-width)) calc(var(--corner-size) + var(--border-width)),
                      calc(80% - var(--border-width) / 2) calc(var(--corner-size) + var(--border-width)),
                      calc(80% - var(--corner-size) - var(--border-width) / 2) var(--border-width),
                      calc(20% + var(--corner-size) + var(--border-width) / 2) var(--border-width),
                      calc(20% + var(--border-width) / 2) calc(var(--corner-size) + var(--border-width)),
                      var(--border-width) calc(var(--corner-size) + var(--border-width)),
                      var(--border-width) calc(100% - var(--border-width)),
                      calc(100% - var(--border-width)) calc(100% - var(--border-width)),
                      calc(100% - var(--border-width)) var(--corner-size),
                      100% var(--corner-size),
                      100% 100%,
                      0 100%
                    )`,
                  } as React.CSSProperties
                }
              ></div>
              <h3 className="text-primary font-bold">{member.name}</h3>
              <p className="text-base">{member.description}</p>
              <Button variant="outline" href={member.portfolioUrl}>
                Portfolio{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="currentColor"
                  className="inline"
                >
                  <path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z" />
                </svg>
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
