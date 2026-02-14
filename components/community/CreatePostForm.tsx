'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PostType, ProjectDifficulty, ProjectDomain } from '@prisma/client';
import { validateTitle, validateDescription } from '@/lib/community-utils';
import FormProgressBar from './FormProgressBar';
import PostTypeSelector from './PostTypeSelector';
import PostFormFields from './PostFormFields';

export default function CreatePostForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    type: 'IDEA' as PostType,
    title: '',
    shortDescription: '',
    fullDescription: '',
    domain: '' as ProjectDomain | '',
    difficulty: '' as ProjectDifficulty | '',
    tags: [] as string[],
    techStack: [] as string[],
    estimatedDuration: '',
    requiredCollaborators: '',
    requiredSkills: [] as string[],
    isAnonymous: false,
  });

  const [tagInput, setTagInput] = useState('');
  const [techInput, setTechInput] = useState('');
  const [skillInput, setSkillInput] = useState('');

  // Calculate form completion percentage
  const getCompletionPercentage = () => {
    let completed = 0;
    let total = 8;

    if (formData.title) completed++;
    if (formData.shortDescription) completed++;
    if (formData.fullDescription) completed++;
    if (formData.domain) completed++;
    if (formData.difficulty) completed++;
    if (formData.tags.length > 0) completed++;
    if (formData.techStack.length > 0) completed++;
    if (formData.type === 'COLLABORATION') {
      total++;
      if (formData.requiredCollaborators) completed++;
    }
    if (formData.estimatedDuration) completed++;

    return Math.round((completed / total) * 100);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    // Validation
    const titleValidation = validateTitle(formData.title);
    if (!titleValidation.valid) {
      setError(titleValidation.error!);
      return;
    }

    const shortDescValidation = validateDescription(formData.shortDescription, 20);
    if (!shortDescValidation.valid) {
      setError(shortDescValidation.error!);
      return;
    }

    const fullDescValidation = validateDescription(formData.fullDescription, 50);
    if (!fullDescValidation.valid) {
      setError(fullDescValidation.error!);
      return;
    }

    if (!formData.domain) {
      setError('Please select a domain');
      return;
    }

    if (!formData.difficulty) {
      setError('Please select a difficulty level');
      return;
    }

    if (formData.type === 'COLLABORATION' && !formData.requiredCollaborators) {
      setError('Please specify required collaborators');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/community', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          requiredCollaborators: formData.requiredCollaborators
            ? parseInt(formData.requiredCollaborators)
            : undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create post');
      }

      router.push(`/community/${data.slug}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create post');
      setIsSubmitting(false);
    }
  };

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (trimmed && !formData.tags.includes(trimmed) && formData.tags.length < 10) {
      setFormData({ ...formData, tags: [...formData.tags, trimmed] });
      setTagInput('');
    }
  };

  const addTech = (tech: string) => {
    const trimmed = tech.trim();
    if (trimmed && !formData.techStack.includes(trimmed) && formData.techStack.length < 10) {
      setFormData({ ...formData, techStack: [...formData.techStack, trimmed] });
      setTechInput('');
    }
  };

  const addSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (trimmed && !formData.requiredSkills.includes(trimmed) && formData.requiredSkills.length < 10) {
      setFormData({ ...formData, requiredSkills: [...formData.requiredSkills, trimmed] });
      setSkillInput('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <FormProgressBar percentage={getCompletionPercentage()} />

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm flex items-start gap-3 animate-slide-in">
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="font-semibold">Error</p>
              <p className="text-xs mt-0.5">{error}</p>
            </div>
          </div>
        )}

        <PostTypeSelector
          selectedType={formData.type}
          onTypeChange={(type) => setFormData({ ...formData, type })}
        />

        <PostFormFields
          formData={formData}
          onFormDataChange={setFormData}
          tagInput={tagInput}
          setTagInput={setTagInput}
          techInput={techInput}
          setTechInput={setTechInput}
          skillInput={skillInput}
          setSkillInput={setSkillInput}
          addTag={addTag}
          addTech={addTech}
          addSkill={addSkill}
        />

        {/* Submit Buttons - Enhanced */}
        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 px-6 py-4 bg-white/5 border border-white/10 text-white/90 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all font-medium flex items-center justify-center gap-2 group"
            disabled={isSubmitting}
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || getCompletionPercentage() < 100}
            className="flex-1 px-6 py-4 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white font-bold rounded-xl hover:scale-105 hover:shadow-2xl hover:shadow-purple-600/30 transition-all shadow-lg shadow-purple-600/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-lg flex items-center justify-center gap-2 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity"></div>
            {isSubmitting ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Post...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                {getCompletionPercentage() < 100 ? `Complete Form (${getCompletionPercentage()}%)` : 'Publish Post'}
              </>
            )}
          </button>
        </div>
      </form>

      <style jsx>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-slide-in,
          .animate-scale-in {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
