import { getProjectBySlug } from "@/lib/projects";
import ProjectImageSwiper from "@/components/project-image-swiper";
import Button from "@/components/ui/button";
import { getCategoryColorInfo } from "@/components/icons/service-icon";
import PhoneMockup from "@/components/phone-mockup";

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
    <div className="w-full pt-32 lg:pt-40 pb-20 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start">
          {/* Colonne gauche : Tout le contenu du projet */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-16 sm:gap-20">
            {/* Première partie / Hero : Hauteur de l'écran avec padding navbar */}
            <div className="min-h-[calc(100dvh-13rem)] flex flex-col justify-center gap-6 py-4">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  {project.services?.map((service) => {
                    const colorInfo = getCategoryColorInfo(service.category);
                    return (
                      <span
                        key={service.slug || service.title}
                        className="text-xs px-2.5 py-1 rounded-full font-mono transition-colors"
                        style={{
                          color: colorInfo.color,
                          backgroundColor: `color-mix(in srgb, ${colorInfo.color} 15%, transparent)`,
                          border: `1px solid color-mix(in srgb, ${colorInfo.color} 35%, transparent)`,
                        }}
                      >
                        {service.title}
                      </span>
                    );
                  })}
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                  {project.title}
                </h1>
                <p className="text-lg sm:text-xl opacity-60 max-w-xl leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* CTA dans la première section */}
              <div className="flex flex-wrap gap-4 pt-2">
                <Button
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
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

            {/* Images */}
            <ProjectImageSwiper
              images={project.images}
              title={project.title}
              accentColor={project.accentColor}
            />

            {/* Main grid : À propos & Meta */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h2 className="text-sm font-mono uppercase tracking-widest opacity-40 mb-3">
                  À propos
                </h2>
                <p className="leading-relaxed opacity-80">{project.about}</p>
              </div>

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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
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

            {/* CTA Bas de page */}
            <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10">
              <Button
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
              >
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

          {/* Colonne droite : Mockup téléphone STICKY prenant la hauteur disponible */}
          <div className="lg:col-span-5 xl:col-span-4 flex justify-center items-center lg:sticky lg:top-40 lg:self-start h-[55dvh] lg:h-[calc(100dvh-13rem)]">
            <PhoneMockup
              url={project.link}
              title={project.title}
              accentColor={project.accentColor}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
