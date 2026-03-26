'use client';
import type { ReactNode } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import ActionLink from './ActionLink';
import { MapNodeDefinition, UIConfig } from '../types/domain';

interface SlideInPanelProps {
  activeNode: MapNodeDefinition | null;
  onClose: () => void;
  ui: UIConfig;
}

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[1.35rem] border border-outline-variant/25 bg-black/35 p-5 shadow-inner backdrop-blur-sm">
      <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-primary/80">{title}</div>
      <div className="text-sm leading-relaxed text-on-surface-variant">{children}</div>
    </section>
  );
}

export default function SlideInPanel({ activeNode, onClose, ui }: SlideInPanelProps) {
  const shouldReduceMotion = useReducedMotion();
  const transition = { type: 'spring' as const, damping: 25, stiffness: 200, duration: shouldReduceMotion ? 0 : undefined };

  return (
    <AnimatePresence>
      {activeNode && (
        <motion.aside
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={transition}
          className="absolute top-0 right-0 z-[100] flex h-full w-full flex-col overflow-hidden border-l border-outline-variant/25 bg-[linear-gradient(180deg,rgba(8,10,12,0.96)_0%,rgba(14,16,20,0.94)_100%)] shadow-[-20px_0_50px_rgba(0,0,0,0.75)] md:w-[29rem]"
        >
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(0,240,255,0.08)_0%,transparent_30%),linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:auto,24px_24px,24px_24px] opacity-70" />

          <div className="relative z-10 flex items-start gap-4 border-b border-outline-variant/30 bg-black/20 px-5 py-4">
            {/* Logo or fallback */}
            {activeNode.logoUrl ? (
              <img
                src={activeNode.logoUrl}
                alt={`${activeNode.label} logo`}
                className="h-14 w-14 rounded-[14px] object-contain shrink-0 border border-outline-variant/20 bg-black/30 p-1"
              />
            ) : (
              <div
                className="h-14 w-14 rounded-[14px] shrink-0 border border-outline-variant/20 bg-black/30 flex items-center justify-center"
              >
                <span className="text-2xl font-black text-primary/60">
                  {activeNode.label.charAt(0)}
                </span>
              </div>
            )}

            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-outline">
                {ui.mapPanelHeader}: {activeNode.kind}
              </div>
              <h2 className="mt-2 text-2xl font-black uppercase tracking-tight text-white font-headline leading-tight">
                {activeNode.label}
              </h2>
              <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-outline-variant/30 bg-black/30 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-primary">
                <span className="inline-block h-2 w-2 rounded-full bg-primary" />
                {activeNode.tag}
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label={ui.mapClose}
              className="rounded-full border border-primary/20 bg-primary/10 px-3 py-2 text-primary transition-all hover:bg-primary/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shrink-0"
            >
              [X]
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: shouldReduceMotion ? 0 : 0.08, duration: shouldReduceMotion ? 0 : 0.28 }}
            className="relative z-10 flex-1 space-y-4 overflow-y-auto px-5 py-5"
          >
            <Section title={ui.mapPanelOverviewTitle}>
              {activeNode.beginnerDescription}
            </Section>

            <Section title={ui.mapPanelWhyItMatters}>
              {activeNode.whyItMatters}
            </Section>

            <Section title={ui.mapPanelTechnicalTitle}>
              {activeNode.technicalDescription}
            </Section>

            {activeNode.action && (
              <section className="rounded-[1.35rem] border border-outline-variant/25 bg-black/35 p-5 shadow-inner backdrop-blur-sm">
                <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-primary/80">{ui.mapPanelActionTitle}</div>
                <ActionLink
                  action={activeNode.action}
                  className="flex items-center justify-between rounded-[1rem] bg-primary px-5 py-4 text-[11px] font-black uppercase tracking-[0.18em] text-on-primary transition-all hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-background"
                  unavailableClassName="flex items-center justify-between rounded-[1rem] border border-outline-variant/30 bg-surface-container-high px-5 py-4 text-[11px] font-black uppercase tracking-[0.18em] text-outline cursor-not-allowed"
                >
                  <span>{activeNode.action.label || ui.mapReadArticle}</span>
                  <span>↗</span>
                </ActionLink>
              </section>
            )}
          </motion.div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
