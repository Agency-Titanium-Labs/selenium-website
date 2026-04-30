import ProjectCard from "@/components/project-card";
import projectsData from "@/constants/projects.json";

export type Project = {
  title: string;
  slug: string;
  description: string;
  images: string[];
  link: string;
  accentColor?: string;
  lightMode?: boolean;
};

const projects = projectsData as Project[];

export default function Projects() {
  return (
    <div className="grid place-items-center px-8 py-16">
      <div className="w-full max-w-5xl grid grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={project.title + index} project={project} />
        ))}
      </div>
    </div>
  );
}
