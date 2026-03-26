'use client';
import { motion } from 'framer-motion';
import ActionLink from './ActionLink';
import { MapNodeDefinition, MapVariant } from '../types/domain';

interface BentoItemProps {
  node: MapNodeDefinition;
  color: string;
  variant: MapVariant;
  isSelected: boolean;
  onClick: (node: MapNodeDefinition) => void;
}

export default function BentoItem({
  node,
  color,
  variant,
  isSelected,
  onClick,
}: BentoItemProps) {
  return (
    <motion.div
      whileHover={variant !== 'preview' ? { scale: 1.01, y: -2 } : undefined}
      whileTap={variant !== 'preview' ? { scale: 0.99 } : undefined}
      className={`relative flex w-full flex-col gap-3 rounded-[1.2rem] border p-4 text-left transition-all h-full ${
        isSelected
          ? 'bg-white/10 ring-1 ring-primary shadow-[0_0_20px_rgba(0,240,255,0.15)]'
          : 'bg-[#0a0c0e]/70 hover:bg-white/5'
      }`}
      style={{
        borderColor: isSelected ? color : `${color}33`,
      }}
    >
      {/* Header row: tag + name on left, logo on right */}
      <button
        onClick={() => onClick(node)}
        className="w-full text-left"
      >
        <div className="flex items-start justify-between gap-3 mb-1">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <div
                className="h-2 w-2 rounded-full shrink-0"
                style={{
                  backgroundColor: color,
                  boxShadow: `0 0 8px ${color}`
                }}
              />
              <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-outline">
                {node.tag.replace(/_/g, ' ')}
              </span>
            </div>
            <h4 className="text-[13px] font-black uppercase tracking-[0.06em] text-white leading-tight mt-1">
              {node.label}
            </h4>
          </div>

          {/* Logo: top-right corner */}
          {node.logoUrl && (
            <img
              src={node.logoUrl}
              alt={`${node.label} logo`}
              className="h-7 w-7 rounded-lg object-contain shrink-0"
            />
          )}
        </div>
      </button>

      {/* Overview */}
      {variant !== 'preview' && (
        <p className="text-[11px] leading-relaxed text-on-surface-variant/70 flex-1">
          {node.beginnerDescription}
        </p>
      )}

      {/* Website */}
      {variant !== 'preview' && node.action && (
        <ActionLink
          action={node.action}
          className="mt-auto inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-primary hover:text-white transition-colors"
          unavailableClassName="mt-auto inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-outline/50 cursor-not-allowed"
        >
          <span>{node.action.label}</span>
          <span className="text-[8px]">↗</span>
        </ActionLink>
      )}
    </motion.div>
  );
}
