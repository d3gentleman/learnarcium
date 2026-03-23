import { Handle, NodeProps, Position } from 'reactflow';
import { MapCanvasNodeData } from '../types/domain';

export default function CustomNode({ data }: NodeProps<MapCanvasNodeData>) {
  const nodeColor = data.color || '#3b494b';
  const label = data.displayLabel || data.label;
  const tag = data.displayTag || data.tag;
  const dimmed = Boolean(data.dimmed);
  const focused = Boolean(data.focused);
  const expanded = Boolean(data.expanded);
  const featured = Boolean(data.featured);
  const selected = Boolean(data.selected);
  const variant = data.variant || 'full';
  const mutedState = dimmed ? 'opacity-30 scale-[0.98]' : 'opacity-100';

  if (data.kind === 'region') {
    return (
      <div
        className={`relative w-full h-full overflow-hidden rounded-[2.75rem] pointer-events-none transition-all duration-500 ${mutedState}`}
        style={{
          border: `1px solid ${nodeColor}38`,
          background: `radial-gradient(circle at 50% 50%, ${nodeColor}18 0%, ${nodeColor}08 35%, rgba(0,0,0,0) 75%)`,
          boxShadow: `inset 0 0 120px ${nodeColor}10, 0 0 60px ${nodeColor}12`,
        }}
      >
        <div className="absolute inset-4 rounded-[2.35rem] border" style={{ borderColor: `${nodeColor}1f` }} />
        <div className="absolute inset-10 rounded-[1.95rem] border" style={{ borderColor: `${nodeColor}16` }} />
        <div className="absolute inset-16 rounded-[1.55rem] border-dashed border" style={{ borderColor: `${nodeColor}22` }} />
        <div
          className="absolute -right-10 top-10 h-32 w-32 rounded-full blur-3xl"
          style={{ backgroundColor: `${nodeColor}16` }}
        />
        <div
          className="absolute left-10 bottom-10 h-24 w-24 rounded-full blur-2xl"
          style={{ backgroundColor: `${nodeColor}12` }}
        />
        <div className="absolute top-10 left-10 flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-outline">
          <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: nodeColor }} />
          <span>{data.projectCount || 0} Systems</span>
        </div>
        <div className="absolute bottom-12 left-10 max-w-[18rem]">
          <div className="text-[11px] uppercase tracking-[0.26em] text-outline">Territory</div>
          <div
            className="mt-3 text-3xl font-black uppercase font-headline tracking-tight"
            style={{ color: `${nodeColor}cc` }}
          >
            {label}
          </div>
        </div>
      </div>
    );
  }

  if (data.kind === 'core') {
    return (
      <div
        tabIndex={0}
        aria-label={`Central Hub: ${label}`}
        className={`relative min-h-[320px] min-w-[320px] overflow-hidden rounded-[2.8rem] border px-12 py-10 text-center transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 ${selected ? 'scale-[1.02]' : 'hover:scale-[1.01]'}`}
        style={{
          borderColor: `${nodeColor}88`,
          background: 'linear-gradient(180deg, rgba(12,14,18,0.96) 0%, rgba(12,14,18,0.84) 100%)',
          boxShadow: `0 0 80px ${nodeColor}30, inset 0 0 32px ${nodeColor}20`,
          opacity: dimmed ? 0.45 : 1,
        }}
      >
        <div
          className="absolute inset-5 rounded-[2.2rem] border"
          style={{ borderColor: `${nodeColor}22` }}
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_60%)]"
          aria-hidden="true"
        />
        <div
          className="absolute left-1/2 top-6 h-28 w-28 -translate-x-1/2 rounded-full blur-3xl"
          style={{ backgroundColor: `${nodeColor}26` }}
        />
        <div className="relative z-10 flex h-full flex-col items-center justify-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-outline-variant/40 bg-black/30 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-primary">
            <span className="inline-block h-2 w-2 rounded-full bg-primary animate-pulse" />
            {tag}
          </div>
          <div className="text-5xl font-black uppercase font-headline tracking-tight text-white drop-shadow-[0_0_24px_rgba(0,240,255,0.18)]">
            {label}
          </div>
          <div className="mt-5 max-w-[16rem] text-[11px] uppercase tracking-[0.22em] text-on-surface-variant">
            {variant === 'preview' ? 'Confidential compute atlas' : 'Confidential execution for every territory on the map'}
          </div>
        </div>
        <Handle type="target" position={Position.Top} className="opacity-0" />
        <Handle type="source" position={Position.Bottom} className="opacity-0" />
        <Handle type="target" position={Position.Left} className="opacity-0" />
        <Handle type="source" position={Position.Right} className="opacity-0" />
      </div>
    );
  }

  if (data.kind === 'category') {
    return (
      <div
        tabIndex={0}
        aria-label={`Category: ${label}`}
        className={`relative min-w-[230px] overflow-hidden rounded-[1.8rem] border px-7 py-6 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 ${focused ? 'scale-[1.04]' : 'hover:scale-[1.02]'} ${mutedState}`}
        style={{
          borderColor: `${nodeColor}${focused ? 'cc' : '80'}`,
          background: 'linear-gradient(180deg, rgba(10,12,14,0.98) 0%, rgba(16,18,22,0.9) 100%)',
          boxShadow: focused
            ? `0 0 36px ${nodeColor}35, inset 0 0 24px ${nodeColor}18`
            : `0 0 24px ${nodeColor}24`,
        }}
      >
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08)_0%,transparent_35%)]"
          aria-hidden="true"
        />
        <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full border border-outline-variant/30 bg-black/30 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-on-surface-variant">
          <span>{data.projectCount || 0}</span>
          <span>Projects</span>
        </div>
        <div className="relative z-10">
          <div className="text-[10px] uppercase tracking-[0.28em] text-outline">{tag}</div>
          <div className="mt-3 text-[22px] font-black uppercase font-headline tracking-tight text-white">
            {label}
          </div>
          {variant !== 'preview' && (
            <p className="mt-4 max-w-[17rem] text-[11px] leading-relaxed text-on-surface-variant">
              {data.whyItMatters}
            </p>
          )}
          <div className="mt-5 flex flex-wrap gap-2">
            {focused && (
              <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
                Expanded
              </span>
            )}
            {!focused && variant === 'full' && (
              <span className="rounded-full border border-outline-variant/30 bg-black/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-outline">
                Territory
              </span>
            )}
          </div>
        </div>
        <Handle type="target" position={Position.Top} className="!h-4 !w-4 !border-2 !border-black rounded-full" style={{ backgroundColor: nodeColor, boxShadow: `0 0 12px ${nodeColor}` }} />
        <Handle type="source" position={Position.Bottom} className="!h-4 !w-4 !border-2 !border-black rounded-full" style={{ backgroundColor: nodeColor, boxShadow: `0 0 12px ${nodeColor}` }} />
        <Handle type="target" position={Position.Left} className="!h-4 !w-4 !border-2 !border-black rounded-full" style={{ backgroundColor: nodeColor, boxShadow: `0 0 12px ${nodeColor}` }} />
        <Handle type="source" position={Position.Right} className="!h-4 !w-4 !border-2 !border-black rounded-full" style={{ backgroundColor: nodeColor, boxShadow: `0 0 12px ${nodeColor}` }} />
      </div>
    );
  }

  if (featured && !expanded) {
    return (
      <div
        tabIndex={0}
        aria-label={`Featured Project: ${label}`}
        className={`relative min-w-[140px] overflow-hidden rounded-full border px-4 py-3 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 ${selected ? 'scale-[1.04]' : 'hover:scale-[1.02]'} ${mutedState}`}
        style={{
          borderColor: `${nodeColor}${selected ? 'dd' : '90'}`,
          background: 'linear-gradient(180deg, rgba(10,12,14,0.96) 0%, rgba(16,18,22,0.88) 100%)',
          boxShadow: `0 0 24px ${nodeColor}${data.priority === 'high' ? '3a' : '22'}`,
        }}
      >
        <div className="flex items-center gap-3">
          <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: nodeColor, boxShadow: `0 0 10px ${nodeColor}` }} />
          <div className="min-w-0">
            <div className="text-[11px] font-black uppercase font-headline tracking-[0.14em] text-white">{label}</div>
            <div className="text-[9px] uppercase tracking-[0.22em] text-outline">{tag}</div>
          </div>
        </div>
        <Handle type="target" position={Position.Top} className="opacity-0" />
        <Handle type="source" position={Position.Bottom} className="opacity-0" />
        <Handle type="target" position={Position.Left} className="opacity-0" />
        <Handle type="source" position={Position.Right} className="opacity-0" />
      </div>
    );
  }

  return (
    <div
      tabIndex={0}
      aria-label={`Project: ${label}`}
      className={`relative min-w-[170px] overflow-hidden rounded-[1.2rem] border px-4 py-3 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 ${selected ? 'scale-[1.03]' : 'hover:scale-[1.01]'} ${mutedState}`}
      style={{
        borderColor: `${nodeColor}${selected ? 'dd' : '55'}`,
        background: 'linear-gradient(180deg, rgba(10,12,14,0.95) 0%, rgba(16,18,22,0.84) 100%)',
        boxShadow: `0 0 18px ${nodeColor}${selected ? '30' : '18'}`,
      }}
    >
      <div className="flex items-start gap-3">
        <div className="mt-1 h-2.5 w-2.5 rounded-full" style={{ backgroundColor: nodeColor, boxShadow: `0 0 8px ${nodeColor}` }} />
        <div className="min-w-0">
          <div className="text-[10px] uppercase tracking-[0.2em] text-outline">{tag}</div>
          <div className="mt-1 text-[13px] font-black uppercase font-headline tracking-[0.12em] text-white">
            {label}
          </div>
          {variant !== 'preview' && (
            <div className="mt-2 text-[11px] leading-relaxed text-on-surface-variant">
              {data.whyItMatters}
            </div>
          )}
        </div>
      </div>
      <Handle type="target" position={Position.Top} className="opacity-0" />
      <Handle type="source" position={Position.Bottom} className="opacity-0" />
      <Handle type="target" position={Position.Left} className="opacity-0" />
      <Handle type="source" position={Position.Right} className="opacity-0" />
    </div>
  );
}
