import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 py-20 overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto text-center animate-fade-up">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]">
            <span className="bg-gradient-primary bg-clip-text text-transparent">Discover</span>{' '}
            <span className="text-white">Your Next</span>
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">Project Idea</span>
          </h1>
          <p className="text-xl md:text-2xl text-text-60 mb-12 max-w-2xl mx-auto leading-relaxed drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]">
            A curated platform for students to explore structured project ideas across multiple domains
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/auth"
              className="px-8 py-4 bg-gradient-primary text-white font-semibold rounded-lg transition-all hover:scale-105 focus:outline-none"
            >
              Get Started
            </Link>
            <Link
              href="/projects"
              className="px-8 py-4 bg-glass-5 hover:bg-glass-10 border border-border-10 text-text-90 font-semibold rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-accent-orange/30"
            >
              Explore Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-4 bg-glass-5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              The Challenge Students Face
            </span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-glass-5 border border-border-10 rounded-lg p-8 hover:border-border-20 hover:bg-glass-10 transition-all animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <h3 className="text-xl font-semibold text-text-90 mb-3">
                Idea Paralysis
              </h3>
              <p className="text-text-60 leading-relaxed">
                Too many options, no clear starting point for meaningful projects
              </p>
            </div>
            
            <div className="bg-glass-5 border border-border-10 rounded-lg p-8 hover:border-border-20 hover:bg-glass-10 transition-all animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-xl font-semibold text-text-90 mb-3">
                Lack of Structure
              </h3>
              <p className="text-text-60 leading-relaxed">
                Ideas without clear execution paths or learning outcomes
              </p>
            </div>
            
            <div className="bg-glass-5 border border-border-10 rounded-lg p-8 hover:border-border-20 hover:bg-glass-10 transition-all animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <h3 className="text-xl font-semibold text-text-90 mb-3">
                Wasted Time
              </h3>
              <p className="text-text-60 leading-relaxed">
                Hours spent searching for the right project instead of building
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-right">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  A Better Way to Find Projects
                </span>
              </h2>
              <p className="text-text-60 text-lg mb-8 leading-relaxed">
                Devory provides <span className="text-accent-orange font-semibold">curated, structured project ideas</span> designed specifically for students who want to learn by building.
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-accent-orange flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <span className="text-text-90 font-medium">Curated Ideas</span>
                    <p className="text-text-60">Hand-picked projects across multiple domains</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-accent-orange flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <span className="text-text-90 font-medium">Clear Structure</span>
                    <p className="text-text-60">Step-by-step guidance and learning paths</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-accent-orange flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <span className="text-text-90 font-medium">Save Time</span>
                    <p className="text-text-60">Start building immediately with ready-to-use ideas</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="animate-slide-left">
              <div className="bg-glass-5 border border-border-10 rounded-lg p-12 flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-6 bg-accent-orange/10 rounded-full flex items-center justify-center">
                    <svg className="w-16 h-16 text-accent-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <p className="text-text-20 text-sm">Visual representation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Capabilities Section */}
      <section className="py-20 px-4 bg-glass-5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Everything You Need
            </span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-glass-5 border border-border-10 rounded-lg p-8 transition-all group">
              <div className="w-12 h-12 bg-accent-orange/10 rounded-lg flex items-center justify-center mb-4 transition-colors">
                <svg className="w-6 h-6 text-accent-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-text-90 mb-3">
                Smart Discovery
              </h3>
              <p className="text-text-60 leading-relaxed">
                Find projects tailored to your skill level and interests
              </p>
            </div>
            
            <div className="bg-glass-5 border border-border-10 rounded-lg p-8 transition-all group">
              <div className="w-12 h-12 bg-accent-orange/10 rounded-lg flex items-center justify-center mb-4 transition-colors">
                <svg className="w-6 h-6 text-accent-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-text-90 mb-3">
                Save & Organize
              </h3>
              <p className="text-text-60 leading-relaxed">
                Bookmark ideas and build your personal project library
              </p>
            </div>
            
            <div className="bg-glass-5 border border-border-10 rounded-lg p-8 transition-all group">
              <div className="w-12 h-12 bg-accent-orange/10 rounded-lg flex items-center justify-center mb-4 transition-colors">
                <svg className="w-6 h-6 text-accent-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-text-90 mb-3">
                Community Ideas
              </h3>
              <p className="text-text-60 leading-relaxed">
                Share and discover projects from fellow students
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>
          
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row gap-6 items-start animate-fade-up">
              <div className="flex-shrink-0 w-12 h-12 bg-accent-orange text-dark-base rounded-full flex items-center justify-center text-xl font-bold">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold text-text-90 mb-2">
                  Sign Up
                </h3>
                <p className="text-text-60 leading-relaxed">
                  Create your free account and tell us about your interests and skill level
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6 items-start animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex-shrink-0 w-12 h-12 bg-accent-orange text-dark-base rounded-full flex items-center justify-center text-xl font-bold">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold text-text-90 mb-2">
                  Explore Ideas
                </h3>
                <p className="text-text-60 leading-relaxed">
                  Browse curated project ideas across web development, AI, blockchain, and more
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6 items-start animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex-shrink-0 w-12 h-12 bg-accent-orange text-dark-base rounded-full flex items-center justify-center text-xl font-bold">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold text-text-90 mb-2">
                  Start Building
                </h3>
                <p className="text-text-60 leading-relaxed">
                  Follow structured guidance and bring your chosen project to life
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 px-4 bg-glass-5">
        <div className="max-w-3xl mx-auto text-center animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Built for Academic Excellence
            </span>
          </h2>
          <p className="text-xl text-text-60 leading-relaxed">
            Devory is designed with a focus on structured learning and practical skill development. 
            Every project idea is carefully curated to ensure educational value and real-world applicability.
          </p>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Ready to Start Building?
            </span>
          </h2>
          <p className="text-xl text-text-60 mb-8">
            Join students who are turning ideas into reality
          </p>
          <Link
            href="/auth"
            className="inline-block px-8 py-4 bg-gradient-primary text-white font-semibold rounded-lg transition-all hover:scale-105 focus:outline-none"
          >
            Get Started Free
          </Link>
        </div>
      </section>
    </div>
  );
}
