import ActionLink from './ActionLink';
import BentoMap, { type BentoMapProps } from './BentoMap';
import { HomepageBlocks, UIConfig } from '../types/domain';

interface HeroMapPreviewProps {
  hero: HomepageBlocks['hero'];
  quickLinks: HomepageBlocks['quickLinks'];
  liveStatusFeed: HomepageBlocks['liveStatusFeed'];
  ui: UIConfig;
  mapProps: Omit<BentoMapProps, 'variant' | 'defaultMode'>;
}

export default function HeroMapPreview({ hero, quickLinks, liveStatusFeed, ui, mapProps }: HeroMapPreviewProps) {
  const categoryCount = mapProps.mapCategories.length;
  const featuredCount = mapProps.domainNodes.filter((node) => node.kind === 'project' && node.featuredOnOverview).length;

  return (
    <>
      <div className="console-window col-span-12 lg:col-span-3 flex flex-col h-full">
        <div className="console-header cursor-default">
          <span>{ui.heroControlEXE}</span>
          <span>{ui.heroArchivistID}</span>
        </div>
        <div className="p-4 flex-1 flex flex-col gap-4">
          <div className="bg-surface-container p-3 border border-outline-variant/30 rounded-[1.25rem]">
            <div className="text-[10px] text-primary mb-3 font-bold uppercase tracking-widest cursor-default">{ui.heroNavShortcuts}</div>
            <div className="flex flex-col gap-2">
              {quickLinks.map((link, idx) => (
                <ActionLink
                  key={idx}
                  action={link}
                  className={idx === 0
                    ? "bg-primary text-on-primary p-3 text-[10px] font-bold text-left uppercase flex justify-between items-center group rounded-[1rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-background"
                    : "bg-surface-container-high text-slate-300 p-3 text-[10px] font-bold text-left uppercase hover:bg-surface-variant transition-colors border border-outline-variant/20 rounded-[1rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"}
                  unavailableClassName="bg-surface-container-high text-outline p-3 text-[10px] font-bold text-left uppercase border border-outline-variant/20 rounded-[1rem] cursor-not-allowed opacity-70 flex justify-between items-center"
                >
                  <span>{link.label}</span>
                  {idx === 0 && <span className="group-hover:translate-x-1 transition-transform">→</span>}
                </ActionLink>
              ))}
            </div>
          </div>

          <div className="flex-1 bg-black/40 border border-outline-variant/20 p-3 overflow-hidden font-mono text-[10px] leading-relaxed cursor-default rounded-[1.25rem]">
            <div className="text-outline mb-2">{ui.heroLiveStatus}</div>
            <div className="space-y-1 text-on-surface-variant">
              {liveStatusFeed.map((feed, idx) => (
                <div key={idx} className="flex gap-2">
                  <span className="text-primary">[{feed.status}]</span>
                  <span>{feed.text}</span>
                </div>
              ))}
              <div className="mt-4 text-primary animate-pulse">{ui.heroWaitingQuery}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-[1.25rem] border border-outline-variant/25 bg-black/35 p-3">
              <div className="text-[10px] uppercase tracking-[0.22em] text-outline">{ui.heroAtlasTerritories}</div>
              <div className="mt-2 text-2xl font-black text-white">{categoryCount}</div>
            </div>
            <div className="rounded-[1.25rem] border border-outline-variant/25 bg-black/35 p-3">
              <div className="text-[10px] uppercase tracking-[0.22em] text-outline">{ui.heroFeaturedSystems}</div>
              <div className="mt-2 text-2xl font-black text-white">{featuredCount}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="console-window col-span-12 lg:col-span-9 overflow-hidden">
        <div className="console-header cursor-default pointer-events-none">
          <span>{ui.heroViewport}</span>
          <span>{ui.heroMode}</span>
        </div>
        <div className="p-8 md:p-12 relative min-h-[540px] flex flex-col justify-center overflow-hidden bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent">
          <div className="absolute inset-0 atlas-preview-mask" aria-hidden="true" />
          <div className="absolute right-12 top-10 z-10 hidden gap-3 lg:flex">
            <div className="rounded-full border border-outline-variant/25 bg-black/40 px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-outline">
              {categoryCount} {ui.heroAtlasTerritories}
            </div>
            <div className="rounded-full border border-outline-variant/25 bg-black/40 px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-outline">
              {featuredCount} {ui.heroFeaturedSystems}
            </div>
          </div>

          <div className="absolute inset-0 opacity-80 select-none pointer-events-none" aria-hidden="true">
            <BentoMap {...mapProps} variant="preview" />
          </div>

          <div className="relative z-10 max-w-2xl">
            <div className="text-primary text-xs font-bold mb-6 flex items-center gap-3 cursor-default">
              <span className="w-12 h-0.5 bg-primary"></span>
              <span className="tracking-[0.2em] uppercase">{hero.subtitle}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.9] mb-6 uppercase md:mt-20 pointer-events-none">
              {hero.titleLine1}<br />
              <span className="text-primary glitch-hover pointer-events-auto">{hero.titleLine2}</span>
            </h1>
            <p className="text-base md:text-lg mb-10 leading-relaxed text-on-surface-variant font-medium pointer-events-none">
              {hero.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <ActionLink
                action={hero.primaryCta}
                className="bg-primary text-on-primary px-8 py-4 text-xs font-black uppercase tracking-widest hover:bg-white hover:scale-[1.02] transition-all flex items-center gap-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-background"
                unavailableClassName="bg-surface-container-high border border-outline-variant/30 text-outline px-8 py-4 text-xs font-black uppercase tracking-widest flex items-center gap-2 rounded-full cursor-not-allowed opacity-70"
              >
                <span>{hero.primaryCta.label}</span>
                <span className="text-lg">▶</span>
              </ActionLink>
              <ActionLink
                action={hero.secondaryCta}
                className="border border-primary/60 text-primary px-8 py-4 text-xs font-black uppercase tracking-widest hover:bg-primary/10 transition-all bg-background/40 backdrop-blur-sm rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                unavailableClassName="border border-outline-variant/30 text-outline px-8 py-4 text-xs font-black uppercase tracking-widest bg-background/25 rounded-full cursor-not-allowed opacity-70"
              >
                {hero.secondaryCta.label}
              </ActionLink>
            </div>
          </div>

          <div className="absolute bottom-6 right-8 text-[10px] text-outline font-mono flex gap-6 cursor-default pointer-events-none">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-ping"></div>
              <span>{ui.heroRenderActive}</span>
            </div>
            <span>{ui.heroZoom}</span>
          </div>
        </div>
      </div>
    </>
  );
}
