// Supabase client for client-side operations
export const supabase = {
  auth: {
    signIn: async () => ({ data: null, error: null }),
    signOut: async () => ({ error: null }),
  },
};
