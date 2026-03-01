import Link from 'next/link';

export default function FullStackMERNProjects() {
  return (
    <div className="text-white/80 leading-relaxed space-y-8">
      <p className="text-xl text-white/90 font-medium">
        Master <strong>full stack development</strong> with the MERN stack (MongoDB, Express, React, Node.js). 
        This guide covers 25+ projects from beginner to advanced, helping you become a complete full stack developer.
      </p>

      <h2 className="text-3xl font-bold text-white mt-12 mb-6">Why Learn MERN Stack?</h2>
      <p>
        The <strong>MERN stack</strong> is one of the most popular technology stacks for building modern web 
        applications. Using JavaScript across the entire stack (frontend and backend) makes development faster 
        and more efficient. Companies like Netflix, Uber, and Airbnb use these technologies.
      </p>

      <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6 my-8">
        <h3 className="text-xl font-bold text-white mb-3">What You&apos;ll Master</h3>
        <ul className="space-y-2 text-white/70">
          <li>✓ MongoDB - NoSQL database and data modeling</li>
          <li>✓ Express.js - Backend API development</li>
          <li>✓ React - Modern frontend development</li>
          <li>✓ Node.js - Server-side JavaScript</li>
          <li>✓ Authentication & authorization (JWT)</li>
          <li>✓ RESTful API design</li>
          <li>✓ Deployment and DevOps</li>
        </ul>
      </div>

      <h2 className="text-3xl font-bold text-white mt-12 mb-6">Beginner MERN Projects</h2>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">1. Todo List with CRUD Operations</h3>
      <p>
        <strong>Difficulty:</strong> Beginner | <strong>Time:</strong> 1-2 weeks
      </p>
      <p>
        Build a full stack todo app with create, read, update, and delete operations. Learn the basics of 
        connecting React frontend to Express backend with MongoDB.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> React, Express, MongoDB, Node.js
      </p>
      <p className="text-white/60 text-sm">
        <strong>Key Concepts:</strong> REST APIs, CRUD operations, state management
      </p>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">2. Blog Platform</h3>
      <p>
        <strong>Difficulty:</strong> Beginner | <strong>Time:</strong> 2-3 weeks
      </p>
      <p>
        Create a blogging platform where users can write, edit, and delete posts. Implement markdown support 
        and basic authentication.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> React, Express, MongoDB, JWT, React Markdown
      </p>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">3. Contact Management System</h3>
      <p>
        <strong>Difficulty:</strong> Beginner | <strong>Time:</strong> 1-2 weeks
      </p>
      <p>
        Build a CRM-like system to manage contacts with search, filter, and categorization features. Learn 
        database queries and pagination.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> React, Express, MongoDB, Mongoose
      </p>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">4. Expense Tracker</h3>
      <p>
        <strong>Difficulty:</strong> Beginner | <strong>Time:</strong> 2 weeks
      </p>
      <p>
        Create a personal finance tracker with income/expense tracking, categories, and monthly reports. 
        Implement data visualization with charts.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> React, Express, MongoDB, Chart.js
      </p>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">5. Recipe Sharing App</h3>
      <p>
        <strong>Difficulty:</strong> Beginner | <strong>Time:</strong> 2-3 weeks
      </p>
      <p>
        Build a platform where users can share recipes, rate them, and save favorites. Learn image uploads 
        and user interactions.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> React, Express, MongoDB, Multer, Cloudinary
      </p>

      <h2 className="text-3xl font-bold text-white mt-12 mb-6">Intermediate MERN Projects</h2>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">6. E-Commerce Platform</h3>
      <p>
        <strong>Difficulty:</strong> Intermediate | <strong>Time:</strong> 4-6 weeks
      </p>
      <p>
        Build a complete e-commerce site with product listings, shopping cart, checkout, payment integration, 
        and order management. Learn complex state management and payment processing.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> React, Express, MongoDB, Stripe, Redux, JWT
      </p>
      <p className="text-white/60 text-sm">
        <strong>Portfolio Value:</strong> Highly impressive for full stack roles
      </p>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">7. Social Media Platform</h3>
      <p>
        <strong>Difficulty:</strong> Intermediate | <strong>Time:</strong> 5-7 weeks
      </p>
      <p>
        Create a social network with posts, comments, likes, follows, and real-time notifications. Implement 
        image uploads, user profiles, and news feed algorithm.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> React, Express, MongoDB, Socket.io, Redis, AWS S3
      </p>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">8. Project Management Tool</h3>
      <p>
        <strong>Difficulty:</strong> Intermediate | <strong>Time:</strong> 4-5 weeks
      </p>
      <p>
        Build a Trello/Asana-like project management app with boards, tasks, assignments, and team collaboration. 
        Implement drag-and-drop functionality.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> React, Express, MongoDB, React DnD, Socket.io
      </p>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">9. Real-Time Chat Application</h3>
      <p>
        <strong>Difficulty:</strong> Intermediate | <strong>Time:</strong> 3-4 weeks
      </p>
      <p>
        Create a messaging app with private chats, group chats, typing indicators, and online status. Learn 
        WebSocket communication and real-time features.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> React, Express, MongoDB, Socket.io, JWT
      </p>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">10. Job Board Platform</h3>
      <p>
        <strong>Difficulty:</strong> Intermediate | <strong>Time:</strong> 4-5 weeks
      </p>
      <p>
        Build a job posting platform with employer and candidate dashboards, application tracking, and search 
        functionality. Implement role-based access control.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> React, Express, MongoDB, JWT, Nodemailer
      </p>

      <h2 className="text-3xl font-bold text-white mt-12 mb-6">Advanced MERN Projects</h2>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">11. Video Streaming Platform</h3>
      <p>
        <strong>Difficulty:</strong> Advanced | <strong>Time:</strong> 6-8 weeks
      </p>
      <p>
        Create a YouTube-like platform with video uploads, streaming, comments, likes, subscriptions, and 
        recommendations. Learn video processing and CDN integration.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> React, Express, MongoDB, AWS S3, CloudFront, FFmpeg
      </p>
      <p className="text-white/60 text-sm">
        <strong>Portfolio Value:</strong> Extremely impressive, shows advanced skills
      </p>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">12. Learning Management System (LMS)</h3>
      <p>
        <strong>Difficulty:</strong> Advanced | <strong>Time:</strong> 7-9 weeks
      </p>
      <p>
        Build an online learning platform with courses, lessons, quizzes, progress tracking, and certificates. 
        Implement video lessons and interactive content.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> React, Express, MongoDB, Stripe, AWS S3, Socket.io
      </p>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">13. Multi-Tenant SaaS Application</h3>
      <p>
        <strong>Difficulty:</strong> Advanced | <strong>Time:</strong> 8-10 weeks
      </p>
      <p>
        Create a SaaS platform with multi-tenancy, subscription management, admin dashboard, and analytics. 
        Learn enterprise-level architecture patterns.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> React, Express, MongoDB, Stripe, Redis, Bull Queue
      </p>

      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-6 my-8">
        <h3 className="text-xl font-bold text-white mb-3">💡 MERN Best Practices</h3>
        <ul className="space-y-3 text-white/70">
          <li><strong className="text-white">API Design:</strong> Follow RESTful principles and versioning</li>
          <li><strong className="text-white">Security:</strong> Implement JWT, input validation, rate limiting</li>
          <li><strong className="text-white">Error Handling:</strong> Use try-catch and error middleware</li>
          <li><strong className="text-white">Database:</strong> Use Mongoose schemas and indexes</li>
          <li><strong className="text-white">Testing:</strong> Write unit and integration tests</li>
          <li><strong className="text-white">Deployment:</strong> Use environment variables and CI/CD</li>
        </ul>
      </div>

      <h2 className="text-3xl font-bold text-white mt-12 mb-6">Essential MERN Tools & Libraries</h2>
      
      <h3 className="text-xl font-bold text-white mt-6 mb-3">Backend</h3>
      <ul className="list-disc list-inside space-y-2 ml-4">
        <li><strong>Express.js:</strong> Web framework for Node.js</li>
        <li><strong>Mongoose:</strong> MongoDB object modeling</li>
        <li><strong>JWT:</strong> Authentication tokens</li>
        <li><strong>Bcrypt:</strong> Password hashing</li>
        <li><strong>Joi/Yup:</strong> Input validation</li>
        <li><strong>Multer:</strong> File uploads</li>
      </ul>

      <h3 className="text-xl font-bold text-white mt-6 mb-3">Frontend</h3>
      <ul className="list-disc list-inside space-y-2 ml-4">
        <li><strong>React Router:</strong> Client-side routing</li>
        <li><strong>Redux/Zustand:</strong> State management</li>
        <li><strong>Axios:</strong> HTTP client</li>
        <li><strong>React Query:</strong> Data fetching and caching</li>
        <li><strong>Formik:</strong> Form handling</li>
      </ul>

      <h3 className="text-xl font-bold text-white mt-6 mb-3">DevOps</h3>
      <ul className="list-disc list-inside space-y-2 ml-4">
        <li><strong>Docker:</strong> Containerization</li>
        <li><strong>PM2:</strong> Process management</li>
        <li><strong>Nginx:</strong> Reverse proxy</li>
        <li><strong>GitHub Actions:</strong> CI/CD</li>
      </ul>

      <h2 className="text-3xl font-bold text-white mt-12 mb-6">Learning Path</h2>
      
      <div className="space-y-4 mt-6">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h4 className="text-lg font-bold text-white mb-2">Phase 1: Fundamentals (3-4 weeks)</h4>
          <ul className="text-white/70 space-y-1 text-sm">
            <li>• Learn Node.js and Express basics</li>
            <li>• Master MongoDB and Mongoose</li>
            <li>• Build simple REST APIs</li>
            <li>• Complete 2-3 beginner projects</li>
          </ul>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h4 className="text-lg font-bold text-white mb-2">Phase 2: Integration (4-6 weeks)</h4>
          <ul className="text-white/70 space-y-1 text-sm">
            <li>• Connect React frontend to Express backend</li>
            <li>• Implement authentication with JWT</li>
            <li>• Learn file uploads and image handling</li>
            <li>• Build 2-3 intermediate projects</li>
          </ul>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h4 className="text-lg font-bold text-white mb-2">Phase 3: Advanced (6-8 weeks)</h4>
          <ul className="text-white/70 space-y-1 text-sm">
            <li>• Master real-time features with Socket.io</li>
            <li>• Learn payment integration (Stripe)</li>
            <li>• Implement caching with Redis</li>
            <li>• Build 1-2 advanced projects</li>
          </ul>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h4 className="text-lg font-bold text-white mb-2">Phase 4: Production (4-6 weeks)</h4>
          <ul className="text-white/70 space-y-1 text-sm">
            <li>• Learn deployment (AWS, Heroku, Railway)</li>
            <li>• Implement CI/CD pipelines</li>
            <li>• Master monitoring and logging</li>
            <li>• Deploy all projects</li>
          </ul>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-white mt-12 mb-6">Common Challenges & Solutions</h2>
      
      <div className="space-y-4 mt-6">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h4 className="text-lg font-bold text-white mb-2">CORS Issues</h4>
          <p className="text-white/70 text-sm">
            Use the cors middleware in Express and configure allowed origins properly.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h4 className="text-lg font-bold text-white mb-2">Authentication</h4>
          <p className="text-white/70 text-sm">
            Implement JWT tokens, refresh tokens, and secure HTTP-only cookies.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h4 className="text-lg font-bold text-white mb-2">File Uploads</h4>
          <p className="text-white/70 text-sm">
            Use Multer for handling uploads and cloud storage (AWS S3, Cloudinary) for production.
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 rounded-xl p-8 my-12">
        <h3 className="text-2xl font-bold text-white mb-4">Explore MERN Projects on Devory</h3>
        <p className="text-white/70 mb-6">
          Ready to become a full stack developer? Explore 50+ MERN stack project ideas with detailed 
          implementation guides, architecture diagrams, and step-by-step roadmaps on Devory.
        </p>
        <Link
          href="/projects"
          className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all"
        >
          Browse MERN Projects →
        </Link>
      </div>

      <h2 className="text-3xl font-bold text-white mt-12 mb-6">Conclusion</h2>
      <p>
        Mastering the <strong>MERN stack</strong> opens doors to full stack development opportunities. Start 
        with simple CRUD applications, progress to complex features like real-time communication and payments, 
        and eventually build production-ready applications.
      </p>
      <p className="mt-4 text-white/60 italic">
        Happy full stack coding! 🚀
      </p>
    </div>
  );
}
