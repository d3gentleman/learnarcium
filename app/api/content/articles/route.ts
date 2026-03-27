import { NextResponse } from 'next/server';
import { getKnowledgeArticles } from '@/lib/content';
import { writeJson } from '@/lib/api-utils';

export async function GET() {
  try {
    const articles = await getKnowledgeArticles();
    return NextResponse.json(articles);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { slug } = data;
    
    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    // Write to JSON folder 'knowledge-articles'
    await writeJson('knowledge-articles', slug, data);
    
    return NextResponse.json({ success: true, slug });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
  }
}
