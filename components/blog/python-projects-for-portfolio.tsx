import Link from 'next/link';

export default function PythonProjectsPortfolio() {
  return (
    <div className="text-white/80 leading-relaxed space-y-8">
      <p className="text-xl text-white/90 font-medium">
        Build an impressive portfolio with these <strong>Python projects</strong>. From web scraping to machine 
        learning, this guide covers 35+ projects that will help you master Python and land your dream job.
      </p>

      <h2 className="text-3xl font-bold text-white mt-12 mb-6">Why Python for Your Portfolio?</h2>
      <p>
        <strong>Python</strong> is the most versatile programming language, used in web development, data science, 
        machine learning, automation, and more. A strong Python portfolio demonstrates your ability to solve 
        real-world problems across multiple domains.
      </p>

      <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6 my-8">
        <h3 className="text-xl font-bold text-white mb-3">What Employers Look For</h3>
        <ul className="space-y-2 text-white/70">
          <li>✓ Clean, readable code following PEP 8</li>
          <li>✓ Projects solving real problems</li>
          <li>✓ Good documentation and README files</li>
          <li>✓ Testing and error handling</li>
          <li>✓ Deployed, working applications</li>
          <li>✓ Diverse skill demonstration</li>
        </ul>
      </div>

      <h2 className="text-3xl font-bold text-white mt-12 mb-6">Beginner Python Projects</h2>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">1. Web Scraper</h3>
      <p>
        <strong>Difficulty:</strong> Beginner | <strong>Time:</strong> 1 week
      </p>
      <p>
        Build a web scraper to extract data from websites. Learn BeautifulSoup, requests, and data parsing. 
        Great for understanding HTML structure and data extraction.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> Python, BeautifulSoup, Requests, Pandas
      </p>
      <p className="text-white/60 text-sm">
        <strong>Portfolio Value:</strong> Shows data collection skills
      </p>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">2. Task Automation Scripts</h3>
      <p>
        <strong>Difficulty:</strong> Beginner | <strong>Time:</strong> 3-5 days
      </p>
      <p>
        Create scripts to automate repetitive tasks like file organization, email sending, or data backup. 
        Learn file I/O, os module, and automation basics.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> Python, os, shutil, schedule
      </p>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">3. Password Generator & Manager</h3>
      <p>
        <strong>Difficulty:</strong> Beginner | <strong>Time:</strong> 1 week
      </p>
      <p>
        Build a secure password generator and manager with encryption. Learn about security, hashing, and 
        data protection.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> Python, cryptography, SQLite, Tkinter
      </p>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">4. Weather CLI Tool</h3>
      <p>
        <strong>Difficulty:</strong> Beginner | <strong>Time:</strong> 3-5 days
      </p>
      <p>
        Create a command-line weather app that fetches data from OpenWeather API. Learn API integration and 
        CLI development.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> Python, Requests, Click/Argparse
      </p>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">5. Expense Tracker</h3>
      <p>
        <strong>Difficulty:</strong> Beginner | <strong>Time:</strong> 1-2 weeks
      </p>
      <p>
        Build a personal finance tracker with categories, budgets, and reports. Learn database operations and 
        data visualization.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> Python, SQLite, Matplotlib, Pandas
      </p>

      <h2 className="text-3xl font-bold text-white mt-12 mb-6">Intermediate Python Projects</h2>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">6. REST API with FastAPI</h3>
      <p>
        <strong>Difficulty:</strong> Intermediate | <strong>Time:</strong> 2-3 weeks
      </p>
      <p>
        Build a RESTful API with authentication, CRUD operations, and database integration. Learn modern API 
        development with FastAPI.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> FastAPI, PostgreSQL, SQLAlchemy, JWT
      </p>
      <p className="text-white/60 text-sm">
        <strong>Portfolio Value:</strong> Essential for backend roles
      </p>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">7. Data Analysis Dashboard</h3>
      <p>
        <strong>Difficulty:</strong> Intermediate | <strong>Time:</strong> 2-3 weeks
      </p>
      <p>
        Create an interactive dashboard with Streamlit or Dash. Analyze real datasets and create visualizations. 
        Perfect for data science roles.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> Python, Streamlit, Pandas, Plotly
      </p>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">8. E-Commerce Backend</h3>
      <p>
        <strong>Difficulty:</strong> Intermediate | <strong>Time:</strong> 3-4 weeks
      </p>
      <p>
        Build a complete e-commerce backend with products, cart, orders, and payment integration. Learn Django 
        or Flask framework.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> Django/Flask, PostgreSQL, Stripe, Redis
      </p>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">9. Image Processing Tool</h3>
      <p>
        <strong>Difficulty:</strong> Intermediate | <strong>Time:</strong> 2 weeks
      </p>
      <p>
        Create a tool for batch image processing - resize, compress, watermark, format conversion. Learn PIL/Pillow 
        and image manipulation.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> Python, Pillow, OpenCV, Tkinter
      </p>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">10. Chatbot with NLP</h3>
      <p>
        <strong>Difficulty:</strong> Intermediate | <strong>Time:</strong> 2-3 weeks
      </p>
      <p>
        Build an intelligent chatbot using natural language processing. Implement intent recognition and 
        response generation.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> Python, NLTK, spaCy, Flask
      </p>

      <h2 className="text-3xl font-bold text-white mt-12 mb-6">Advanced Python Projects</h2>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">11. Machine Learning Model Deployment</h3>
      <p>
        <strong>Difficulty:</strong> Advanced | <strong>Time:</strong> 4-6 weeks
      </p>
      <p>
        Train an ML model and deploy it as a web service. Include model versioning, monitoring, and A/B testing. 
        Essential for ML engineering roles.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> Python, Scikit-learn, FastAPI, Docker, MLflow
      </p>
      <p className="text-white/60 text-sm">
        <strong>Portfolio Value:</strong> Highly impressive for ML roles
      </p>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">12. Real-Time Data Pipeline</h3>
      <p>
        <strong>Difficulty:</strong> Advanced | <strong>Time:</strong> 5-6 weeks
      </p>
      <p>
        Build a data pipeline that ingests, processes, and visualizes streaming data. Learn Apache Kafka, 
        data engineering, and ETL processes.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> Python, Kafka, Apache Spark, PostgreSQL, Grafana
      </p>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">13. Microservices Architecture</h3>
      <p>
        <strong>Difficulty:</strong> Advanced | <strong>Time:</strong> 6-8 weeks
      </p>
      <p>
        Design and implement a microservices system with multiple services, API gateway, and service discovery. 
        Learn distributed systems.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> FastAPI, Docker, Kubernetes, RabbitMQ, PostgreSQL
      </p>

      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-6 my-8">
        <h3 className="text-xl font-bold text-white mb-3">💡 Portfolio Tips</h3>
        <ul className="space-y-3 text-white/70">
          <li><strong className="text-white">Quality over Quantity:</strong> 3-5 polished projects beat 20 half-finished ones</li>
          <li><strong className="text-white">Document Everything:</strong> Write clear READMEs with setup instructions</li>
          <li><strong className="text-white">Deploy Your Projects:</strong> Make them live and accessible</li>
          <li><strong className="text-white">Write Tests:</strong> Show you care about code quality</li>
          <li><strong className="text-white">Use Git Properly:</strong> Commit messages matter</li>
        </ul>
      </div>

      <h2 className="text-3xl font-bold text-white mt-12 mb-6">Essential Python Libraries</h2>
      
      <h3 className="text-xl font-bold text-white mt-6 mb-3">Web Development</h3>
      <ul className="list-disc list-inside space-y-2 ml-4">
        <li><strong>Django:</strong> Full-featured web framework</li>
        <li><strong>Flask:</strong> Lightweight and flexible</li>
        <li><strong>FastAPI:</strong> Modern, fast API framework</li>
      </ul>

      <h3 className="text-xl font-bold text-white mt-6 mb-3">Data Science</h3>
      <ul className="list-disc list-inside space-y-2 ml-4">
        <li><strong>Pandas:</strong> Data manipulation and analysis</li>
        <li><strong>NumPy:</strong> Numerical computing</li>
        <li><strong>Matplotlib/Seaborn:</strong> Data visualization</li>
        <li><strong>Scikit-learn:</strong> Machine learning</li>
      </ul>

      <h3 className="text-xl font-bold text-white mt-6 mb-3">Automation</h3>
      <ul className="list-disc list-inside space-y-2 ml-4">
        <li><strong>Selenium:</strong> Browser automation</li>
        <li><strong>BeautifulSoup:</strong> Web scraping</li>
        <li><strong>Schedule:</strong> Task scheduling</li>
      </ul>

      <h2 className="text-3xl font-bold text-white mt-12 mb-6">How to Showcase Your Projects</h2>
      
      <div className="space-y-4 mt-6">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h4 className="text-lg font-bold text-white mb-2">1. GitHub Repository</h4>
          <ul className="text-white/70 space-y-1 text-sm">
            <li>• Clear README with project description</li>
            <li>• Setup instructions and dependencies</li>
            <li>• Screenshots or demo GIFs</li>
            <li>• License and contribution guidelines</li>
          </ul>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h4 className="text-lg font-bold text-white mb-2">2. Live Demo</h4>
          <ul className="text-white/70 space-y-1 text-sm">
            <li>• Deploy on Heroku, Railway, or Vercel</li>
            <li>• Provide demo credentials if needed</li>
            <li>• Include link in README</li>
          </ul>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h4 className="text-lg font-bold text-white mb-2">3. Blog Post</h4>
          <ul className="text-white/70 space-y-1 text-sm">
            <li>• Write about your development process</li>
            <li>• Explain challenges and solutions</li>
            <li>• Share on Dev.to or Medium</li>
          </ul>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 rounded-xl p-8 my-12">
        <h3 className="text-2xl font-bold text-white mb-4">Explore Python Projects on Devory</h3>
        <p className="text-white/70 mb-6">
          Ready to build your portfolio? Explore 60+ Python project ideas with detailed implementation guides, 
          tech stack recommendations, and step-by-step roadmaps on Devory.
        </p>
        <Link
          href="/projects"
          className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all"
        >
          Browse Python Projects →
        </Link>
      </div>

      <h2 className="text-3xl font-bold text-white mt-12 mb-6">Conclusion</h2>
      <p>
        Building a strong portfolio with <strong>Python projects</strong> is your ticket to landing great 
        opportunities. Focus on quality, document well, and showcase diverse skills across web development, 
        data science, and automation.
      </p>
      <p className="mt-4 text-white/60 italic">
        Start building today! 🐍
      </p>
    </div>
  );
}
