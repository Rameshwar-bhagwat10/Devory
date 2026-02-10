import { NextRequest } from 'next/server';
import { withAuth, apiError, apiSuccess } from '@/lib/api-guards';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  return withAuth(async (session) => {
    try {
      const body = await request.json();
      const { preferredDomains, skillLevel, academicYear, institution } = body;
      
      // Validate required fields
      if (!preferredDomains || preferredDomains.length === 0) {
        return apiError('At least one domain is required', 400);
      }
      
      if (!skillLevel) {
        return apiError('Skill level is required', 400);
      }
      
      // Update user profile
      await prisma.userProfile.update({
        where: { userId: session.user!.id },
        data: {
          preferredDomains,
          skillLevel,
          academicYear: academicYear || null,
          institution: institution || null,
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
        },
      });
      
      return apiSuccess({ message: 'Onboarding completed successfully' });
    } catch (error) {
      console.error('Onboarding error:', error);
      return apiError('Failed to complete onboarding', 500);
    }
  });
}
