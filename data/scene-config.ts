import { SceneConfig } from '../types/domain';
import { categories, nodes } from './ecosystem-content';

const CENTER = { x: 500, y: 500 };
const CATEGORY_RADIUS = 350;
const PROJECT_RADIUS = 220;
const FEATURE_RADIUS = 150;

export const CATEGORY_COLORS: Record<string, string> = {
  arcium: '#00f0ff',
  'cat-defi': '#2fe6a6',
  'cat-ai': '#6fc2ff',
  'cat-payments': '#ffc857',
  'cat-consumer': '#ff8a5b',
  'cat-prediction': '#7af0c6',
};

function computeStaticSceneConfig(): SceneConfig {
  const nodePositions: Record<string, { x: number; y: number }> = { arcium: CENTER };
  const regionBounds: Record<string, { minX: number; maxX: number; minY: number; maxY: number }> = {};
  const featuredProjectAnchors: Record<string, { x: number; y: number }> = {};
  const categoryIds = categories.map((category) => category.id);
  const catAngleStep = (2 * Math.PI) / categoryIds.length;

  categoryIds.forEach((catId, index) => {
    const angle = index * catAngleStep - Math.PI / 2;
    const cx = CENTER.x + CATEGORY_RADIUS * Math.cos(angle);
    const cy = CENTER.y + CATEGORY_RADIUS * Math.sin(angle);
    nodePositions[catId] = { x: cx, y: cy };

    const projectNodes = nodes.filter((node) => node.kind === 'project' && node.categoryId === catId);
    const featuredProjects = projectNodes.filter((node) => node.featuredOnOverview);

    let minX = cx;
    let maxX = cx;
    let minY = cy;
    let maxY = cy;

    projectNodes.forEach((projectNode, projectIndex) => {
      const spread = projectNodes.length > 1 ? (Math.PI / 1.8) / (projectNodes.length - 1) : 0;
      const subAngle = projectNodes.length > 1
        ? angle - Math.PI / 2.6 + (projectIndex * spread)
        : angle;

      const px = cx + PROJECT_RADIUS * Math.cos(subAngle);
      const py = cy + PROJECT_RADIUS * Math.sin(subAngle);

      nodePositions[projectNode.id] = { x: px, y: py };

      minX = Math.min(minX, px);
      maxX = Math.max(maxX, px);
      minY = Math.min(minY, py);
      maxY = Math.max(maxY, py);
    });

    featuredProjects.forEach((projectNode, featuredIndex) => {
      const offset = featuredProjects.length > 1 ? (featuredIndex - (featuredProjects.length - 1) / 2) * 0.28 : 0;
      const featureAngle = angle + offset;
      featuredProjectAnchors[projectNode.id] = {
        x: cx + FEATURE_RADIUS * Math.cos(featureAngle),
        y: cy + FEATURE_RADIUS * Math.sin(featureAngle),
      };
    });

    regionBounds[catId] = { minX, maxX, minY, maxY };
  });

  return {
    nodePositions,
    regionBounds,
    categoryColors: CATEGORY_COLORS,
    overviewViewport: {
      centerX: CENTER.x,
      centerY: CENTER.y,
      zoom: 0.65,
    },
    previewViewport: {
      centerX: CENTER.x,
      centerY: CENTER.y - 30,
      zoom: 0.54,
    },
    featuredProjectAnchors,
  };
}

export const sceneConfig: SceneConfig = computeStaticSceneConfig();
