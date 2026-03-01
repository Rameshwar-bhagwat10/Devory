import Link from 'next/link';

export default function FinalYearProjectIdeas() {
  return (
    <div className="text-white/80 leading-relaxed space-y-8">
      <p className="text-xl text-white/90 font-medium">
        Choosing the right <strong>final year project</strong> is crucial for computer science students. 
        This comprehensive guide covers 100+ project ideas across web development, machine learning, blockchain, 
        IoT, and more - complete with implementation guides and tech stack recommendations.
      </p>

      <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6 my-8">
        <h3 className="text-xl font-bold text-white mb-3">What Makes a Great Final Year Project?</h3>
        <ul className="space-y-2 text-white/70">
          <li>✓ Solves a real-world problem</li>
          <li>✓ Demonstrates technical skills</li>
          <li>✓ Has practical applications</li>
          <li>✓ Includes innovation or research</li>
          <li>✓ Can be completed in available time</li>
        </ul>
      </div>

      <h2 className="text-3xl font-bold text-white mt-12 mb-6">Web Development Final Year Projects</h2>
      
      <h3 className="text-2xl font-bold text-white mt-8 mb-4">1. Smart Campus Management System</h3>
      <p>
        Build a comprehensive platform for managing campus activities, attendance, assignments, and communication 
        between students, faculty, and administration.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> Next.js, PostgreSQL, Prisma, NextAuth, WebSockets
      </p>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">2. Online Examination Portal with AI Proctoring</h3>
      <p>
        Create an examination system with automated proctoring using computer vision to detect suspicious behavior 
        and ensure exam integrity.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> React, Node.js, TensorFlow.js, WebRTC, MongoDB
      </p>

      <h2 className="text-3xl font-bold text-white mt-12 mb-6">Machine Learning Final Year Projects</h2>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">3. Disease Prediction System</h3>
      <p>
        Develop an ML model that predicts diseases based on symptoms, medical history, and diagnostic data. 
        Include a web interface for doctors and patients.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> Python, TensorFlow, Flask, React, PostgreSQL
      </p>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">4. Fake News Detection System</h3>
      <p>
        Build an NLP-based system to detect fake news articles using deep learning and natural language processing 
        techniques.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> Python, BERT, Transformers, FastAPI, React
      </p>

      <h2 className="text-3xl font-bold text-white mt-12 mb-6">Blockchain Final Year Projects</h2>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">5. Decentralized Voting System</h3>
      <p>
        Create a secure, transparent voting platform using blockchain technology to ensure vote integrity and 
        prevent tampering.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> Solidity, Ethereum, Web3.js, React, IPFS
      </p>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">6. Supply Chain Management on Blockchain</h3>
      <p>
        Build a transparent supply chain tracking system using smart contracts to track products from manufacturer 
        to consumer.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> Hyperledger Fabric, Node.js, React, MongoDB
      </p>

      <h2 className="text-3xl font-bold text-white mt-12 mb-6">IoT Final Year Projects</h2>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">7. Smart Home Automation System</h3>
      <p>
        Develop an IoT-based home automation system with mobile app control, voice commands, and automated 
        scheduling for lights, appliances, and security.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> Arduino/Raspberry Pi, MQTT, React Native, Firebase
      </p>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">8. Health Monitoring Wearable</h3>
      <p>
        Create a wearable device that monitors vital signs (heart rate, temperature, oxygen levels) and sends 
        alerts for abnormal readings.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> ESP32, Sensors, Flutter, Firebase, ML for anomaly detection
      </p>

      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-6 my-8">
        <h3 className="text-xl font-bold text-white mb-3">💡 Tips for Final Year Project Success</h3>
        <ul className="space-y-3 text-white/70">
          <li><strong className="text-white">Start Early:</strong> Begin planning 6 months before deadline</li>
          <li><strong className="text-white">Choose Wisely:</strong> Pick a project you&apos;re passionate about</li>
          <li><strong className="text-white">Document Everything:</strong> Keep detailed project documentation</li>
          <li><strong className="text-white">Regular Updates:</strong> Meet with your advisor frequently</li>
          <li><strong className="text-white">Test Thoroughly:</strong> Ensure your project works reliably</li>
        </ul>
      </div>

      <h2 className="text-3xl font-bold text-white mt-12 mb-6">Project Selection Criteria</h2>
      <p>
        When choosing your <strong>final year project</strong>, consider:
      </p>
      <ul className="list-disc list-inside space-y-2 ml-4">
        <li><strong>Feasibility:</strong> Can you complete it in the given timeframe?</li>
        <li><strong>Innovation:</strong> Does it offer something new or improved?</li>
        <li><strong>Resources:</strong> Do you have access to required tools and data?</li>
        <li><strong>Career Goals:</strong> Does it align with your career aspirations?</li>
        <li><strong>Interest Level:</strong> Are you genuinely excited about the topic?</li>
      </ul>

      <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 rounded-xl p-8 my-12">
        <h3 className="text-2xl font-bold text-white mb-4">Explore More Final Year Projects</h3>
        <p className="text-white/70 mb-6">
          Browse 100+ final year project ideas with detailed implementation guides, tech stacks, and roadmaps 
          on Devory. Find the perfect project for your skills and interests.
        </p>
        <Link
          href="/projects"
          className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all"
        >
          Browse All Projects →
        </Link>
      </div>

      <h2 className="text-3xl font-bold text-white mt-12 mb-6">Conclusion</h2>
      <p>
        Your <strong>final year project</strong> is an opportunity to showcase your skills, solve real problems, 
        and make an impact. Choose a project that challenges you, aligns with your interests, and demonstrates 
        your technical abilities.
      </p>
      <p className="mt-4 text-white/60 italic">
        Good luck with your project! 🎓
      </p>
    </div>
  );
}
