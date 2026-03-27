import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../keystatic.config';
import { 
  DiscoveryItem,
  GlossaryTermRecord,
  KnowledgeArticleRecord,
  KnowledgeCategoryRecord,
  ArticleReference, 
  HomepageBlocks, 
  LinkAction, 
  FooterConfig, 
  UIConfig, 
  UIConfig, 
  CategoryColors,
  EcosystemProjectRecord,
} from '../types/domain';
import { 
  NAVIGATION_CONFIG, 
  FOOTER_CONFIG, 
  HOMEPAGE_CONFIG, 
  UI_STRINGS, 
  CATEGORY_COLORS 
} from './config';

const reader = createReader(process.cwd(), keystaticConfig);

export function getKnowledgeArticlePath(slug: string) {
  return `/encyclopedia/articles/${slug}`;
}

export function getKnowledgeCategoryPath(slug: string) {
  return `/encyclopedia/categories/${slug}`;
}

export function getGlossaryTermPath(slug: string) {
  return `/glossary#${slug}`;
}

function collectSearchTerms(values: Array<string | undefined>): string[] {
  return Array.from(
    new Set(
      values
        .flatMap((value) => (value || '').split(/[\s,/]+/))
        .map((value) => value.trim())
        .filter(Boolean)
    )
  );
}

export async function getNavigation(): Promise<LinkAction[]> {
  return NAVIGATION_CONFIG || [];
}

export async function getFooterConfig(): Promise<FooterConfig> {
  return FOOTER_CONFIG || { links: [], metadata: { copyright: '', coords: '', mission: '' } };
}

export async function getHomepageBlocks(): Promise<HomepageBlocks> {
  const allCategories = await getKnowledgeCategories();
  const encyclopediaCategories = allCategories
    .filter((category) => category.group === 'knowledge')
    .map((category) => ({
      id: category.id,
      slug: category.slug,
      tag: category.tag,
      prefix: category.prefix,
      title: category.title,
      description: category.description,
      action: {
        type: 'internal' as const,
        label: 'Open Category',
        href: `/encyclopedia/categories/${category.slug}`,
      },
    }));

  return {
    ...HOMEPAGE_CONFIG,
    encyclopediaCategories,
  } as unknown as HomepageBlocks;
}

export async function getRecentArticles(): Promise<ArticleReference[]> {
  try {
    const articles = await reader.collections.knowledgeArticles.all();
    return articles
      .slice(-3)
      .map(a => ({
        id: a.entry.id,
        slug: a.entry.slug,
        title: a.entry.title,
        tag: a.entry.tag,
        date: a.entry.date || 'REFERENCE',
        action: {
          type: 'internal',
          label: 'Read Article',
          href: `/encyclopedia/articles/${a.slug}`,
        },
      }));
  } catch (e) {
    console.error('Error fetching recent articles:', e);
    return [];
  }
}

export async function getUIConfig(): Promise<UIConfig> {
  return UI_STRINGS;
}

export async function getCategoryColors(): Promise<CategoryColors> {
  return CATEGORY_COLORS;
}

export async function getKnowledgeCategories(): Promise<KnowledgeCategoryRecord[]> {
  try {
    const categories = await reader.collections.knowledgeCategories.all();
    return categories.map(c => c.entry as unknown as KnowledgeCategoryRecord);
  } catch (e) {
    console.error('Error fetching knowledge categories:', e);
    return [];
  }
}

export async function getKnowledgeCategoryBySlug(slug: string): Promise<KnowledgeCategoryRecord | undefined> {
  try {
    const cat = await reader.collections.knowledgeCategories.read(slug);
    return cat ? cat as unknown as KnowledgeCategoryRecord : undefined;
  } catch (e) {
    console.error(`Error reading category ${slug}:`, e);
    return undefined;
  }
}

export async function getKnowledgeCategoryById(id: string): Promise<KnowledgeCategoryRecord | undefined> {
  try {
    const categories = await getKnowledgeCategories();
    return categories.find(c => c.id === id);
  } catch (e) {
    console.error(`Error finding category by id ${id}:`, e);
    return undefined;
  }
}

export async function getKnowledgeArticles(): Promise<KnowledgeArticleRecord[]> {
  try {
    const articles = await reader.collections.knowledgeArticles.all();
    return articles.map(a => a.entry as unknown as KnowledgeArticleRecord);
  } catch (e) {
    console.error('Error fetching articles:', e);
    return [];
  }
}

export async function getKnowledgeArticleBySlug(slug: string): Promise<KnowledgeArticleRecord | undefined> {
  try {
    const art = await reader.collections.knowledgeArticles.read(slug);
    return art ? art as unknown as KnowledgeArticleRecord : undefined;
  } catch (e) {
    console.error(`Error reading article ${slug}:`, e);
    return undefined;
  }
}

export async function getKnowledgeArticlesByCategoryId(categoryId: string | undefined): Promise<KnowledgeArticleRecord[]> {
  if (!categoryId) return [];
  const articles = await getKnowledgeArticles();
  const category = await getKnowledgeCategoryBySlug(categoryId) || await getKnowledgeCategoryById(categoryId);
  
  return articles.filter((article) => 
    article.relatedCategoryId === categoryId || 
    (category && article.relatedCategoryId === category.id) ||
    (category && article.relatedCategoryId === category.slug)
  );
}

export async function getGlossaryTerms(): Promise<GlossaryTermRecord[]> {
  try {
    const terms = await reader.collections.glossaryTerms.all();
    return terms.map(t => t.entry as unknown as GlossaryTermRecord);
  } catch (e) {
    console.error('Error fetching glossary terms:', e);
    return [];
  }
}

export async function getGlossaryTermBySlug(slug: string): Promise<GlossaryTermRecord | undefined> {
  const term = await reader.collections.glossaryTerms.read(slug);
  return term ? term as unknown as GlossaryTermRecord : undefined;
}

export async function getEcosystemProjects(): Promise<EcosystemProjectRecord[]> {
  try {
    const projects = await reader.collections.ecosystemProjects.all();
    return projects.map(p => ({
      ...p.entry,
      logo: p.entry.logo || null,
      website: p.entry.website || null,
    } as unknown as EcosystemProjectRecord));
  } catch (e) {
    console.error('Error fetching ecosystem projects:', e);
    return [];
  }
}

export async function getDiscoveryIndex(): Promise<DiscoveryItem[]> {
  const knowledgeCategoryRecords = await getKnowledgeCategories();
  const knowledgeArticleRecords = await getKnowledgeArticles();
  const glossaryTermRecords = await getGlossaryTerms();

  const normalizedCategories = knowledgeCategoryRecords.map<DiscoveryItem>((category) => ({
    id: category.id,
    kind: 'category',
    title: category.title,
    tag: category.tag,
    eyebrow: category.group === 'ecosystem' ? 'ECOSYSTEM GUIDE' : 'KNOWLEDGE AREA',
    summary: category.summary,
    keywords: collectSearchTerms([
      category.title,
      category.slug,
      category.tag,
      category.prefix,
      category.summary,
      category.description,
      category.group,
    ]),
    href: `/encyclopedia/categories/${category.slug}`,
    priority: 'high',
  }));

  const normalizedArticles = knowledgeArticleRecords.map<DiscoveryItem>((article) => ({
    id: article.id,
    kind: 'article',
    title: article.title,
    tag: article.tag,
    eyebrow: article.kind === 'guide' ? 'DEVELOPER GUIDE' : 'REFERENCE ARTICLE',
    summary: article.summary,
    keywords: collectSearchTerms([
      article.title,
      article.slug,
      article.tag,
      article.kind,
      article.summary,
    ]),
    href: `/encyclopedia/articles/${article.slug}`,
    priority: article.kind === 'guide' ? 'high' : 'medium',
  }));

  const normalizedGlossary = glossaryTermRecords.map<DiscoveryItem>((term) => ({
    id: term.id,
    kind: 'glossary',
    title: term.term,
    tag: term.tag,
    eyebrow: 'GLOSSARY TERM',
    summary: term.summary,
    keywords: collectSearchTerms([
      term.term,
      term.slug,
      term.tag,
      term.summary,
      ...term.aliases,
      ...term.keywords,
    ]),
    href: `/glossary#${term.slug}`,
    priority: term.priority,
  }));

  return [
    ...normalizedCategories,
    ...normalizedArticles,
    ...normalizedGlossary,
  ];
}
