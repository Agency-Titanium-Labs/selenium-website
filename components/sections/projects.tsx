import Button from "@/components/ui/button";
import { Project } from "@/app/projects/page";
import ProjectCard from "@/components/project-card";
import projectsData from "@/constants/projects.json";

const projects = projectsData as Project[];

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative flex flex-col items-center gap-16 px-8 py-16 md:py-24 overflow-hidden"
    >
      <h2 className="text-3xl font-bold text-center">Nos Derniers Projets</h2>
      <div className="grid place-items-center gap-12">
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.slice(0, 6).map((project, index) => (
            <div
              key={project.title + index}
              className={index >= 4 ? "max-sm:hidden" : ""}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
        <Button variant="outline" href="/projects">
          Voir tous les projets
        </Button>
      </div>
    </section>
  );
}
