import { PostType, ProjectDifficulty, ProjectDomain } from '@prisma/client';

const DOMAIN_OPTIONS = [
  'WEB_DEVELOPMENT',
  'MOBILE_DEVELOPMENT',
  'AI_ML',
  'BLOCKCHAIN',
  'CLOUD_COMPUTING',
  'CYBERSECURITY',
  'DATA_SCIENCE',
  'GAME_DEVELOPMENT',
  'IOT',
  'DEVOPS',
];

const DIFFICULTY_OPTIONS: ProjectDifficulty[] = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'];

const POPULAR_TAGS = [
  'React', 'Node.js', 'Python', 'TypeScript', 'AI', 'Machine Learning',
  'Blockchain', 'Web3', 'Mobile', 'Cloud', 'DevOps', 'Security',
];

const POPULAR_TECH = [
  'React', 'Next.js', 'Node.js', 'Python', 'TypeScript', 'MongoDB',
  'PostgreSQL', 'Docker', 'AWS', 'Firebase', 'TensorFlow', 'PyTorch',
];

interface FormData {
  type: PostType;
  title: string;
  shortDescription: string;
  fullDescription: string;
  domain: ProjectDomain | '';
  difficulty: ProjectDifficulty | '';
  tags: string[];
  techStack: string[];
  estimatedDuration: string;
  requiredCollaborators: string;
  requiredSkills: string[];
  isAnonymous: boolean;
}

interface PostFormFieldsProps {
  formData: FormData;
  onFormDataChange: (data: FormData) => void;
  tagInput: string;
  setTagInput: (value: string) => void;
  techInput: string;
  setTechInput: (value: string) => void;
  skillInput: string;
  setSkillInput: (value: string) => void;
  addTag: (tag: string) => void;
  addTech: (tech: string) => void;
  addSkill: (skill: string) => void;
}

export default function PostFormFields({
  formData,
  onFormDataChange,
  tagInput,
  setTagInput,
  techInput,
  setTechInput,
  skillInput,
  setSkillInput,
  addTag,
  addTech,
  addSkill,
}: PostFormFieldsProps) {
  return (
    <div className="space-y-6">
      {/* Title - Enhanced */}
      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300">
        <div className="flex items-center justify-between mb-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-white/90">
            <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
            Title <span className="text-red-400">*</span>
          </label>
          {formData.title && (
            <svg className="w-5 h-5 text-green-400 animate-scale-in" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          )}
        </div>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => onFormDataChange({ ...formData, title: e.target.value })}
          placeholder="Enter a catchy, descriptive title..."
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white/90 placeholder-white/40 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
          maxLength={200}
          required
        />
        <div className="mt-2 flex items-center justify-between">
          <div className="text-xs text-white/50">Make it clear and engaging</div>
          <div className={`text-xs font-medium transition-colors ${
            formData.title.length > 180 ? 'text-orange-400' : 'text-white/40'
          }`}>
            {formData.title.length}/200
          </div>
        </div>
      </div>

      {/* Short Description - Enhanced */}
      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300">
        <div className="flex items-center justify-between mb-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-white/90">
            <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
            </svg>
            Short Description <span className="text-red-400">*</span>
          </label>
          {formData.shortDescription && (
            <svg className="w-5 h-5 text-green-400 animate-scale-in" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          )}
        </div>
        <textarea
          value={formData.shortDescription}
          onChange={(e) => onFormDataChange({ ...formData, shortDescription: e.target.value })}
          placeholder="Write a brief, engaging summary that will appear in the community feed..."
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white/90 placeholder-white/40 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
          rows={3}
          maxLength={500}
          required
        />
        <div className="mt-2 flex items-center justify-between">
          <div className="text-xs text-white/50">This appears in the feed preview</div>
          <div className={`text-xs font-medium transition-colors ${
            formData.shortDescription.length > 450 ? 'text-orange-400' : 'text-white/40'
          }`}>
            {formData.shortDescription.length}/500
          </div>
        </div>
      </div>

      {/* Full Description - Enhanced */}
      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300">
        <div className="flex items-center justify-between mb-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-white/90">
            <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Full Description <span className="text-red-400">*</span>
          </label>
          {formData.fullDescription && (
            <svg className="w-5 h-5 text-green-400 animate-scale-in" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          )}
        </div>
        <textarea
          value={formData.fullDescription}
          onChange={(e) => onFormDataChange({ ...formData, fullDescription: e.target.value })}
          placeholder="Provide a detailed description of your idea or collaboration request. Include goals, requirements, and any relevant details..."
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white/90 placeholder-white/40 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none"
          rows={8}
          maxLength={5000}
          required
        />
        <div className="mt-2 flex items-center justify-between">
          <div className="text-xs text-white/50">Be detailed and specific</div>
          <div className={`text-xs font-medium transition-colors ${
            formData.fullDescription.length > 4500 ? 'text-orange-400' : 'text-white/40'
          }`}>
            {formData.fullDescription.length}/5000
          </div>
        </div>
      </div>

      {/* Domain & Difficulty - Enhanced */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-white/90">
              <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              Domain <span className="text-red-400">*</span>
            </label>
            {formData.domain && (
              <svg className="w-5 h-5 text-green-400 animate-scale-in" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          <select
            value={formData.domain}
            onChange={(e) => onFormDataChange({ ...formData, domain: e.target.value as ProjectDomain })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white/90 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all cursor-pointer"
            required
          >
            <option value="" className="bg-[#0a0a0a]">Select domain...</option>
            {DOMAIN_OPTIONS.map((domain) => (
              <option key={domain} value={domain} className="bg-[#0a0a0a]">
                {domain.replace(/_/g, ' ')}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-white/90">
              <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Difficulty <span className="text-red-400">*</span>
            </label>
            {formData.difficulty && (
              <svg className="w-5 h-5 text-green-400 animate-scale-in" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          <select
            value={formData.difficulty}
            onChange={(e) => onFormDataChange({ ...formData, difficulty: e.target.value as ProjectDifficulty })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white/90 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
            required
          >
            <option value="" className="bg-[#0a0a0a]">Select difficulty...</option>
            {DIFFICULTY_OPTIONS.map((diff) => (
              <option key={diff} value={diff} className="bg-[#0a0a0a]">
                {diff}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tags - Enhanced */}
      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300">
        <div className="flex items-center gap-2 mb-3">
          <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
          </svg>
          <label className="text-sm font-semibold text-white/90">Tags</label>
          <span className="text-xs text-white/50 ml-auto">{formData.tags.length}/10</span>
        </div>
        {formData.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4 animate-slide-in">
            {formData.tags.map((tag, index) => (
              <span
                key={index}
                className="group px-3 py-1.5 bg-gradient-to-r from-purple-500/20 to-purple-600/20 border border-purple-500/40 text-purple-300 text-sm rounded-lg flex items-center gap-2 hover:border-purple-400 transition-all animate-scale-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                #{tag}
                <button
                  type="button"
                  onClick={() => onFormDataChange({ ...formData, tags: formData.tags.filter((_, i) => i !== index) })}
                  className="hover:text-purple-200 transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        )}
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag(tagInput))}
            placeholder="Add a tag..."
            className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white/90 placeholder-white/40 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-sm transition-all"
            disabled={formData.tags.length >= 10}
          />
          <button
            type="button"
            onClick={() => addTag(tagInput)}
            disabled={formData.tags.length >= 10}
            className="px-5 py-2.5 bg-gradient-to-r from-purple-500/20 to-purple-600/20 border border-purple-500/40 text-purple-300 rounded-lg hover:from-purple-500/30 hover:to-purple-600/30 hover:border-purple-400 transition-all text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-white/50 w-full mb-1">Popular tags:</span>
          {POPULAR_TAGS.filter(t => !formData.tags.includes(t)).slice(0, 8).map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => addTag(tag)}
              disabled={formData.tags.length >= 10}
              className="px-2.5 py-1 bg-white/5 border border-white/10 text-white/60 text-xs rounded-md hover:border-purple-500/40 hover:text-purple-400 hover:bg-purple-500/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Tech Stack - Enhanced */}
      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300">
        <div className="flex items-center gap-2 mb-3">
          <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          <label className="text-sm font-semibold text-white/90">Tech Stack</label>
          <span className="text-xs text-white/50 ml-auto">{formData.techStack.length}/10</span>
        </div>
        {formData.techStack.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4 animate-slide-in">
            {formData.techStack.map((tech, index) => (
              <span
                key={index}
                className="group px-3 py-1.5 bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 border border-cyan-500/40 text-cyan-300 text-sm rounded-lg flex items-center gap-2 hover:border-cyan-400 transition-all animate-scale-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {tech}
                <button
                  type="button"
                  onClick={() => onFormDataChange({ ...formData, techStack: formData.techStack.filter((_, i) => i !== index) })}
                  className="hover:text-cyan-200 transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        )}
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTech(techInput))}
            placeholder="Add a technology..."
            className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white/90 placeholder-white/40 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-sm transition-all"
            disabled={formData.techStack.length >= 10}
          />
          <button
            type="button"
            onClick={() => addTech(techInput)}
            disabled={formData.techStack.length >= 10}
            className="px-5 py-2.5 bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 border border-cyan-500/40 text-cyan-300 rounded-lg hover:from-cyan-500/30 hover:to-cyan-600/30 hover:border-cyan-400 transition-all text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-white/50 w-full mb-1">Popular technologies:</span>
          {POPULAR_TECH.filter(t => !formData.techStack.includes(t)).slice(0, 8).map((tech) => (
            <button
              key={tech}
              type="button"
              onClick={() => addTech(tech)}
              disabled={formData.techStack.length >= 10}
              className="px-2.5 py-1 bg-white/5 border border-white/10 text-white/60 text-xs rounded-md hover:border-cyan-500/40 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {tech}
            </button>
          ))}
        </div>
      </div>

      {/* Estimated Duration - Enhanced */}
      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300">
        <div className="flex items-center gap-2 mb-3">
          <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <label className="text-sm font-semibold text-white/90">Estimated Duration</label>
          {formData.estimatedDuration && (
            <svg className="w-5 h-5 text-green-400 ml-auto animate-scale-in" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          )}
        </div>
        <input
          type="text"
          value={formData.estimatedDuration}
          onChange={(e) => onFormDataChange({ ...formData, estimatedDuration: e.target.value })}
          placeholder="e.g., 2-3 weeks, 1 month, 3-6 months..."
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white/90 placeholder-white/40 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
        />
        <div className="mt-2 text-xs text-white/50">How long do you expect this project to take?</div>
      </div>

      {/* Collaboration-specific fields - Enhanced */}
      {formData.type === 'COLLABORATION' && (
        <div className="space-y-6 animate-slide-in">
          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-6 hover:border-cyan-500/40 transition-all duration-300">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-sm font-semibold text-cyan-300">Collaboration Details</span>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <label className="flex items-center gap-2 text-sm font-semibold text-white/90">
                  <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  Required Collaborators <span className="text-red-400">*</span>
                </label>
                {formData.requiredCollaborators && (
                  <svg className="w-5 h-5 text-green-400 animate-scale-in" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <input
                type="number"
                value={formData.requiredCollaborators}
                onChange={(e) => onFormDataChange({ ...formData, requiredCollaborators: e.target.value })}
                placeholder="How many team members do you need?"
                className="w-full px-4 py-3 bg-white/5 border border-cyan-500/30 rounded-xl text-white/90 placeholder-white/40 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                min="1"
                max="20"
                required={formData.type === 'COLLABORATION'}
              />
              <div className="mt-2 text-xs text-white/50">Specify how many people you need for this project</div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <label className="text-sm font-semibold text-white/90">Required Skills</label>
                <span className="text-xs text-white/50 ml-auto">{formData.requiredSkills.length}/10</span>
              </div>
              {formData.requiredSkills.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3 animate-slide-in">
                  {formData.requiredSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="group px-3 py-1.5 bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/40 text-blue-300 text-sm rounded-lg flex items-center gap-2 hover:border-blue-400 transition-all animate-scale-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => onFormDataChange({ ...formData, requiredSkills: formData.requiredSkills.filter((_, i) => i !== index) })}
                        className="hover:text-blue-200 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
              )}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill(skillInput))}
                  placeholder="Add a required skill..."
                  className="flex-1 px-4 py-2.5 bg-white/5 border border-blue-500/30 rounded-lg text-white/90 placeholder-white/40 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm transition-all"
                  disabled={formData.requiredSkills.length >= 10}
                />
                <button
                  type="button"
                  onClick={() => addSkill(skillInput)}
                  disabled={formData.requiredSkills.length >= 10}
                  className="px-5 py-2.5 bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/40 text-blue-300 rounded-lg hover:from-blue-500/30 hover:to-blue-600/30 hover:border-blue-400 transition-all text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add
                </button>
              </div>
              <div className="mt-2 text-xs text-white/50">What skills should collaborators have?</div>
            </div>
          </div>
        </div>
      )}

      {/* Anonymous Option - Enhanced */}
      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300">
        <label className="flex items-start gap-4 cursor-pointer group">
          <div className="relative flex items-center">
            <input
              type="checkbox"
              checked={formData.isAnonymous}
              onChange={(e) => onFormDataChange({ ...formData, isAnonymous: e.target.checked })}
              className="w-6 h-6 rounded-lg border-2 border-white/20 bg-white/5 text-purple-600 focus:ring-2 focus:ring-purple-500/30 cursor-pointer transition-all"
            />
            {formData.isAnonymous && (
              <svg className="w-4 h-4 text-purple-400 absolute left-1 pointer-events-none" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <svg className="w-5 h-5 text-white/60 group-hover:text-white/80 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-semibold text-white/90 group-hover:text-white transition-colors">Post Anonymously</span>
            </div>
            <p className="text-xs text-white/60 group-hover:text-white/70 transition-colors">
              Your identity will be hidden. The post will show as &quot;Anonymous User&quot; instead of your name.
            </p>
          </div>
        </label>
      </div>
    </div>
  );
}
