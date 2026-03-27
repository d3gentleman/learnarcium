import { NextResponse } from 'next/server';
import { readJson, writeJson, deleteJson } from '@/lib/api-utils';

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;
  const data = await readJson('knowledge-articles', slug);
  if (!data) return NextResponse.json({ error: 'Article not found' }, { status: 404 });
  return NextResponse.json(data);
}

export async function PUT(req: Request, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params;
    const body = await req.json();
    
    // In Keystatic local storage, if we update the slug in the body, we'd need to rename the file.
    // For now we'll assume the filename (params.slug) is the source of truth.
    await writeJson('knowledge-articles', slug, body);
    
    return NextResponse.json({ success: true, slug });
  } catch {
    return NextResponse.json({ error: 'Failed to update article' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params;
    await deleteJson('knowledge-articles', slug);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 });
  }
}
