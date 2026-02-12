import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ProjectService } from '@/features/projects/project.service';
import { SaveService } from '@/features/projects/save.service';
import { AuditService } from '@/features/audit/audit.service';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import ProjectCard from '@/components/common/ProjectCard';
import SaveButton from '@/components/projects/SaveButton';
import ShareButton from '@/components/projects/ShareButton';
import CopySummaryButton from '@/components/projects/CopySummaryButton';
import BackButton from '@/components/projects/BackButton';
import { getTechIcon, TechBadge } from '@/components/projects/TechIcon';

// OPTIMAL ISR STRATEGY FOR FAST FIRST LOAD:
// 1. Pre-render ALL projects at build time (no limit)
// 2. Use batched queries to avoid connection pool exhaustion
// 3. Cache all pages for 1 hour (revalidate = 3600)
// 4. Background revalidation keeps content fresh
// 5. New projects automatically generated on-demand (dynamicParams = true)
export const revalidate = 3600; // 1 hour cache
export const dynamic = 'force-static'; // Force static generation
export const dynamicParams = true; // Allow on-demand generation for new projects

// Generate static params for ALL projects at build time
// This ensures FAST first load for all existing projects
export async function generateStaticParams() {
  try {
    // Pre-render ALL published projects at build time
    // This makes first load fast for all projects (~50ms)
    const projects = await prisma.project.findMany({
      where: { isPublished: true },
      select: { slug: true },
      // No take limit - pre-render ALL projects
      orderBy: [
        { isEditorPick: 'desc' },
        { createdAt: 'desc' },
      ],
    });

    console.log(`Pre-rendering ${projects.length} project pages at build time...`);

    return projects.map((project) => ({
      slug: project.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    // Return empty array to allow on-demand generation as fallback
    return [];
  }
}

// Generate dynamic metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await ProjectService.getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found | Devory',
    };
  }

  return {
    title: `${project.title} | Devory - Project Ideas`,
    description: project.description,
    keywords: [
      project.title,
      project.domain,
      project.difficulty,
      ...project.techStack,
      'project idea',
      'final year project',
    ],
    openGraph: {
      title: project.title,
      description: project.description,
      type: 'article',
      url: `/projects/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
    },
    alternates: {
      canonical: `/projects/${slug}`,
    },
  };
}

const DIFFICULTY_STYLES = {
  BEGINNER: 'bg-green-500/10 border-green-500/30 text-green-400',
  INTERMEDIATE: 'bg-accent-orange/10 border-accent-orange/30 text-accent-orange',
  ADVANCED: 'bg-red-500/10 border-red-500/30 text-red-400',
};

const DOMAIN_LABELS: Record<string, string> = {
  WEB_DEVELOPMENT: 'Web Development',
  MOBILE_DEVELOPMENT: 'Mobile Development',
  DATA_SCIENCE: 'Data Science',
  MACHINE_LEARNING: 'Machine Learning',
  BLOCKCHAIN: 'Blockchain',
  IOT: 'IoT',
  GAME_DEVELOPMENT: 'Game Development',
  CYBERSECURITY: 'Cybersecurity',
  CLOUD_COMPUTING: 'Cloud Computing',
  OTHER: 'Other',
};

// Mock timeline data - will be dynamic in future phases
const TIMELINE_WEEKS = [
  {
    week: 1,
    title: 'Planning & Setup',
    description: 'Define requirements, set up development environment, and create project structure',
  },
  {
    week: 2,
    title: 'Core Development',
    description: 'Build main features and implement core functionality',
  },
  {
    week: 3,
    title: 'Integration & Testing',
    description: 'Integrate components, write tests, and fix bugs',
  },
  {
    week: 4,
    title: 'Polish & Deployment',
    description: 'Refine UI/UX, optimize performance, and deploy to production',
  },
];

// Mock architecture steps - will be dynamic in future phases
const ARCHITECTURE_STEPS = [
  'User interacts with the frontend interface',
  'Frontend sends requests to the backend API',
  'Backend processes data and communicates with database',
  'Results are returned and displayed to the user',
];

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // OPTIMIZATION: Fetch project first
  const project = await ProjectService.getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // OPTIMIZATION: Parallel data fetching - fetch session and related projects concurrently
  const [session, relatedProjects] = await Promise.all([
    auth(),
    ProjectService.getRelatedProjects(project.domain, slug),
  ]);

  // OPTIMIZATION: Check if project is saved
  const isSaved = session?.user?.id 
    ? await SaveService.isProjectSaved(session.user.id, project.id)
    : false;

  // OPTIMIZATION: Non-blocking audit log (fire and forget)
  if (session?.user?.id) {
    AuditService.logProjectView(session.user.id, project.id);
  }

  const { Icon: TechIcon, color: iconColor } = getTechIcon(project.primaryTechnology);

  // Group tech stack by category
  const frontendTech = project.techStack.filter(t => 
    ['React', 'Next.js', 'Vue', 'Angular', 'TypeScript', 'Tailwind'].includes(t)
  );
  const backendTech = project.techStack.filter(t => 
    ['Node.js', 'Python', 'Express', 'Django', 'FastAPI'].includes(t)
  );
  const databaseTech = project.techStack.filter(t => 
    ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase'].includes(t)
  );
  const otherTech = project.techStack.filter(t => 
    !frontendTech.includes(t) && !backendTech.includes(t) && !databaseTech.includes(t)
  );

  // Structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: project.title,
    description: project.description,
    author: {
      '@type': 'Organization',
      name: 'Devory',
    },
    datePublished: project.createdAt instanceof Date ? project.createdAt.toISOString() : new Date(project.createdAt).toISOString(),
    keywords: project.techStack.join(', '),
    articleSection: DOMAIN_LABELS[project.domain],
    proficiencyLevel: project.difficulty,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="min-h-screen bg-dark-base">
      {/* Back Button - Below Navbar with proper spacing */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-6">
        <BackButton />
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Subtle glow */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-accent-orange/5 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left: Title and Summary */}
            <div className="lg:col-span-2 space-y-6 opacity-0 animate-fade-in" style={{ animationFillMode: 'forwards' }}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-90 leading-tight">
                    {project.title}
                    <div className="h-1 w-0 bg-gradient-to-r from-accent-orange via-accent-pink to-accent-red rounded-full mt-3 animate-expand-width" style={{ animationFillMode: 'forwards' }}></div>
                  </h1>
                  
                  {/* Primary Technology Badge */}
                  {project.primaryTechnology && (
                    <div className="mt-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-10 text-text-90 text-base font-medium bg-glass-5">
                        <TechIcon style={{ color: iconColor }} className="w-5 h-5" />
                        <span>{project.primaryTechnology}</span>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Save and Share buttons */}
                <div className="flex items-center gap-2">
                  <SaveButton
                    projectId={project.id}
                    initialSaved={isSaved}
                    variant="compact"
                  />
                  <ShareButton
                    title={project.title}
                    url={`${process.env.NEXT_PUBLIC_APP_URL || ''}/projects/${project.slug}`}
                    variant="icon"
                  />
                </div>
              </div>
              <p className="text-lg text-text-60 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Right: Meta Card */}
            <div className="opacity-0 animate-fade-in" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
              <div className="bg-glass-5 border border-border-10 rounded-xl p-6 space-y-4 shadow-lg">
                <div>
                  <div className="text-xs text-text-60 uppercase tracking-wider mb-2">Difficulty</div>
                  <span className={`inline-block text-xs px-3 py-1.5 rounded-full border font-bold uppercase tracking-wide ${DIFFICULTY_STYLES[project.difficulty]}`}>
                    {project.difficulty}
                  </span>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-border-10 to-transparent"></div>

                <div>
                  <div className="text-xs text-text-60 uppercase tracking-wider mb-2">Domain</div>
                  <div className="text-sm text-text-90 font-medium">{DOMAIN_LABELS[project.domain]}</div>
                </div>

                {project.estimatedHours && (
                  <>
                    <div className="h-px bg-gradient-to-r from-transparent via-border-10 to-transparent"></div>
                    <div>
                      <div className="text-xs text-text-60 uppercase tracking-wider mb-2">Duration</div>
                      <div className="flex items-center gap-2 text-sm text-text-90">
                        <svg className="w-4 h-4 text-accent-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium">{project.estimatedHours} hours</span>
                      </div>
                    </div>
                  </>
                )}

                <div className="h-px bg-gradient-to-r from-transparent via-border-10 to-transparent"></div>

                <div>
                  <div className="text-xs text-text-60 uppercase tracking-wider mb-2">Recommended For</div>
                  <div className="text-sm text-text-90">Final Year Students</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-16">
        
        {/* Overview Section */}
        {project.longDescription && (
          <section className="opacity-0 animate-fade-in" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-1 h-8 bg-gradient-to-b from-accent-orange via-accent-pink to-accent-red rounded-full"></div>
                <h2 className="text-2xl sm:text-3xl font-bold text-text-90">Overview</h2>
              </div>
              <CopySummaryButton
                title={project.title}
                description={project.description}
                domain={DOMAIN_LABELS[project.domain]}
                difficulty={project.difficulty}
                techStack={project.techStack}
              />
            </div>
            <div className="max-w-4xl">
              <p className="text-text-60 leading-relaxed whitespace-pre-line">
                {project.longDescription}
              </p>
            </div>
          </section>
        )}

        {/* Key Features Section */}
        {project.features.length > 0 && (
          <section className="opacity-0 animate-fade-in" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-1 h-8 bg-gradient-primary rounded-full"></div>
              <h2 className="text-2xl sm:text-3xl font-bold text-text-90">Key Features</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-glass-5 border border-border-10 rounded-lg p-5 hover:-translate-y-1 transition-all duration-200"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent-orange/10 border border-accent-orange/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5 text-accent-orange" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-sm text-text-90 leading-relaxed">{feature}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tech Stack Section */}
        <section className="opacity-0 animate-fade-in" style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-accent-orange via-accent-pink to-accent-red rounded-full"></div>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-90">Tech Stack</h2>
          </div>
          <div className="space-y-6">
            {frontendTech.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-text-60 uppercase tracking-wider mb-3">Frontend</h3>
                <div className="flex flex-wrap gap-2">
                  {frontendTech.map((tech, index) => (
                    <TechBadge key={index} tech={tech} isPrimary={index === 0} />
                  ))}
                </div>
              </div>
            )}

            {backendTech.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-text-60 uppercase tracking-wider mb-3">Backend</h3>
                <div className="flex flex-wrap gap-2">
                  {backendTech.map((tech, index) => (
                    <TechBadge key={index} tech={tech} isPrimary={index === 0} />
                  ))}
                </div>
              </div>
            )}

            {databaseTech.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-text-60 uppercase tracking-wider mb-3">Database</h3>
                <div className="flex flex-wrap gap-2">
                  {databaseTech.map((tech, index) => (
                    <TechBadge key={index} tech={tech} isPrimary={index === 0} />
                  ))}
                </div>
              </div>
            )}

            {otherTech.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-text-60 uppercase tracking-wider mb-3">Tools & Others</h3>
                <div className="flex flex-wrap gap-2">
                  {otherTech.map((tech, index) => (
                    <TechBadge key={index} tech={tech} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Architecture Section */}
        <section className="opacity-0 animate-fade-in" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-1 h-8 bg-gradient-primary rounded-full"></div>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-90">System Flow</h2>
          </div>
          <div className="space-y-4">
            {ARCHITECTURE_STEPS.map((step, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-accent-orange/10 border-2 border-accent-orange flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-accent-orange">{index + 1}</span>
                </div>
                <p className="text-text-60 leading-relaxed pt-1">{step}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Required Section */}
        {project.prerequisites.length > 0 && (
          <section className="opacity-0 animate-fade-in" style={{ animationDelay: '700ms', animationFillMode: 'forwards' }}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-1 h-8 bg-gradient-primary rounded-full"></div>
              <h2 className="text-2xl sm:text-3xl font-bold text-text-90">Skills Required</h2>
            </div>
            <div className="space-y-3">
              {project.prerequisites.map((skill, index) => (
                <div key={index} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-accent-orange flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-text-60 leading-relaxed">{skill}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Learning Outcomes Section */}
        {project.learningOutcomes.length > 0 && (
          <section className="opacity-0 animate-fade-in" style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-1 h-8 bg-gradient-primary rounded-full"></div>
              <h2 className="text-2xl sm:text-3xl font-bold text-text-90">Learning Outcomes</h2>
            </div>
            <div className="bg-glass-5 border border-border-10 rounded-xl p-6 sm:p-8">
              <div className="space-y-4">
                {project.learningOutcomes.map((outcome, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                      </svg>
                    </div>
                    <p className="text-text-90 leading-relaxed">{outcome}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Timeline Section */}
        <section className="opacity-0 animate-fade-in" style={{ animationDelay: '900ms', animationFillMode: 'forwards' }}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-1 h-8 bg-gradient-primary rounded-full"></div>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-90">Project Timeline</h2>
          </div>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-border-10"></div>
            
            <div className="space-y-8">
              {TIMELINE_WEEKS.map((item, index) => (
                <div key={index} className="relative pl-12">
                  {/* Dot */}
                  <div className="absolute left-0 w-8 h-8 rounded-full bg-accent-orange/10 border-2 border-accent-orange flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-accent-orange"></div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold text-text-90 mb-2">Week {item.week}: {item.title}</h3>
                    <p className="text-text-60 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Projects Section */}
        {relatedProjects.length > 0 && (
          <section className="opacity-0 animate-fade-in" style={{ animationDelay: '1000ms', animationFillMode: 'forwards' }}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-1 h-8 bg-gradient-primary rounded-full"></div>
              <h2 className="text-2xl sm:text-3xl font-bold text-text-90">Related Projects</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProjects.map((relatedProject) => (
                <ProjectCard key={relatedProject.id} {...relatedProject} />
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
    </>
  );
}
