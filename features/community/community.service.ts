interface PostData {
  title: string;
  content: string;
}

export class CommunityService {
  static async getPosts() {
    return [];
  }

  static async createPost(data: PostData): Promise<{ success: boolean }> {
    // Placeholder - will be implemented in Phase 13
    console.log('Creating post:', data);
    return { success: true };
  }
}
