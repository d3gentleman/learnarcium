'use client';
import { motion } from 'framer-motion';
import { MapCategory, MapMode } from '../types/domain';

interface BentoZoneProps {
  category: MapCategory;
  color: string;
  mode: MapMode;
}

export default function BentoZone({
  category,
  color,
  mode,
}: BentoZoneProps) {
  return (
    <motion.div
      layout
      className="relative rounded-[1.8rem] border bg-[#0a0c0e]/80 p-5 md:p-6 shadow-xl backdrop-blur-md"
      style={{
        borderColor: `${color}66`,
        boxShadow: `0 0 40px ${color}10`,
      }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-outline">
            <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
            {category.tag}
          </div>
          <h3
            className="mt-2 text-xl md:text-2xl font-black uppercase tracking-tight font-headline"
            style={{ color: `${color}ee` }}
          >
            {mode === 'technical' && category.technicalLabel ? category.technicalLabel : category.name}
          </h3>
        </div>
        <p className="text-[11px] leading-relaxed text-on-surface-variant max-w-lg">
          {category.description}
        </p>
      </div>

      {category.whyItMatters && (
        <p className="mt-4 border-t border-outline-variant/20 pt-4 text-[11px] leading-relaxed text-on-surface-variant/80">
          {category.whyItMatters}
        </p>
      )}
    </motion.div>
  );
}
