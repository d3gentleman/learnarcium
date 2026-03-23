import { Edge, MarkerType, Node } from 'reactflow';
import {
  MapCanvasEdgeData,
  MapCanvasNodeData,
  MapCategory,
  MapEdgeDefinition,
  MapNodeDefinition,
  SceneConfig,
} from '../types/domain';

export function generateReactFlowNodes(
  domainNodes: MapNodeDefinition[],
  scene: SceneConfig,
  categories: MapCategory[]
): Node<MapCanvasNodeData>[] {
  const categoryProjectCounts = domainNodes.reduce<Record<string, number>>((acc, node) => {
    if (node.kind === 'project' && node.categoryId) {
      acc[node.categoryId] = (acc[node.categoryId] || 0) + 1;
    }
    return acc;
  }, {});

  const nodes: Node<MapCanvasNodeData>[] = categories.map((category) => {
    const regionBounds = scene.regionBounds[category.id];
    const padding = 170;

    return {
      id: `region-${category.id}`,
      type: 'customNode',
      position: { x: regionBounds.minX - padding, y: regionBounds.minY - padding },
      data: {
        id: `region-${category.id}`,
        kind: 'region',
        label: category.name,
        tag: 'REGION',
        beginnerDescription: '',
        technicalDescription: '',
        categoryId: category.id,
        color: scene.categoryColors[category.id] || '#3b494b',
        projectCount: categoryProjectCounts[category.id] || 0,
      },
      className: 'region-group',
      style: {
        width: (regionBounds.maxX - regionBounds.minX) + padding * 2,
        height: (regionBounds.maxY - regionBounds.minY) + padding * 2,
        zIndex: -1,
      },
      draggable: false,
      selectable: false,
    };
  });

  domainNodes.forEach((nodeDef) => {
    const position = scene.nodePositions[nodeDef.id] || { x: 0, y: 0 };
    const color = nodeDef.categoryId
      ? scene.categoryColors[nodeDef.categoryId]
      : scene.categoryColors.arcium || '#00f0ff';

    nodes.push({
      id: nodeDef.id,
      type: 'customNode',
      position,
      data: {
        ...nodeDef,
        color,
        displayLabel: nodeDef.label,
        displayTag: nodeDef.tag,
        projectCount: nodeDef.kind === 'category'
          ? categoryProjectCounts[nodeDef.id] || 0
          : undefined,
      },
    });
  });

  return nodes;
}

function getEdgeAccentCategory(
  edgeDef: MapEdgeDefinition,
  nodeLookup: Map<string, MapNodeDefinition>
): string {
  if (edgeDef.relationKind === 'core_connection') {
    return edgeDef.sourceId;
  }

  const sourceNode = nodeLookup.get(edgeDef.sourceId);
  return sourceNode?.categoryId || edgeDef.targetId;
}

export function generateReactFlowEdges(
  domainEdges: MapEdgeDefinition[],
  domainNodes: MapNodeDefinition[],
  scene: SceneConfig,
  reduceMotion: boolean
): Edge<MapCanvasEdgeData>[] {
  const nodeLookup = new Map(domainNodes.map((node) => [node.id, node]));

  return domainEdges.map((edgeDef) => {
    const accentCategoryId = getEdgeAccentCategory(edgeDef, nodeLookup);
    const accentColor = scene.categoryColors[accentCategoryId] || '#3b494b';
    const primary = edgeDef.relationKind === 'core_connection';

    return {
      id: edgeDef.id,
      source: edgeDef.sourceId,
      target: edgeDef.targetId,
      type: 'smoothstep',
      animated: !reduceMotion && primary,
      style: {
        stroke: primary ? accentColor : `${accentColor}B3`,
        strokeWidth: primary ? 3.4 : 2,
        filter: primary ? `drop-shadow(0px 0px 10px ${accentColor}66)` : undefined,
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 18,
        height: 18,
        color: accentColor,
      },
      data: {
        accentColor,
        primary,
        relationKind: edgeDef.relationKind,
        beginnerCaption: edgeDef.beginnerCaption,
        technicalCaption: edgeDef.technicalCaption,
      },
      className: !reduceMotion ? (primary ? 'animated-flow-primary' : 'animated-flow-secondary') : '',
      labelStyle: {
        fill: '#d7faff',
        fontSize: 10,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.12em',
      },
      labelShowBg: true,
      labelBgPadding: [8, 4],
      labelBgBorderRadius: 999,
      labelBgStyle: {
        fill: 'rgba(12, 14, 18, 0.88)',
        stroke: `${accentColor}40`,
        strokeWidth: 1,
      },
    };
  });
}
