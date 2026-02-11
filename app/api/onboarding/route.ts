import { NextRequest } from 'next/server';
import { withAuth, apiError, apiSuccess } from '@/lib/api-guards';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  return withAuth(async (session) => {
    try {
      const body = await request.json();
      const { degree, branch, academicYear, primaryInterest, experience, skillLevel, goal } = body;
      
      // Validate required fields
      if (!degree || !branch || !academicYear || !primaryInterest || !skillLevel) {
        return apiError('All required fields must be provided', 400);
      }
      
      // Update or create user profile
      await prisma.userProfile.upsert({
        where: { userId: session.user!.id },
        update: {
          preferredDomains: [primaryInterest],
          skillLevel,
          academicYear,
          bio: JSON.stringify({
            degree,
            branch,
            experience: experience || null,
            goal: goal || null,
          }),
        },
        create: {
          userId: session.user!.id,
          preferredDomains: [primaryInterest],
          skillLevel,
          academicYear,
          bio: JSON.stringify({
            degree,
            branch,
            experience: experience || null,
            goal: goal || null,
          }),
        },
      });
      
      // Mark onboarding as complete
      await prisma.user.update({
        where: { id: session.user!.id },
        data: { onboardingComplete: true },
      });
      
      // Log onboarding completion
      await prisma.auditLog.create({
        data: {
          userId: session.user!.id,
          action: 'onboarding_completed',
          resource: 'user',
          resourceId: session.user!.id,
          metadata: JSON.stringify({
            degree,
            branch,
            academicYear,
            primaryInterest,
            experience,
            skillLevel,
            goal,
          }),
        },
      });
      
      return apiSuccess({ message: 'Onboarding completed successfully' });
    } catch (error) {
      console.error('Onboarding error:', error);
      return apiError('Failed to complete onboarding', 500);
    }
  });
}
