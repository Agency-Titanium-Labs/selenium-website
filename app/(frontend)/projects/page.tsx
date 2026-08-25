import ProjectCard from "@/components/project-card";
import { getProjects } from "@/lib/projects";

export type Project = {
  title: string;
  slug: string;
  description: string;
  about: string;
  images: string[];
  link: string;
  githubLink?: string;
  accentColor?: string;
  lightMode?: boolean;
  year: number;
  category: string;
  tags: string[];
  role: string;
  duration?: string;
  client?: string;
  features?: string[];
  challenges?: string[];
};

export default async function Projects() {
  const projects = await getProjects();

  return (
    <div className="grid place-items-center px-8 pt-48 pb-16">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.slug || project.title + index}
            project={project}
          />
        ))}
      </div>
    </div>
  );
}
