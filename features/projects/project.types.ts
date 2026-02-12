export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  domain: string;
  techStack: string[];
  estimatedHours?: number;
  primaryTechnology?: string;
  createdAt: Date;
}

export interface ProjectDetail extends Project {
  longDescription?: string;
  features: string[];
  learningOutcomes: string[];
  prerequisites: string[];
  tags: string[];
}

// Project filter interface with all available filter options
export interface ProjectFilters {
  search?: string;
  domains?: string[];
  difficulties?: string[];
  techStack?: string[];
  years?: string[];
  durations?: string[];
  page?: number;
  limit?: number;
}

export interface ProjectListResponse {
  projects: Project[];
  total: number;
  page: number;
  totalPages: number;
}
