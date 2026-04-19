import { twMerge } from "tailwind-merge";

export default function Projects() {
  const projects = [
    {
      title: "Project 1",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
      images: ["1", "2", "3"],
      link: "#",
    },
    {
      title: "Project 2",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
      images: ["1", "2", "3"],
      link: "#",
    },
    {
      title: "Project 3",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
      images: ["1", "2", "3"],
      link: "#",
    },
    {
      title: "Project 4",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
      images: ["1", "2", "3"],
      link: "#",
    },
    {
      title: "Project 5",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
      images: ["1", "2", "3"],
      link: "#",
    },
    {
      title: "Project 6",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
      images: ["1", "2", "3"],
      link: "#",
    },
  ];

  return (
    <div className="grid place-items-center px-8 py-16">
      <div className="w-full max-w-5xl grid grid-cols-3 gap-8">
        {projects.map((project) => (
          <div
            key={project.title}
            className="group relative flex items-end aspect-video transform-3d rotate-y-0 hover:rotate-y-12 transition-transform duration-300 perspective-distant hover:z-10"
          >
            <div
              className="absolute top-0 left-0 w-full h-full bg-[#866B25] backdrop-blur-md [--corner-size:30px] transform rotate-x-0 origin-bottom group-hover:rotate-x-2 transition-transform duration-300"
              style={
                {
                  clipPath: `polygon(
                    0 0,
                    calc(100% - var(--corner-size)) 0,
                    100% var(--corner-size),
                    100% 100%,
                    0 100%,
                    0 0
                  )`,
                } as React.CSSProperties
              }
            >
              <div
                className="absolute inset-0 bg-linear-160 from-primary-lighter/50 via-primary/50 to-primary-dark/50 -z-1"
                style={
                  {
                    "--border-width": "1px",
                    clipPath: `polygon(
                      0 0,
                      calc(100% - var(--corner-size)) 0,
                      100% var(--corner-size),
                      100% 100%,
                      0 100%,
                      0 var(--border-width),
                      var(--border-width) var(--border-width),
                      var(--border-width) calc(100% - var(--border-width)),
                      calc(100% - var(--border-width)) calc(100% - var(--border-width)),
                      calc(100% - var(--border-width)) calc(var(--corner-size) + var(--border-width) / 2),
                      calc(100% - var(--corner-size) - var(--border-width) / 2) var(--border-width),
                      0 var(--border-width),
                      0 0
                    )`,
                  } as React.CSSProperties
                }
              ></div>
            </div>
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center p-6 space-x-[-60%] group-hover:space-x-[-20%] transition-all duration-300">
              {project.images.map((image, index) => (
                <div
                  key={index}
                  className={twMerge(
                    "grow aspect-video origin-bottom rotate-0 transition-all duration-300",
                    "group-hover:-translate-y-4/5",
                    index === 0 && "z-3 group-hover:-rotate-[15deg] bg-[red]",
                    index === 1 && "z-2 group-hover:rotate-0 bg-[green]",
                    index === 2 && "z-1 group-hover:rotate-[15deg] bg-[blue]",
                  )}
                ></div>
              ))}
            </div>
            <div
              className="relative h-5/6 bg-grey-lightest/20 backdrop-blur-md [--corner-size-x:40px] [--corner-size-y:30px] [--left-size:100px] p-6 flex flex-col justify-end transform -rotate-x-0 origin-bottom group-hover:-rotate-x-30 transition-transform duration-300 z-4"
              style={
                {
                  clipPath: `polygon(
                    0 0,
                    var(--left-size) 0,
                    calc(var(--left-size) + var(--corner-size-x)) var(--corner-size-y),
                    100% var(--corner-size-y),
                    100% 100%,
                    0 100%,
                    0 0
                  )`,
                } as React.CSSProperties
              }
            >
              <div
                className="absolute inset-0 bg-linear-160 from-primary-lighter/50 via-primary/50 to-primary-dark/50 -z-1"
                style={
                  {
                    "--border-width": "1px",
                    clipPath: `polygon(
                      0 0,
                      var(--left-size) 0,
                      calc(var(--left-size) + var(--corner-size-x)) var(--corner-size-y),
                      100% var(--corner-size-y),
                      100% 100%,
                      0 100%,
                      0 var(--border-width),
                      var(--border-width) var(--border-width),
                      var(--border-width) calc(100% - var(--border-width)),
                      calc(100% - var(--border-width)) calc(100% - var(--border-width)),
                      calc(100% - var(--border-width)) calc(var(--corner-size-y) + var(--border-width)),
                      calc(var(--left-size) + var(--corner-size-x) - var(--border-width) / 2) calc(var(--corner-size-y) + var(--border-width)),
                      calc(var(--left-size) - var(--border-width) / 2) var(--border-width),
                      0 var(--border-width),
                      0 0
                    )`,
                  } as React.CSSProperties
                }
              ></div>
              <div>
                <h2 className="font-bold text-2xl">{project.title}</h2>
                <p className="text-sm">{project.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
