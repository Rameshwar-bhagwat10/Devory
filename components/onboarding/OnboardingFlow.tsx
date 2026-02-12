'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';

interface Option {
  value: string;
  label: string;
  description?: string;
}

interface Question {
  id: string;
  question: string;
  options: Option[];
  layout: 'large-cards' | 'grid' | 'horizontal' | 'vertical';
  dependsOn?: string;
  showWhen?: (answers: Partial<OnboardingData>) => boolean;
}

// Question 1: Degree Program
const DEGREE_OPTIONS: Option[] = [
  { value: 'BTECH', label: 'B.Tech' },
  { value: 'BE', label: 'B.E' },
  { value: 'BCA', label: 'BCA' },
  { value: 'MCA', label: 'MCA' },
  { value: 'BSC_CS', label: 'B.Sc Computer Science' },
  { value: 'MSC_CS', label: 'M.Sc Computer Science' },
  { value: 'DIPLOMA', label: 'Diploma' },
  { value: 'OTHER', label: 'Other' },
];

// Branch options for B.Tech/B.E
const BTECH_BE_BRANCHES: Option[] = [
  { value: 'COMPUTER_SCIENCE', label: 'Computer Science & Engineering' },
  { value: 'INFORMATION_TECHNOLOGY', label: 'Information Technology' },
  { value: 'AI_ML', label: 'Artificial Intelligence & ML' },
  { value: 'DATA_SCIENCE', label: 'Data Science & Engineering' },
  { value: 'SOFTWARE_ENGINEERING', label: 'Software Engineering' },
  { value: 'ELECTRONICS', label: 'Electronics & Communication' },
  { value: 'ELECTRICAL', label: 'Electrical Engineering' },
  { value: 'MECHANICAL', label: 'Mechanical Engineering' },
  { value: 'CIVIL', label: 'Civil Engineering' },
  { value: 'CHEMICAL', label: 'Chemical Engineering' },
  { value: 'BIOTECHNOLOGY', label: 'Biotechnology' },
  { value: 'CYBER_SECURITY', label: 'Cyber Security' },
  { value: 'IOT', label: 'Internet of Things' },
  { value: 'OTHER', label: 'Other' },
];

// Branch options for BCA/MCA
const BCA_MCA_BRANCHES: Option[] = [
  { value: 'GENERAL', label: 'General' },
  { value: 'WEB_DEVELOPMENT', label: 'Web Development' },
  { value: 'MOBILE_DEVELOPMENT', label: 'Mobile Application Development' },
  { value: 'DATA_ANALYTICS', label: 'Data Analytics' },
  { value: 'CLOUD_COMPUTING', label: 'Cloud Computing' },
  { value: 'CYBER_SECURITY', label: 'Cyber Security' },
  { value: 'AI_ML', label: 'Artificial Intelligence & ML' },
  { value: 'OTHER', label: 'Other' },
];

// Branch options for B.Sc/M.Sc CS
const BSC_MSC_BRANCHES: Option[] = [
  { value: 'GENERAL', label: 'General Computer Science' },
  { value: 'DATA_SCIENCE', label: 'Data Science' },
  { value: 'SOFTWARE_DEVELOPMENT', label: 'Software Development' },
  { value: 'NETWORKING', label: 'Computer Networks' },
  { value: 'AI_ML', label: 'Artificial Intelligence' },
  { value: 'OTHER', label: 'Other' },
];

// Branch options for Diploma
const DIPLOMA_BRANCHES: Option[] = [
  { value: 'COMPUTER_ENGINEERING', label: 'Computer Engineering' },
  { value: 'INFORMATION_TECHNOLOGY', label: 'Information Technology' },
  { value: 'ELECTRONICS', label: 'Electronics' },
  { value: 'MECHANICAL', label: 'Mechanical' },
  { value: 'CIVIL', label: 'Civil' },
  { value: 'OTHER', label: 'Other' },
];

// Academic Year options (dynamic based on degree)
const YEAR_OPTIONS_4: Option[] = [
  { value: 'FIRST_YEAR', label: 'First Year' },
  { value: 'SECOND_YEAR', label: 'Second Year' },
  { value: 'THIRD_YEAR', label: 'Third Year' },
  { value: 'FINAL_YEAR', label: 'Final Year' },
];

const YEAR_OPTIONS_3: Option[] = [
  { value: 'FIRST_YEAR', label: 'First Year' },
  { value: 'SECOND_YEAR', label: 'Second Year' },
  { value: 'FINAL_YEAR', label: 'Final Year' },
];

const YEAR_OPTIONS_2: Option[] = [
  { value: 'FIRST_YEAR', label: 'First Year' },
  { value: 'SECOND_YEAR', label: 'Second Year' },
];

// Primary Interest options
const INTEREST_OPTIONS: Option[] = [
  { value: 'WEB_DEVELOPMENT', label: 'Web Development' },
  { value: 'MOBILE_DEVELOPMENT', label: 'Mobile Applications' },
  { value: 'MACHINE_LEARNING', label: 'AI & Machine Learning' },
  { value: 'DATA_SCIENCE', label: 'Data Science & Analytics' },
  { value: 'BACKEND', label: 'Backend & Systems' },
  { value: 'DEVOPS', label: 'DevOps & Cloud' },
  { value: 'GAME_DEVELOPMENT', label: 'Game Development' },
  { value: 'BLOCKCHAIN', label: 'Blockchain & Web3' },
  { value: 'CYBER_SECURITY', label: 'Cyber Security' },
  { value: 'IOT', label: 'IoT & Embedded Systems' },
  { value: 'UI_UX', label: 'UI/UX Design' },
  { value: 'OPEN_TO_EXPLORE', label: 'Open to Explore' },
];

// Skill Level options
const SKILL_OPTIONS: Option[] = [
  { 
    value: 'BEGINNER', 
    label: 'Beginner',
    description: 'Just starting out with programming'
  },
  { 
    value: 'INTERMEDIATE', 
    label: 'Intermediate',
    description: 'Comfortable with basics, building projects'
  },
  { 
    value: 'ADVANCED', 
    label: 'Advanced',
    description: 'Experienced with complex projects'
  },
];

// Helper function to get branch options based on degree
const getBranchOptions = (degree?: string): Option[] => {
  if (!degree) return [];
  
  switch (degree) {
    case 'BTECH':
    case 'BE':
      return BTECH_BE_BRANCHES;
    case 'BCA':
    case 'MCA':
      return BCA_MCA_BRANCHES;
    case 'BSC_CS':
    case 'MSC_CS':
      return BSC_MSC_BRANCHES;
    case 'DIPLOMA':
      return DIPLOMA_BRANCHES;
    case 'OTHER':
      return [{ value: 'GENERAL', label: 'General' }];
    default:
      return [];
  }
};

// Helper function to get year options based on degree
const getYearOptions = (degree?: string): Option[] => {
  if (!degree) return YEAR_OPTIONS_4;
  
  switch (degree) {
    case 'BTECH':
    case 'BE':
      return YEAR_OPTIONS_4;
    case 'BCA':
    case 'BSC_CS':
    case 'DIPLOMA':
      return YEAR_OPTIONS_3;
    case 'MCA':
    case 'MSC_CS':
      return YEAR_OPTIONS_2;
    default:
      return YEAR_OPTIONS_4;
  }
};

// Define all questions with conditional logic
const ALL_QUESTIONS: Question[] = [
  {
    id: 'degree',
    question: 'What degree are you pursuing?',
    options: DEGREE_OPTIONS,
    layout: 'grid',
  },
  {
    id: 'branch',
    question: 'What is your primary specialization?',
    options: [], // Will be populated dynamically
    layout: 'grid',
    dependsOn: 'degree',
    showWhen: (answers) => !!answers.degree,
  },
  {
    id: 'year',
    question: 'Which year are you currently in?',
    options: [], // Will be populated dynamically
    layout: 'horizontal',
    dependsOn: 'degree',
    showWhen: (answers) => !!answers.degree,
  },
  {
    id: 'interest',
    question: 'What kind of projects are you most interested in?',
    options: INTEREST_OPTIONS,
    layout: 'grid',
  },
  {
    id: 'skillLevel',
    question: 'How would you describe your current skill level?',
    options: SKILL_OPTIONS,
    layout: 'vertical',
  },
];

interface OnboardingData {
  degree: string;
  branch: string;
  year: string;
  interest: string;
  skillLevel: string;
}

export default function OnboardingFlow({ userId: _userId, callbackUrl }: { userId: string; callbackUrl?: string }) {
  const { update } = useSession();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<OnboardingData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Generate dynamic questions based on answers
  const getQuestions = () => {
    return ALL_QUESTIONS.filter(q => {
      if (q.showWhen) {
        return q.showWhen(answers);
      }
      return true;
    }).map(q => {
      // Populate dynamic options
      if (q.id === 'branch') {
        return { ...q, options: getBranchOptions(answers.degree) };
      }
      if (q.id === 'year') {
        return { ...q, options: getYearOptions(answers.degree) };
      }
      return q;
    });
  };

  const questions = getQuestions();
  const currentQuestion = questions[currentStep];
  const totalSteps = questions.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;
  const currentAnswer = currentQuestion ? answers[currentQuestion.id as keyof OnboardingData] : undefined;

  const handleSelect = (value: string) => {
    const questionId = currentQuestion.id;
    
    setAnswers(prev => {
      const newAnswers = {
        ...prev,
        [questionId]: value,
      };
      
      // Clear dependent answers when changing a parent answer
      if (questionId === 'degree') {
        delete newAnswers.branch;
        delete newAnswers.year;
      }
      
      return newAnswers;
    });
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          degree: answers.degree,
          branch: answers.branch,
          academicYear: answers.year,
          primaryInterest: answers.interest,
          skillLevel: answers.skillLevel,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to complete onboarding');
      }

      // Update the session with new onboardingComplete status
      await update({
        onboardingComplete: true,
      });

      setShowSuccess(true);
      
      // Redirect to callbackUrl or dashboard after showing success message
      setTimeout(() => {
        window.location.href = callbackUrl || '/dashboard';
      }, 1500);
    } catch (error) {
      console.error('Onboarding error:', error);
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="w-full max-w-2xl mx-auto text-center">
        <div className="bg-glass-5 border border-border-10 rounded-lg p-12">
          <div className="mb-4">
            <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">You&apos;re all set!</h2>
          <p className="text-text-60">Preparing your personalized experience...</p>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return null;
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-text-60">
            Step {currentStep + 1} of {totalSteps}
          </span>
          <span className="text-sm text-text-60">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="h-2 bg-glass-5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-primary transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-glass-5 border border-border-10 rounded-lg p-8 mb-6 transition-all duration-300">
        <h2 className="text-2xl font-bold text-white mb-8">
          {currentQuestion.question}
        </h2>

        {/* Options */}
        <div className={`
          ${currentQuestion.layout === 'large-cards' ? 'grid grid-cols-1 gap-3' : ''}
          ${currentQuestion.layout === 'grid' ? 'grid grid-cols-2 gap-3' : ''}
          ${currentQuestion.layout === 'horizontal' ? 'grid grid-cols-2 md:grid-cols-4 gap-3' : ''}
          ${currentQuestion.layout === 'vertical' ? 'space-y-3' : ''}
        `}>
          {currentQuestion.options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className={`
                p-4 rounded-lg border-2 text-left transition-all
                ${currentAnswer === option.value
                  ? 'border-accent-orange bg-accent-orange/10'
                  : 'border-border-10 bg-transparent hover:border-border-20 hover:bg-glass-10'
                }
                focus:outline-none focus:ring-2 focus:ring-accent-orange/50
              `}
            >
              <div className="font-medium text-text-90">{option.label}</div>
              {option.description ? (
                <div className="text-sm text-text-60 mt-1">{option.description}</div>
              ) : null}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={handleBack}
          disabled={currentStep === 0}
          className="px-6 py-3 text-text-60 hover:text-text-90 transition-colors disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none"
        >
          ← Back
        </button>

        <button
          type="button"
          onClick={handleNext}
          disabled={!currentAnswer || isSubmitting}
          className="px-8 py-3 bg-gradient-primary text-white font-medium rounded-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 focus:outline-none"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Saving...
            </span>
          ) : currentStep === totalSteps - 1 ? (
            'Finish'
          ) : (
            'Next →'
          )}
        </button>
      </div>
    </div>
  );
}
