import Nav from "@/components/nav";
import ProjectCard from "@/components/project-card";
import projectsData from "@/constants/projects.json";

export type Project = {
  title: string;
  slug: string;
  description: string;
  longDescription: string;
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
