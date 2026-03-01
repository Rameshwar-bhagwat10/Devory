export default function HowToChooseProject() {
  return (
    <div className="text-white/80 leading-relaxed space-y-8">
      <p className="text-xl text-white/90 font-medium">
        Choosing the right project for your skill level is crucial for learning effectively and staying motivated. 
        This guide provides a decision framework to help you select projects that challenge you without overwhelming you.
      </p>

      <h2 className="text-3xl font-bold text-white mt-12 mb-6">Understanding Your Skill Level</h2>
      
      <div className="space-y-4">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h4 className="text-lg font-bold text-white mb-2">Beginner</h4>
          <p className="text-white/70 text-sm">
            You&apos;re learning the basics, comfortable with syntax, and can build simple applications with tutorials.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h4 className="text-lg font-bold text-white mb-2">Intermediate</h4>
          <p className="text-white/70 text-sm">
            You can build projects independently, understand frameworks, and solve problems without constant guidance.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h4 className="text-lg font-bold text-white mb-2">Advanced</h4>
          <p className="text-white/70 text-sm">
            You design complex systems, optimize performance, and can mentor others on best practices.
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-white mt-12 mb-6">The Decision Framework</h2>
      <p>
        Use this framework to evaluate if a project is right for you:
      </p>

      <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6 my-8">
        <h3 className="text-xl font-bold text-white mb-4">Project Evaluation Checklist</h3>
        <ul className="space-y-3 text-white/70">
          <li>✓ Can I understand 70% of the requirements?</li>
          <li>✓ Do I know at least one technology in the stack?</li>
          <li>✓ Can I break it into smaller, manageable tasks?</li>
          <li>✓ Will I learn 2-3 new concepts?</li>
          <li>✓ Can I complete it in my available time?</li>
        </ul>
      </div>

      <h2 className="text-3xl font-bold text-white mt-12 mb-6">Signs You&apos;re Ready to Level Up</h2>
      <ul className="list-disc list-inside space-y-2 ml-4">
        <li>Current projects feel too easy or boring</li>
        <li>You complete projects faster than estimated</li>
        <li>You&apos;re curious about more complex concepts</li>
        <li>You can explain your code to others clearly</li>
        <li>You&apos;re comfortable debugging independently</li>
      </ul>

      <h2 className="text-3xl font-bold text-white mt-12 mb-6">Common Mistakes to Avoid</h2>
      <ul className="list-disc list-inside space-y-3 ml-4">
        <li>
          <strong>Jumping Too Far Ahead:</strong> Don&apos;t skip fundamentals to build advanced projects
        </li>
        <li>
          <strong>Staying Too Comfortable:</strong> Always push slightly beyond your comfort zone
        </li>
        <li>
          <strong>Comparing to Others:</strong> Focus on your own learning journey
        </li>
        <li>
          <strong>Not Finishing Projects:</strong> Complete projects before starting new ones
        </li>
      </ul>

      <h2 className="text-3xl font-bold text-white mt-12 mb-6">Conclusion</h2>
      <p>
        The right project challenges you just enough to learn new skills without causing frustration. Trust the 
        process, be patient with yourself, and remember that every expert was once a beginner.
      </p>
    </div>
  );
}
