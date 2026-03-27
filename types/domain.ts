export type LinkAction =
  | { type: 'internal'; href: string; label: string }
  | { type: 'external'; href: string; label: string }
  | { type: 'command'; command: 'open-discovery'; label: string }
  | { type: 'unavailable'; label: string; reason?: string };

export type MapMode = 'beginner' | 'technical';
export type MapVariant = 'full' | 'preview';
export type MapNodePriority = 'high' | 'medium' | 'low';

export interface MapNodeDefinition {
  id: string;
  kind: 'core' | 'category' | 'project';
  label: string;
  technicalLabel?: string;
  compactLabel?: string;
  tag: string;
  beginnerDescription: string;
  technicalDescription: string;
  whyItMatters: string;
  priority: MapNodePriority;
  featuredOnOverview: boolean;
  categoryId?: string;
  logoUrl?: string;
  action?: LinkAction;
}

export interface MapEdgeDefinition {
  id: string;
  sourceId: string;
  targetId: string;
  relationKind: 'belongs_to' | 'connects_to' | 'depends_on' | 'core_connection';
  beginnerCaption?: string;
  technicalCaption?: string;
}

export interface MapCategory {
  id: string;
  name: string;
  technicalLabel?: string;
  compactLabel?: string;
  tag: string;
  description: string;
  whyItMatters: string;
  priority: MapNodePriority;
}

export interface KnowledgeCategory {
  id: string;
  slug?: string;
  tag?: string;
  prefix: string;
  title: string;
  description: string;
  action: LinkAction;
}

export interface ArticleReference {
  id: string;
  slug?: string;
  title: string;
  tag: string;
  date: string;
  action: LinkAction;
}

export interface StartHereCard {
  id?: string;
  prefix: string;
  tag: string;
  title: string;
  description: string;
  action: LinkAction;
}

export interface KnowledgeBodySection {
  title: string;
  body: string;
}

export type KnowledgeCategoryGroup = 'knowledge' | 'ecosystem';
export type KnowledgeArticleKind = 'guide' | 'update';

export interface KnowledgeCategoryRecord {
  id: string;
  slug: string;
  title: string;
  tag: string;
  summary: string;
  bodySections: KnowledgeBodySection[];
  prefix: string;
  description: string;
  group: KnowledgeCategoryGroup;
  relatedNodeIds?: string[];
}

export interface KnowledgeArticleRecord {
  id: string;
  slug: string;
  title: string;
  tag: string;
  summary: string;
  bodySections: KnowledgeBodySection[];
  kind: KnowledgeArticleKind;
  date?: string;
  relatedCategoryId?: string;
  relatedNodeIds?: string[];
}

export interface GlossarySourceReference {
  label: string;
  href: string;
}

export interface GlossaryTermRecord {
  id: string;
  slug: string;
  term: string;
  tag: string;
  summary: string;
  aliases: string[];
  keywords: string[];
  priority: MapNodePriority;
  source: GlossarySourceReference;
  relatedCategoryIds?: string[];
  relatedNodeIds?: string[];
}

export interface LiveStatusIndicator {
  status: string;
  text: string;
}

export interface HomepageBlocks {
  hero: {
    subtitle: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    primaryCta: LinkAction;
    secondaryCta: LinkAction;
  };
  startHereCards: StartHereCard[];
  encyclopediaCategories: KnowledgeCategory[];
  quickLinks: LinkAction[];
  liveStatusFeed: LiveStatusIndicator[];
}

export interface FooterConfig {
  links: LinkAction[];
  metadata: {
    copyright: string;
    coords: string;
    mission: string;
  };
}

export type UIConfig = Record<string, string>;

export type CategoryColors = Record<string, string>;


export type DiscoveryItemKind = 'core' | 'project' | 'category' | 'article' | 'glossary';

export interface DiscoveryItem {
  id: string;
  kind: DiscoveryItemKind;
  title: string;
  tag: string;
  eyebrow: string;
  summary: string;
  keywords: string[];
  href: string;
  priority: MapNodePriority;
  secondaryAction?: LinkAction;
  featured?: boolean;
}

export type EcosystemProjectStatus = 'sync_ok' | 'coming_soon' | 'maintenance';

export interface EcosystemProjectRecord {
  id: string;
  slug: string;
  title: string;
  tag: string;
  summary: string;
  logo: string | null;
  website: string | null;
  status: EcosystemProjectStatus;
  categoryId: string;
  isFeatured: boolean;
}
