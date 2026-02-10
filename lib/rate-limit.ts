export function rateLimit(limit: number, window: number) {
  // Placeholder - will be implemented in Phase 19
  console.log('Rate limit config:', limit, window);
  return async (userId: string) => {
    console.log('Checking rate limit for user:', userId);
    return { success: true };
  };
}
