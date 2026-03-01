import Link from 'next/link';

export default function ReactProjectIdeas() {
  return (
    <div className="text-white/80 leading-relaxed space-y-8">
      <p className="text-xl text-white/90 font-medium">
        Looking for <strong>React project ideas</strong> to build in 2024? This comprehensive guide covers 40+ 
        projects from beginner to advanced, helping you master React, Next.js, and modern frontend development.
      </p>

      <h2 className="text-3xl font-bold text-white mt-12 mb-6">Why Build React Projects?</h2>
      <p>
        <strong>React</strong> is the most popular frontend framework, used by Facebook, Netflix, Airbnb, and 
        thousands of companies worldwide. Building React projects is the best way to learn component-based 
        architecture, state management, and modern JavaScript.
      </p>

      <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6 my-8">
        <h3 className="text-xl font-bold text-white mb-3">What You&apos;ll Master</h3>
        <ul className="space-y-2 text-white/70">
          <li>✓ React fundamentals (components, props, state)</li>
          <li>✓ Hooks (useState, useEffect, useContext, custom hooks)</li>
          <li>✓ State management (Context API, Redux, Zustand)</li>
          <li>✓ React Router for navigation</li>
          <li>✓ API integration and data fetching</li>
          <li>✓ Next.js for production apps</li>
        </ul>
      </div>

      <h2 className="text-3xl font-bold text-white mt-12 mb-6">Beginner React Projects</h2>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">1. Todo List with Local Storage</h3>
      <p>
        <strong>Difficulty:</strong> Beginner | <strong>Time:</strong> 3-5 days
      </p>
      <p>
        Build a classic todo app with add, edit, delete, and complete functionality. Learn useState, useEffect, 
        and localStorage for data persistence.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> React, TypeScript, Tailwind CSS, Local Storage
      </p>
      <p className="text-white/60 text-sm">
        <strong>Key Concepts:</strong> State management, event handling, conditional rendering
      </p>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">2. Weather App with API</h3>
      <p>
        <strong>Difficulty:</strong> Beginner | <strong>Time:</strong> 1 week
      </p>
      <p>
        Fetch weather data from OpenWeather API and display current conditions, forecasts, and location search. 
        Learn API integration and async operations.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> React, Axios, OpenWeather API, CSS Modules
      </p>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">3. Movie Search App</h3>
      <p>
        <strong>Difficulty:</strong> Beginner | <strong>Time:</strong> 1 week
      </p>
      <p>
        Search movies using TMDB API, display results with posters, ratings, and details. Learn about debouncing, 
        pagination, and responsive design.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> React, TMDB API, React Query, Tailwind CSS
      </p>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">4. Calculator App</h3>
      <p>
        <strong>Difficulty:</strong> Beginner | <strong>Time:</strong> 3-5 days
      </p>
      <p>
        Build a functional calculator with basic operations. Great for practicing state management and handling 
        complex user interactions.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> React, TypeScript, CSS Grid
      </p>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">5. Recipe Finder</h3>
      <p>
        <strong>Difficulty:</strong> Beginner | <strong>Time:</strong> 1-2 weeks
      </p>
      <p>
        Search recipes by ingredients, cuisine, or dietary restrictions. Implement filters, favorites, and 
        detailed recipe views.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> React, Spoonacular API, Context API, Local Storage
      </p>

      <h2 className="text-3xl font-bold text-white mt-12 mb-6">Intermediate React Projects</h2>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">6. E-Commerce Store</h3>
      <p>
        <strong>Difficulty:</strong> Intermediate | <strong>Time:</strong> 3-4 weeks
      </p>
      <p>
        Build a full e-commerce site with product listings, shopping cart, checkout, and payment integration. 
        Learn Redux or Zustand for complex state management.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> React, Redux Toolkit, Stripe, Firebase, Tailwind CSS
      </p>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">7. Social Media Dashboard</h3>
      <p>
        <strong>Difficulty:</strong> Intermediate | <strong>Time:</strong> 2-3 weeks
      </p>
      <p>
        Create a dashboard with posts, comments, likes, and user profiles. Implement authentication, real-time 
        updates, and infinite scrolling.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> React, Firebase, React Query, Tailwind CSS
      </p>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">8. Kanban Board (Trello Clone)</h3>
      <p>
        <strong>Difficulty:</strong> Intermediate | <strong>Time:</strong> 2-3 weeks
      </p>
      <p>
        Build a project management tool with drag-and-drop functionality, multiple boards, and task management. 
        Learn React DnD library.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> React, React DnD, Context API, Local Storage
      </p>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">9. Real-Time Chat Application</h3>
      <p>
        <strong>Difficulty:</strong> Intermediate | <strong>Time:</strong> 3-4 weeks
      </p>
      <p>
        Create a messaging app with private chats, group chats, typing indicators, and online status. Learn 
        WebSocket communication.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> React, Socket.io, Node.js, MongoDB, Tailwind CSS
      </p>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">10. Expense Tracker with Charts</h3>
      <p>
        <strong>Difficulty:</strong> Intermediate | <strong>Time:</strong> 2 weeks
      </p>
      <p>
        Track income and expenses with categories, budgets, and visual charts. Learn data visualization with 
        Chart.js or Recharts.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> React, Chart.js, Context API, Local Storage
      </p>

      <h2 className="text-3xl font-bold text-white mt-12 mb-6">Advanced React Projects</h2>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">11. Netflix Clone with Next.js</h3>
      <p>
        <strong>Difficulty:</strong> Advanced | <strong>Time:</strong> 4-6 weeks
      </p>
      <p>
        Build a streaming platform with authentication, video playback, recommendations, and user profiles. 
        Learn Next.js, SSR, and ISR.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> Next.js, NextAuth, Prisma, PostgreSQL, Tailwind CSS
      </p>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">12. Notion Clone</h3>
      <p>
        <strong>Difficulty:</strong> Advanced | <strong>Time:</strong> 6-8 weeks
      </p>
      <p>
        Create a note-taking app with rich text editing, nested pages, databases, and real-time collaboration. 
        Implement complex editor functionality.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> Next.js, Slate.js/Lexical, WebSockets, PostgreSQL
      </p>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">13. Code Editor with Live Preview</h3>
      <p>
        <strong>Difficulty:</strong> Advanced | <strong>Time:</strong> 4-5 weeks
      </p>
      <p>
        Build an online code editor with syntax highlighting, live preview, and code execution. Learn Monaco 
        Editor integration.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> React, Monaco Editor, Web Workers, Sandpack
      </p>

      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-6 my-8">
        <h3 className="text-xl font-bold text-white mb-3">💡 React Best Practices</h3>
        <ul className="space-y-3 text-white/70">
          <li><strong className="text-white">Component Composition:</strong> Break UI into reusable components</li>
          <li><strong className="text-white">Custom Hooks:</strong> Extract reusable logic into hooks</li>
          <li><strong className="text-white">TypeScript:</strong> Use TypeScript for type safety</li>
          <li><strong className="text-white">Performance:</strong> Use React.memo, useMemo, useCallback wisely</li>
          <li><strong className="text-white">Testing:</strong> Write tests with React Testing Library</li>
        </ul>
      </div>

      <h2 className="text-3xl font-bold text-white mt-12 mb-6">Essential React Libraries</h2>
      
      <h3 className="text-xl font-bold text-white mt-6 mb-3">State Management</h3>
      <ul className="list-disc list-inside space-y-2 ml-4">
        <li><strong>Redux Toolkit:</strong> Industry standard for complex state</li>
        <li><strong>Zustand:</strong> Lightweight and simple state management</li>
        <li><strong>Jotai:</strong> Atomic state management</li>
        <li><strong>Context API:</strong> Built-in React state sharing</li>
      </ul>

      <h3 className="text-xl font-bold text-white mt-6 mb-3">Data Fetching</h3>
      <ul className="list-disc list-inside space-y-2 ml-4">
        <li><strong>React Query:</strong> Powerful data fetching and caching</li>
        <li><strong>SWR:</strong> Stale-while-revalidate strategy</li>
        <li><strong>Axios:</strong> HTTP client for API calls</li>
      </ul>

      <h3 className="text-xl font-bold text-white mt-6 mb-3">UI & Styling</h3>
      <ul className="list-disc list-inside space-y-2 ml-4">
        <li><strong>Tailwind CSS:</strong> Utility-first CSS framework</li>
        <li><strong>Styled Components:</strong> CSS-in-JS solution</li>
        <li><strong>Chakra UI:</strong> Component library</li>
        <li><strong>Shadcn/ui:</strong> Beautiful component collection</li>
      </ul>

      <h2 className="text-3xl font-bold text-white mt-12 mb-6">Learning Path</h2>
      
      <div className="space-y-4 mt-6">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h4 className="text-lg font-bold text-white mb-2">Phase 1: Fundamentals (2-3 weeks)</h4>
          <ul className="text-white/70 space-y-1 text-sm">
            <li>• Learn JSX, components, props, state</li>
            <li>• Master useState and useEffect</li>
            <li>• Build 3-5 beginner projects</li>
          </ul>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h4 className="text-lg font-bold text-white mb-2">Phase 2: Intermediate (4-6 weeks)</h4>
          <ul className="text-white/70 space-y-1 text-sm">
            <li>• Learn Context API, custom hooks</li>
            <li>• Master React Router</li>
            <li>• Build 3-5 intermediate projects</li>
          </ul>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h4 className="text-lg font-bold text-white mb-2">Phase 3: Advanced (6-8 weeks)</h4>
          <ul className="text-white/70 space-y-1 text-sm">
            <li>• Learn Next.js, SSR, ISR</li>
            <li>• Master state management (Redux/Zustand)</li>
            <li>• Build 2-3 advanced projects</li>
          </ul>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 rounded-xl p-8 my-12">
        <h3 className="text-2xl font-bold text-white mb-4">Explore React Projects on Devory</h3>
        <p className="text-white/70 mb-6">
          Ready to start building? Explore 80+ React project ideas with detailed implementation guides, 
          tech stack recommendations, and step-by-step roadmaps on Devory.
        </p>
        <Link
          href="/projects"
          className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all"
        >
          Browse React Projects →
        </Link>
      </div>

      <h2 className="text-3xl font-bold text-white mt-12 mb-6">Conclusion</h2>
      <p>
        Building <strong>React projects</strong> is the fastest way to master modern frontend development. 
        Start with simple components, progress to complex applications, and eventually build production-ready 
        apps with Next.js.
      </p>
      <p className="mt-4 text-white/60 italic">
        Happy coding! ⚛️
      </p>
    </div>
  );
}
