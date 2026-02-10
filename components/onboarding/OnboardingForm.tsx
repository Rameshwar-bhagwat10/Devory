'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const DOMAINS = [
  'WEB_DEVELOPMENT',
  'MOBILE_DEVELOPMENT',
  'DATA_SCIENCE',
  'MACHINE_LEARNING',
  'BLOCKCHAIN',
  'IOT',
  'GAME_DEVELOPMENT',
  'CYBERSECURITY',
  'CLOUD_COMPUTING',
  'OTHER',
];

const SKILL_LEVELS = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'];

export default function OnboardingForm({ userId: _userId }: { userId: string }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    preferredDomains: [] as string[],
    skillLevel: '',
    academicYear: '',
    institution: '',
  });

  const toggleDomain = (domain: string) => {
    setFormData(prev => ({
      ...prev,
      preferredDomains: prev.preferredDomains.includes(domain)
        ? prev.preferredDomains.filter(d => d !== domain)
        : [...prev.preferredDomains, domain],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.preferredDomains.length === 0) {
      setError('Please select at least one domain');
      return;
    }
    
    if (!formData.skillLevel) {
      setError('Please select your skill level');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to complete onboarding');
      }
      
      router.push('/dashboard');
      router.refresh();
    } catch (err) {
      setError('Failed to save preferences. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}
      
      <div>
        <label className="block text-text-primary font-medium mb-3">
          What domains interest you? (Select at least one)
        </label>
        <div className="grid grid-cols-2 gap-2">
          {DOMAINS.map(domain => (
            <button
              key={domain}
              type="button"
              onClick={() => toggleDomain(domain)}
              className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                formData.preferredDomains.includes(domain)
                  ? 'bg-primary/20 border-primary text-primary'
                  : 'bg-bg-elevated border-border-default text-text-secondary hover:border-border-soft'
              }`}
            >
              {domain.replace(/_/g, ' ')}
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <label className="block text-text-primary font-medium mb-3">
          What's your skill level?
        </label>
        <div className="grid grid-cols-3 gap-2">
          {SKILL_LEVELS.map(level => (
            <button
              key={level}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, skillLevel: level }))}
              className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                formData.skillLevel === level
                  ? 'bg-primary/20 border-primary text-primary'
                  : 'bg-bg-elevated border-border-default text-text-secondary hover:border-border-soft'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <label className="block text-text-primary font-medium mb-2">
          Academic Year (Optional)
        </label>
        <input
          type="text"
          value={formData.academicYear}
          onChange={e => setFormData(prev => ({ ...prev, academicYear: e.target.value }))}
          placeholder="e.g., 2nd Year"
          className="w-full px-4 py-3 bg-bg-elevated border border-border-default rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>
      
      <div>
        <label className="block text-text-primary font-medium mb-2">
          Institution (Optional)
        </label>
        <input
          type="text"
          value={formData.institution}
          onChange={e => setFormData(prev => ({ ...prev, institution: e.target.value }))}
          placeholder="e.g., MIT"
          className="w-full px-4 py-3 bg-bg-elevated border border-border-default rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>
      
      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-4 py-3 bg-primary hover:bg-primary-soft text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Saving...' : 'Complete Setup'}
      </button>
    </form>
  );
}
