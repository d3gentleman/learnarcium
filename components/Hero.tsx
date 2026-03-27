'use client';

import { motion } from 'framer-motion';
import ActionLink from './ActionLink';
import { LinkAction } from '../types/domain';

interface HeroProps {
  hero: {
    subtitle: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    primaryCta: LinkAction;
    secondaryCta: LinkAction;
  };
  quickLinks: LinkAction[];
  liveStatusFeed: Array<{ status: string; text: string }>;
}

export default function Hero({ hero, quickLinks, liveStatusFeed }: HeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-outline-variant/30 bg-background pt-32 pb-24 lg:pt-48">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 h-full w-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,163,0.1),transparent_70%)]" />
        <div className="absolute right-0 top-0 h-[500px] w-px bg-gradient-to-b from-primary/50 to-transparent" />
        <div className="absolute left-[20%] top-0 h-full w-px bg-outline-variant/10" />
        <div className="absolute left-[40%] top-0 h-full w-px bg-outline-variant/10" />
        <div className="absolute left-[60%] top-0 h-full w-px bg-outline-variant/10" />
        <div className="absolute left-[80%] top-0 h-full w-px bg-outline-variant/10" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-8">
        <div className="grid grid-cols-12 gap-8 lg:gap-16">
          {/* Left: Content */}
          <div className="col-span-12 flex flex-col justify-center lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="mb-6 inline-flex border border-primary/40 bg-primary/5 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                {hero.subtitle}
              </div>
              <h1 className="mb-8 font-space text-6xl font-black leading-tight uppercase tracking-tighter text-white md:text-8xl">
                {hero.titleLine1} <br />
                <span className="text-primary">{hero.titleLine2}</span>
              </h1>
              <p className="mb-10 max-w-xl font-jetbrains text-lg leading-relaxed text-on-surface-variant">
                {hero.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <ActionLink
                  action={hero.primaryCta}
                  className="bg-primary text-black px-8 py-4 font-black uppercase tracking-widest transition-all hover:-translate-y-1 hover:brightness-110 active:translate-y-0"
                >
                  {hero.primaryCta.label}
                </ActionLink>
                <ActionLink
                  action={hero.secondaryCta}
                  className="border-2 border-primary/50 text-white px-8 py-4 font-black uppercase tracking-widest transition-all hover:-translate-y-1 hover:bg-primary/10 active:translate-y-0"
                >
                  {hero.secondaryCta.label}
                </ActionLink>
              </div>
            </motion.div>
          </div>

          {/* Right: Technical Panel */}
          <div className="col-span-12 lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative border-4 border-black bg-surface-container-low p-6 shadow-[12px_12px_0px_rgba(0,0,0,1)] before:absolute before:-top-1 before:-left-1 before:h-4 before:w-4 before:border-t-4 before:border-l-4 before:border-primary"
            >
              <div className="mb-6 flex items-center justify-between border-b border-outline-variant/30 pb-4">
                <div className="font-jetbrains text-[10px] font-bold uppercase tracking-widest text-primary">
                  SYSTEM_STATUS_v0.2
                </div>
                <div className="flex gap-1">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <div className="h-2 w-2 rounded-full bg-primary/30" />
                  <div className="h-2 w-2 rounded-full bg-primary/10" />
                </div>
              </div>

              <div className="mb-8 space-y-4">
                <div className="font-jetbrains text-[10px] uppercase tracking-widest text-on-surface-variant/60">
                  Live_Feeds
                </div>
                {liveStatusFeed.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 font-jetbrains text-xs">
                    <span className={`font-black ${item.status === 'OK' ? 'text-primary' : 'text-error'}`}>
                      [{item.status}]
                    </span>
                    <span className="text-white uppercase">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="font-jetbrains text-[10px] uppercase tracking-widest text-on-surface-variant/60">
                  Quick_Links
                </div>
                {quickLinks.map((link, i) => (
                  <ActionLink
                    key={i}
                    action={link}
                    className="flex items-center justify-between border border-outline-variant/30 bg-surface-container p-3 font-jetbrains text-xs transition-colors hover:border-primary/50 hover:bg-primary/5"
                  >
                    <span className="font-black text-white">{link.label}</span>
                    <span className="text-primary opacity-50">→</span>
                  </ActionLink>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
