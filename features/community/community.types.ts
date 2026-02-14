import { PostType, ProjectDifficulty, ProjectDomain, CollaborationStatus, ReactionType } from '@prisma/client';

export interface CreatePostInput {
  type: PostType;
  title: string;
  shortDescription: string;
  fullDescription: string;
  domain: ProjectDomain;
  difficulty: ProjectDifficulty;
  techStack: string[];
  tags: string[];
  estimatedDuration?: string;
  requiredCollaborators?: number;
  requiredSkills?: string[];
  isAnonymous?: boolean;
}

export interface FeedFilters {
  type?: PostType;
  domain?: ProjectDomain;
  difficulty?: ProjectDifficulty;
  status?: CollaborationStatus;
  sortBy?: 'trending' | 'latest' | 'popular';
  page?: number;
  limit?: number;
}

export interface PostWithAuthor {
  id: string;
  userId: string;
  type: PostType;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  domain: ProjectDomain;
  difficulty: ProjectDifficulty;
  techStack: string[];
  tags: string[];
  estimatedDuration: string | null;
  viewsCount: number;
  likesCount: number;
  dislikesCount: number;
  commentsCount: number;
  trendingScore: number;
  status: CollaborationStatus;
  requiredCollaborators: number | null;
  currentCollaborators: number;
  requiredSkills: string[];
  isAnonymous: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
  userReaction?: ReactionType | null;
  isSaved?: boolean;
}

export interface CommentWithAuthor {
  id: string;
  postId: string;
  userId: string;
  parentId: string | null;
  content: string;
  likesCount: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
  replies?: CommentWithAuthor[];
}

export interface TrendingPost {
  id: string;
  title: string;
  slug: string;
  type: PostType;
  domain: ProjectDomain;
  viewsCount: number;
  likesCount: number;
  commentsCount: number;
  trendingScore: number;
  createdAt: Date;
}

export interface CollaborationPost {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  status: CollaborationStatus;
  requiredCollaborators: number | null;
  currentCollaborators: number;
  requiredSkills: string[];
  createdAt: Date;
}
