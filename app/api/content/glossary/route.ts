import { NextResponse } from 'next/server';
import { getGlossaryTerms } from '@/lib/content';
import { writeJson } from '@/lib/api-utils';

export async function GET() {
  try {
    const terms = await getGlossaryTerms();
    return NextResponse.json(terms);
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { slug } = data;
    if (!slug) return NextResponse.json({ error: 'Slug required' }, { status: 400 });
    await writeJson('glossary', slug, data);
    return NextResponse.json({ success: true, slug });
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
