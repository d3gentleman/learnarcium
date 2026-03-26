'use client';
import { useCallback, useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  CategoryColors,
  MapCategory,
  MapNodeDefinition,
  MapVariant,
  UIConfig,
} from '../types/domain';
import BentoItem from './BentoItem';
import SlideInPanel from './SlideInPanel';

export interface BentoMapProps {
  domainNodes: MapNodeDefinition[];
  mapCategories: MapCategory[];
  categoryColors: CategoryColors;
  ui: UIConfig;
  variant?: MapVariant;
  initialFocusNodeId?: string | null;
}

export default function BentoMap({
  domainNodes,
  mapCategories,
  categoryColors,
  ui,
  variant = 'full',
  initialFocusNodeId = null,
}: BentoMapProps) {
  const isPreview = variant === 'preview';
  const [activeNode, setActiveNode] = useState<MapNodeDefinition | null>(null);
  const [focusedCategory, setFocusedCategory] = useState<string | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // ── Derived data ──────────────────────────────────────────────────────
  const coreNode = useMemo(() => domainNodes.find(n => n.kind === 'core'), [domainNodes]);

  const allProjects = useMemo(
    () => domainNodes.filter(n => n.kind === 'project'),
    [domainNodes]
  );

  const allTags = useMemo(() => {
    const tags = new Set(allProjects.map(p => p.tag));
    return Array.from(tags).sort();
  }, [allProjects]);

  const projectsByCategory = useMemo(() => {
    const map: Record<string, MapNodeDefinition[]> = {};
    allProjects.forEach((node) => {
      if (node.categoryId) {
        if (!map[node.categoryId]) map[node.categoryId] = [];
        map[node.categoryId].push(node);
      }
    });
    return map;
  }, [allProjects]);

  // ── Filtering ─────────────────────────────────────────────────────────
  const filteredProjectsByCategory = useMemo(() => {
    const result: Record<string, MapNodeDefinition[]> = {};
    const query = searchQuery.trim().toLowerCase();

    mapCategories.forEach((cat) => {
      // Skip categories that don't match category filter
      if (focusedCategory && cat.id !== focusedCategory) return;

      let projects = projectsByCategory[cat.id] || [];

      // Tag filter
      if (activeTag) {
        projects = projects.filter(p => p.tag === activeTag);
      }

      // Search filter
      if (query.length >= 2) {
        projects = projects.filter((node) => {
          const haystack = [
            node.label,
            node.technicalLabel || '',
            node.compactLabel || '',
            node.tag,
            node.beginnerDescription,
          ].join(' ').toLowerCase();
          return haystack.includes(query);
        });
      }

      if (projects.length > 0) {
        result[cat.id] = projects;
      }
    });

    return result;
  }, [mapCategories, projectsByCategory, focusedCategory, activeTag, searchQuery]);

  const totalFilteredCount = useMemo(
    () => Object.values(filteredProjectsByCategory).reduce((sum, arr) => sum + arr.length, 0),
    [filteredProjectsByCategory]
  );

  // ── Actions ───────────────────────────────────────────────────────────
  const onNodeClick = useCallback((node: MapNodeDefinition) => {
    if (isPreview) return;
    setActiveNode(node);
  }, [isPreview]);

  const onCategoryClick = useCallback((catId: string | null) => {
    if (isPreview) return;
    setFocusedCategory(catId);
    setActiveTag(null);
  }, [isPreview]);

  useEffect(() => {
    if (initialFocusNodeId) {
      const node = domainNodes.find(n => n.id === initialFocusNodeId);
      if (node) {
        if (node.categoryId) setFocusedCategory(node.categoryId);
        setActiveNode(node);
      }
    }
  }, [domainNodes, initialFocusNodeId]);

  // ── Animation variants ────────────────────────────────────────────────
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
  };
  const itemVariants = {
    hidden: { y: 16, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  // ── Preview mode (homepage lite version) ──────────────────────────────
  if (isPreview) {
    return (
      <div className="relative h-full w-full overflow-hidden bg-[#050608] text-white p-6">
        <div className="absolute inset-0 z-0 opacity-30 pointer-events-none" aria-hidden="true">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/10 blur-[120px]" />
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-3 pointer-events-none"
        >
          {allProjects.filter(p => p.featuredOnOverview).slice(0, 6).map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <BentoItem
                node={project}
                color={categoryColors[project.categoryId || ''] || '#3b494b'}
                variant="preview"
                isSelected={false}
                onClick={() => {}}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  }

  // ── Full mode ─────────────────────────────────────────────────────────
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#050608] text-white">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        {/* ─── Toolbar ─────────────────────────────────────────────── */}
        <header className="flex flex-col gap-4 px-6 md:px-10 pt-6 pb-4 border-b border-outline-variant/15">
          {/* Row 1: Search + count */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="text-[10px] uppercase tracking-[0.2em] text-outline">
              {totalFilteredCount} {ui.mapProjectCount}
            </div>

            <div className="relative w-full max-w-[20rem]">
              <input
                type="text"
                placeholder={ui.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-outline-variant/30 bg-[#0a0c0e]/90 px-5 py-3 text-xs text-white shadow-lg backdrop-blur-md focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          {/* Row 2: Category pills */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onCategoryClick(null)}
              className={`rounded-full px-4 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] border transition-all ${
                !focusedCategory
                  ? 'bg-primary/15 border-primary/40 text-primary'
                  : 'border-outline-variant/30 text-outline hover:text-white hover:border-outline-variant/50'
              }`}
            >
              {ui.mapAllCategories}
            </button>
            {mapCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onCategoryClick(focusedCategory === cat.id ? null : cat.id)}
                className={`rounded-full px-4 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] border transition-all flex items-center gap-2 ${
                  focusedCategory === cat.id
                    ? 'bg-white/10 border-white/30 text-white'
                    : 'border-outline-variant/30 text-outline hover:text-white hover:border-outline-variant/50'
                }`}
              >
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: categoryColors[cat.id] || '#3b494b' }}
                />
                {cat.compactLabel || cat.name}
                <span className="text-outline/50">
                  ({(projectsByCategory[cat.id] || []).length})
                </span>
              </button>
            ))}
          </div>

          {/* Row 3: Tag pills */}
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setActiveTag(null)}
              className={`rounded-full px-3 py-1 text-[8px] font-bold uppercase tracking-[0.14em] border transition-all ${
                !activeTag
                  ? 'bg-primary/10 border-primary/30 text-primary'
                  : 'border-outline-variant/20 text-outline/60 hover:text-outline hover:border-outline-variant/40'
              }`}
            >
              {ui.mapAllTags}
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`rounded-full px-3 py-1 text-[8px] font-bold uppercase tracking-[0.14em] border transition-all ${
                  activeTag === tag
                    ? 'bg-white/10 border-white/25 text-white'
                    : 'border-outline-variant/20 text-outline/60 hover:text-outline hover:border-outline-variant/40'
                }`}
              >
                {tag.replace(/_/g, ' ')}
              </button>
            ))}
          </div>
        </header>

        {/* ─── Content Area ────────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-6 md:px-10 py-6">
          {/* ── Core Node Banner ───────────────────────────────────── */}
          {!focusedCategory && coreNode && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div
                onClick={() => onNodeClick(coreNode)}
                className={`relative overflow-hidden rounded-[2rem] border p-6 md:p-8 transition-all cursor-pointer ${
                  activeNode?.id === coreNode.id ? 'ring-2 ring-primary/40 shadow-[0_0_50px_rgba(0,240,255,0.1)]' : 'hover:border-primary/50'
                }`}
                style={{
                  borderColor: activeNode?.id === coreNode.id ? '#00f0ff' : 'rgba(0, 240, 255, 0.2)',
                  background: 'linear-gradient(135deg, rgba(8,12,16,0.9) 0%, rgba(16,24,32,0.8) 100%)'
                }}
              >
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-primary">
                      <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                      {coreNode.tag}
                    </div>
                    <h2 className="mt-3 text-3xl md:text-4xl font-black uppercase tracking-tighter text-white font-headline">
                      {coreNode.label}
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-on-surface-variant">
                      {coreNode.beginnerDescription}
                    </p>
                  </div>
                  <div className="hidden lg:block text-right shrink-0">
                    <div className="text-[10px] uppercase tracking-[0.4em] text-outline mb-2">{ui.mapCoreStatusLabel}</div>
                    <div className="text-2xl font-black text-primary">{ui.mapCoreStatusValue}</div>
                  </div>
                </div>
                <div className="absolute right-[-5%] top-[-20%] w-[30%] h-[150%] bg-primary/5 rotate-12 blur-3xl" />
              </div>
            </motion.div>
          )}

          {/* ── Category Sections with Grouped Projects ───────────── */}
          {totalFilteredCount > 0 ? (
            <motion.div
              key={`sections-${focusedCategory}-${activeTag}-${searchQuery}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              {mapCategories
                .filter(cat => filteredProjectsByCategory[cat.id])
                .map((cat) => {
                  const projects = filteredProjectsByCategory[cat.id];
                  const color = categoryColors[cat.id] || '#3b494b';

                  return (
                    <motion.section key={cat.id} variants={itemVariants}>
                      {/* Category Header */}
                      <div className="flex items-center gap-3 mb-4">
                        <span
                          className="inline-block h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                        <h3
                          className="text-lg font-black uppercase tracking-tight font-headline"
                          style={{ color: `${color}ee` }}
                        >
                          {cat.name}
                        </h3>
                        <span className="text-[9px] uppercase tracking-[0.2em] text-outline/50">
                          {cat.tag.replace(/_/g, ' ')}
                        </span>
                        <div className="flex-1 h-px bg-outline-variant/15" />
                        <span className="text-[9px] uppercase tracking-[0.16em] text-outline/40">
                          {projects.length} {ui.mapProjectCount}
                        </span>
                      </div>

                      {/* Category description (when focused) */}
                      {focusedCategory === cat.id && (
                        <p className="text-[11px] leading-relaxed text-on-surface-variant/70 mb-4 max-w-3xl">
                          {cat.description}
                        </p>
                      )}

                      {/* Project Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {projects.map((project) => (
                          <BentoItem
                            key={project.id}
                            node={project}
                            color={color}
                            variant={variant}
                            isSelected={activeNode?.id === project.id}
                            onClick={onNodeClick}
                          />
                        ))}
                      </div>
                    </motion.section>
                  );
                })}
            </motion.div>
          ) : (
            <div className="flex items-center justify-center py-20 text-sm text-outline/60">
              {ui.mapEmptyState}
            </div>
          )}
        </div>
      </div>

      {/* ─── SlideInPanel (Project Detail) ────────────────────────── */}
      <SlideInPanel
        activeNode={activeNode}
        onClose={() => setActiveNode(null)}
        ui={ui}
      />
    </div>
  );
}
