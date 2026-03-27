import { NextResponse } from 'next/server';
import { readJson, writeJson, deleteJson } from '@/lib/api-utils';

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;
  const data = await readJson('knowledge-categories', slug);
  if (!data) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(data);
}

export async function PUT(req: Request, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params;
    const body = await req.json();
    await writeJson('knowledge-categories', slug, body);
    return NextResponse.json({ success: true, slug });
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params;
    await deleteJson('knowledge-categories', slug);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
