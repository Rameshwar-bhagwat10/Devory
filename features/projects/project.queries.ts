export const projectQueries = {
  all: ['projects'] as const,
  detail: (id: string) => ['projects', id] as const,
};
