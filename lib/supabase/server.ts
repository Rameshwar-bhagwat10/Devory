// Supabase client for server-side operations
export const createServerClient = () => {
  return {
    auth: {
      getUser: async () => ({ data: null, error: null }),
    },
  };
};
