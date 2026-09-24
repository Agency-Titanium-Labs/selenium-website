import { getProjectBySlug } from "@/lib/projects";
import ProjectDetailView from "@/components/project-detail-view";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return (
      <div className="grid place-items-center min-h-screen px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 font-orbitron">
            Projet introuvable
          </h1>
        </div>
      </div>
    );
  }

  return <ProjectDetailView project={project} />;
}
