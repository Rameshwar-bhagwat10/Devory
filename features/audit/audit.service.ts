import { prisma } from '@/lib/prisma';

/**
 * Non-blocking audit log service
 * Logs are created asynchronously without blocking the main request
 */
export class AuditService {
  /**
   * Log project view (non-blocking)
   * Uses fire-and-forget pattern to avoid blocking page render
   */
  static logProjectView(userId: string, projectId: string): void {
    // Fire and forget - don't await
    prisma.auditLog.create({
      data: {
        userId,
        action: 'project_viewed',
        resource: 'project',
        resourceId: projectId,
      },
    }).catch((error) => {
      // Log error but don't throw - this is non-critical
      console.error('Failed to log project view:', error);
    });
  }

  /**
   * Batch log multiple events (non-blocking)
   */
  static logBatch(logs: Array<{
    userId: string;
    action: string;
    resource: string;
    resourceId: string;
  }>): void {
    prisma.auditLog.createMany({
      data: logs,
      skipDuplicates: true,
    }).catch((error) => {
      console.error('Failed to batch log events:', error);
    });
  }
}
