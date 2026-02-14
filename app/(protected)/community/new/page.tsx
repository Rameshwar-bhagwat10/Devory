import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import CreatePostForm from '@/components/community/CreatePostForm';

export const metadata = {
  title: 'Create Post | Devory Community',
  description: 'Share your project idea or find collaborators',
};

export default async function CreatePostPage() {
  const session = await auth();

  if (!session) {
    redirect('/auth?callbackUrl=/community/new');
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Create Post</h1>
        <p className="text-white/60">Share your project idea or find collaborators</p>
      </div>

      {/* Form */}
      <CreatePostForm />
    </div>
  );
}
