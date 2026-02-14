import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { SaveService } from '@/features/community/save.service';

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { postId } = await req.json();

    if (!postId) {
      return NextResponse.json({ error: 'Missing postId' }, { status: 400 });
    }

    const result = await SaveService.toggleSave(session.user.id, postId);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Save post error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to save post' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const postId = searchParams.get('postId');

    if (!postId) {
      return NextResponse.json({ error: 'Missing postId' }, { status: 400 });
    }

    const isSaved = await SaveService.isSaved(session.user.id, postId);
    return NextResponse.json({ isSaved });
  } catch (error: any) {
    console.error('Check saved error:', error);
    return NextResponse.json(
      { error: 'Failed to check saved status' },
      { status: 500 }
    );
  }
}
