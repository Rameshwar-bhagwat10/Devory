import { PostType } from '@prisma/client';

interface PostTypeSelectorProps {
  selectedType: PostType;
  onTypeChange: (type: PostType) => void;
}

export default function PostTypeSelector({ selectedType, onTypeChange }: PostTypeSelectorProps) {
  return (
    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
          What would you like to share?
        </h2>
        <p className="text-white/60 text-sm">Choose the type of post you want to create</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          type="button"
          onClick={() => onTypeChange('IDEA')}
          className={`group relative p-8 rounded-2xl border-2 transition-all duration-300 ${
            selectedType === 'IDEA'
              ? 'border-purple-500 bg-gradient-to-br from-purple-500/20 to-purple-600/10 shadow-lg shadow-purple-500/30 scale-105'
              : 'border-white/10 bg-white/5 hover:border-purple-500/50 hover:bg-white/10 hover:scale-102'
          }`}
        >
          {selectedType === 'IDEA' && (
            <div className="absolute top-4 right-4">
              <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
          )}
          <svg className={`w-16 h-16 mx-auto mb-4 transition-all duration-300 ${
            selectedType === 'IDEA' ? 'text-purple-400 scale-110' : 'text-white/40 group-hover:text-purple-400 group-hover:scale-110'
          }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <div className="font-bold text-xl text-white/90 mb-2">Idea</div>
          <div className="text-sm text-white/60">Share a project concept or innovative idea with the community</div>
        </button>

        <button
          type="button"
          onClick={() => onTypeChange('COLLABORATION')}
          className={`group relative p-8 rounded-2xl border-2 transition-all duration-300 ${
            selectedType === 'COLLABORATION'
              ? 'border-cyan-500 bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 shadow-lg shadow-cyan-500/30 scale-105'
              : 'border-white/10 bg-white/5 hover:border-cyan-500/50 hover:bg-white/10 hover:scale-102'
          }`}
        >
          {selectedType === 'COLLABORATION' && (
            <div className="absolute top-4 right-4">
              <svg className="w-6 h-6 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
          )}
          <svg className={`w-16 h-16 mx-auto mb-4 transition-all duration-300 ${
            selectedType === 'COLLABORATION' ? 'text-cyan-400 scale-110' : 'text-white/40 group-hover:text-cyan-400 group-hover:scale-110'
          }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <div className="font-bold text-xl text-white/90 mb-2">Collaboration</div>
          <div className="text-sm text-white/60">Find team members and build something amazing together</div>
        </button>
      </div>
    </div>
  );
}
