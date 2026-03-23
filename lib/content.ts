import { 
  MapNodeDefinition, 
  MapEdgeDefinition, 
  MapCategory, 
  KnowledgeArticleRecord,
  KnowledgeCategoryRecord,
  ArticleReference, 
  HomepageBlocks, 
  LinkAction, 
  FooterConfig, 
  UIConfig, 
  SceneConfig 
} from '../types/domain';

import { nodes, edges, categories as mapCategories } from '../data/ecosystem-content';
import { sceneConfig } from '../data/scene-config';
import { homepageBlocks, footerConfig, uiStrings, navLinks, recentArticles } from '../data/home';
import { knowledgeArticleRecords, knowledgeCategoryRecords } from '../data/knowledge-content';

export function getMapNodes(): MapNodeDefinition[] {
  return nodes;
}

export function getMapEdges(): MapEdgeDefinition[] {
  return edges;
}

export function getMapCategories(): MapCategory[] {
  return mapCategories;
}

export function getRecentArticles(): ArticleReference[] {
  return recentArticles;
}

export function getHomepageBlocks(): HomepageBlocks {
  return homepageBlocks;
}

export function getNavigation(): LinkAction[] {
  return navLinks;
}

export function getFooterConfig(): FooterConfig {
  return footerConfig;
}

export function getUIConfig(): UIConfig {
  return uiStrings;
}

export function getMapSceneLayout(): SceneConfig {
  return sceneConfig;
}

export function getKnowledgeCategories(): KnowledgeCategoryRecord[] {
  return knowledgeCategoryRecords;
}

export function getKnowledgeCategoryById(id: string): KnowledgeCategoryRecord | undefined {
  return knowledgeCategoryRecords.find((category) => category.id === id);
}

export function getKnowledgeCategoryBySlug(slug: string): KnowledgeCategoryRecord | undefined {
  return knowledgeCategoryRecords.find((category) => category.slug === slug);
}

export function getKnowledgeArticles(): KnowledgeArticleRecord[] {
  return knowledgeArticleRecords;
}

export function getKnowledgeArticleById(id: string): KnowledgeArticleRecord | undefined {
  return knowledgeArticleRecords.find((article) => article.id === id);
}

export function getKnowledgeArticleBySlug(slug: string): KnowledgeArticleRecord | undefined {
  return knowledgeArticleRecords.find((article) => article.slug === slug);
}

export function getKnowledgeArticlesByCategoryId(categoryId: string): KnowledgeArticleRecord[] {
  return knowledgeArticleRecords.filter((article) => article.relatedCategoryId === categoryId);
}
