import { getProjectBySlug } from "@/lib/projects";
import ProjectImageSwiper from "@/components/project-image-swiper";
import Button from "@/components/ui/button";

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
          <h1 className="text-4xl font-bold mb-4">Projet introuvable</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-8 py-16">
      <div className="max-w-5xl mx-auto grid gap-12">
        {/* Header */}
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-sm font-mono opacity-40">{project.year}</span>
            <span
              className="text-xs px-2 py-1 rounded-full font-mono uppercase tracking-wider"
              style={{
                backgroundColor: project.accentColor
                  ? `color-mix(in srgb, ${project.accentColor} 20%, transparent)`
                  : "rgba(255,255,255,0.1)",
                color: project.accentColor ?? "white",
                border: `1px solid ${project.accentColor ? `color-mix(in srgb, ${project.accentColor} 40%, transparent)` : "rgba(255,255,255,0.2)"}`,
              }}
            >
              {project.category}
            </span>
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 rounded font-mono"
                style={{
                  backgroundColor: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-5xl font-bold mb-4">{project.title}</h1>
          <p className="text-xl opacity-60 max-w-2xl">{project.description}</p>
        </div>

        {/* Images */}
        <ProjectImageSwiper
          images={project.images}
          title={project.title}
          accentColor={project.accentColor}
        />

        {/* Main grid */}
        <div className="grid grid-cols-3 gap-8">
          {/* Long description */}
          <div className="col-span-2">
            <h2 className="text-sm font-mono uppercase tracking-widest opacity-40 mb-3">
              À propos
            </h2>
            <p className="leading-relaxed opacity-80">{project.about}</p>
          </div>

          {/* Meta */}
          <div className="space-y-6">
            {project.client && (
              <div>
                <p className="text-xs font-mono uppercase tracking-widest opacity-40 mb-1">
                  Client
                </p>
                <p className="font-medium">{project.client}</p>
              </div>
            )}
            <div>
              <p className="text-xs font-mono uppercase tracking-widest opacity-40 mb-1">
                Rôle
              </p>
              <p className="font-medium">{project.role}</p>
            </div>
            {project.duration && (
              <div>
                <p className="text-xs font-mono uppercase tracking-widest opacity-40 mb-1">
                  Durée
                </p>
                <p className="font-medium">{project.duration}</p>
              </div>
            )}
            <div>
              <p className="text-xs font-mono uppercase tracking-widest opacity-40 mb-1">
                Année
              </p>
              <p className="font-medium">{project.year}</p>
            </div>
          </div>
        </div>

        {/* Features & Challenges */}
        {((project.features && project.features.length > 0) ||
          (project.challenges && project.challenges.length > 0)) && (
          <div className="grid grid-cols-2 gap-8">
            {project.features && project.features.length > 0 && (
              <div
                className="rounded-xl p-6"
                style={{
                  backgroundColor: project.accentColor
                    ? `color-mix(in srgb, ${project.accentColor} 8%, transparent)`
                    : "rgba(255,255,255,0.04)",
                  border: `1px solid ${project.accentColor ? `color-mix(in srgb, ${project.accentColor} 20%, transparent)` : "rgba(255,255,255,0.08)"}`,
                }}
              >
                <h2 className="text-sm font-mono uppercase tracking-widest opacity-40 mb-4">
                  Fonctionnalités
                </h2>
                <ul className="space-y-2">
                  {project.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm opacity-80"
                    >
                      <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{
                          backgroundColor: project.accentColor ?? "white",
                        }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {project.challenges && project.challenges.length > 0 && (
              <div
                className="rounded-xl p-6"
                style={{
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <h2 className="text-sm font-mono uppercase tracking-widest opacity-40 mb-4">
                  Défis techniques
                </h2>
                <ul className="space-y-2">
                  {project.challenges.map((c) => (
                    <li
                      key={c}
                      className="flex items-start gap-2 text-sm opacity-80"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-white/40" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* CTA */}
        <div className="flex gap-4">
          <Button href={project.link} target="_blank" rel="noopener noreferrer">
            Voir le projet ↗
          </Button>
          {project.githubLink && (
            <Button
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
            >
              GitHub ↗
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
