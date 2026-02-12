import { requireAuth } from '@/lib/auth-helpers';
import { prisma } from '@/lib/prisma';
import DashboardClient from '@/components/dashboard/DashboardClient';

// Map database values to display labels
const DEGREE_LABELS: Record<string, string> = {
  BTECH: 'B.Tech',
  BE: 'B.E',
  BCA: 'BCA',
  MCA: 'MCA',
  OTHER: 'Other',
};

const BRANCH_LABELS: Record<string, string> = {
  COMPUTER_ENGINEERING: 'Computer Engineering',
  INFORMATION_TECHNOLOGY: 'Information Technology',
  AI_ML: 'AI & ML',
  DATA_SCIENCE: 'Data Science',
  ELECTRONICS: 'Electronics',
  OTHER: 'Other',
};

const YEAR_LABELS: Record<string, string> = {
  FIRST_YEAR: 'First Year',
  SECOND_YEAR: 'Second Year',
  THIRD_YEAR: 'Third Year',
  FINAL_YEAR: 'Final Year',
};

const INTEREST_LABELS: Record<string, string> = {
  WEB_DEVELOPMENT: 'Web Development',
  MOBILE_DEVELOPMENT: 'Mobile Development',
  MACHINE_LEARNING: 'AI & ML',
  DATA_SCIENCE: 'Data Science',
  BACKEND: 'Backend Development',
  OPEN_TO_EXPLORE: 'Open to Explore',
};

const SKILL_LABELS: Record<string, string> = {
  BEGINNER: 'Beginner',
  INTERMEDIATE: 'Intermediate',
  ADVANCED: 'Advanced',
};

export default async function DashboardPage() {
  const session = await requireAuth();
  
  // Fetch user profile data
  const userProfile = await prisma.userProfile.findUnique({
    where: { userId: session.user.id },
  });

  // Extract onboarding data from audit logs if profile doesn't have it
  const onboardingLog = await prisma.auditLog.findFirst({
    where: {
      userId: session.user.id,
      action: 'onboarding_completed',
    },
    orderBy: { createdAt: 'desc' },
  });

  let onboardingData = {
    degree: 'Not Set',
    branch: 'Not Set',
    year: 'Not Set',
    interest: 'Not Set',
    skillLevel: 'Not Set',
  };

  if (onboardingLog?.metadata) {
    try {
      const metadata = JSON.parse(onboardingLog.metadata);
      onboardingData = {
        degree: DEGREE_LABELS[metadata.degree] || metadata.degree || 'Not Set',
        branch: BRANCH_LABELS[metadata.branch] || metadata.branch || 'Not Set',
        year: YEAR_LABELS[metadata.academicYear] || metadata.academicYear || 'Not Set',
        interest: INTEREST_LABELS[metadata.primaryInterest] || metadata.primaryInterest || 'Not Set',
        skillLevel: SKILL_LABELS[metadata.skillLevel] || metadata.skillLevel || 'Not Set',
      };
    } catch (error) {
      console.error('Error parsing onboarding metadata:', error);
    }
  } else if (userProfile) {
    // Fallback to profile data
    onboardingData = {
      degree: 'Not Set',
      branch: 'Not Set',
      year: YEAR_LABELS[userProfile.academicYear || ''] || userProfile.academicYear || 'Not Set',
      interest: userProfile.preferredDomains?.[0] 
        ? INTEREST_LABELS[userProfile.preferredDomains[0]] || userProfile.preferredDomains[0]
        : 'Not Set',
      skillLevel: SKILL_LABELS[userProfile.skillLevel || ''] || userProfile.skillLevel || 'Not Set',
    };
  }

  const userName = session.user.name || session.user.email?.split('@')[0] || 'there';

  return (
    <DashboardClient
      userName={userName}
      userInterest={onboardingData.interest}
      profileData={onboardingData}
    />
  );
}
