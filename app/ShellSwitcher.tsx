'use client';

import { usePathname } from 'next/navigation';
import DiscoveryShell from '@/components/DiscoveryShell';

interface ShellSwitcherProps {
  children: React.ReactNode;
  discoveryItems: any;
  ui: any;
}

export default function ShellSwitcher({ children, discoveryItems, ui }: ShellSwitcherProps) {
  const pathname = usePathname();
  const isKeystatic = pathname.startsWith('/keystatic');
  const isLogin = pathname.startsWith('/login');

  if (isKeystatic || isLogin) {
    return (
      <div className="admin-root min-h-screen bg-black text-white selection:bg-primary selection:text-black">
        {children}
      </div>
    );
  }

  return (
    <DiscoveryShell items={discoveryItems} ui={ui}>
      <div className="fixed inset-0 scanline-effect z-[100]"></div>
      <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-4 relative z-10 p-4 md:p-8">
        {children}
      </div>
    </DiscoveryShell>
  );
}
