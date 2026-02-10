interface ProjectData {
  title: string;
  description: string;
}

export class ProjectService {
  static async getProjects() {
    return [];
  }

  static async getProjectById(id: string) {
    // Placeholder - will be implemented in Phase 9
    console.log('Getting project:', id);
    return { id };
  }

  static async createProject(data: ProjectData): Promise<{ success: boolean }> {
    // Placeholder - will be implemented in Phase 9
    console.log('Creating project:', data);
    return { success: true };
  }
}
