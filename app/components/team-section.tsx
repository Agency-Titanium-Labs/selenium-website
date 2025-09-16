import Image from "next/image";

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
    <section className="flex flex-col items-center gap-8 p-8 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-center">Notre équipe</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {teamMembers.map((member) => (
          <li
            key={member.name}
            className="group relative bg-grey-lightest/5 backdrop-blur-md max-w-3xs"
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
              className="relative w-full h-auto mt-8 scale-110 group-hover:scale-90 origin-top transition-transform duration-800"
            />
            <p className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-2 py-1 text-sm font-orbitron font-medium bg-primary text-grey-darkest">
              {member.role}
            </p>
            <h3>{member.name}</h3>
            <p>{member.description}</p>
            <a href={member.portfolioUrl}>Portfolio</a>
            <ul>
              {member.tools.map((tool) => (
                <li key={tool.name}>
                  <img src={tool.iconUrl} alt={tool.name} />
                  <span>{tool.name}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
