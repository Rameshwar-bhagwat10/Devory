export default function SEOContent() {
  return (
    <section className="py-24 px-4 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Left Column - Main Content */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-white">
            Project Ideas for IT Students and Developers
          </h2>
          <div className="text-white/70 space-y-4 leading-relaxed">
            <p>
              Devory is the ultimate platform for discovering <strong>project ideas for IT students</strong>, 
              developers, and tech enthusiasts. Whether you&apos;re looking for <strong>web development projects</strong>, 
              <strong>machine learning projects</strong>, or <strong>blockchain projects</strong>, we&apos;ve got you covered 
              with 300+ curated ideas.
            </p>
            <p>
              Each project comes with a complete roadmap, tech stack recommendations, and implementation guides. 
              Perfect for <strong>final year projects</strong>, portfolio building, or learning new technologies.
            </p>
            <p>
              From beginner-friendly projects to advanced challenges, Devory helps students and developers 
              find the perfect project to enhance their skills and build impressive portfolios.
            </p>
          </div>
        </div>

        {/* Right Column - Categories */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white">
            Popular Project Categories
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { name: 'Web Development', count: '80+', keywords: 'React, Next.js, Full Stack' },
              { name: 'Machine Learning', count: '50+', keywords: 'Python, TensorFlow, AI' },
              { name: 'Mobile Development', count: '40+', keywords: 'React Native, Flutter' },
              { name: 'Blockchain', count: '30+', keywords: 'Solidity, Web3, DeFi' },
              { name: 'Data Science', count: '35+', keywords: 'Python, Analytics, ML' },
              { name: 'IoT Projects', count: '25+', keywords: 'Arduino, Raspberry Pi' },
            ].map((category) => (
              <div
                key={category.name}
                className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all"
              >
                <h4 className="text-white font-semibold mb-1">{category.name}</h4>
                <p className="text-purple-400 text-sm font-medium mb-2">{category.count} Projects</p>
                <p className="text-white/50 text-xs">{category.keywords}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section - Keywords */}
      <div className="mt-16 pt-12 border-t border-white/10">
        <h3 className="text-xl font-bold text-white mb-6 text-center">
          Find Your Perfect Project
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            'Web Dev Projects',
            'ML Projects',
            'Final Year Projects',
            'Beginner Projects',
            'Advanced Projects',
            'Full Stack Projects',
            'Python Projects',
            'React Projects',
            'AI Projects',
            'Blockchain Projects',
            'Mobile App Projects',
            'IoT Projects',
            'Data Science Projects',
            'Cloud Projects',
            'Cybersecurity Projects',
          ].map((keyword) => (
            <span
              key={keyword}
              className="px-4 py-2 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 rounded-full text-white/70 text-sm hover:text-white hover:border-purple-500/40 transition-all cursor-default"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>

      {/* Schema-friendly content for SEO */}
      <div className="mt-16 text-white/60 text-sm leading-relaxed space-y-4">
        <p>
          <strong className="text-white">Why Choose Devory for Your Next Project?</strong> Our platform offers 
          carefully curated project ideas with detailed implementation guides, making it easy for students and 
          developers to find projects that match their skill level and interests. Whether you&apos;re a computer science 
          student looking for final year project ideas or a developer wanting to expand your portfolio, Devory 
          provides the resources you need to succeed.
        </p>
        <p>
          <strong className="text-white">Perfect for Students:</strong> Our collection includes projects suitable 
          for all academic levels - from first-year students learning the basics to final-year students working on 
          capstone projects. Each project includes difficulty ratings, estimated time requirements, and prerequisite 
          knowledge to help you make the right choice.
        </p>
        <p>
          <strong className="text-white">Technology Coverage:</strong> Explore projects across all major technology 
          domains including web development (React, Next.js, Node.js), machine learning (Python, TensorFlow, PyTorch), 
          mobile development (React Native, Flutter), blockchain (Solidity, Web3), data science, IoT, cloud computing, 
          and more. Every project comes with recommended tech stacks and learning resources.
        </p>
      </div>
    </section>
  );
}
