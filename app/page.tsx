import EncyclopediaGrid from '@/components/EncyclopediaGrid';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import NavBar from '@/components/NavBar';
import RecentlyUpdated from '@/components/RecentlyUpdated';
import StartHereSection from '@/components/StartHereSection';
import {
  getFooterConfig,
  getHomepageBlocks,
  getNavigation,
  getRecentArticles,
} from '@/lib/content';

export default async function Home() {
  const navLinks = await getNavigation();
  const blocks = await getHomepageBlocks();
  const recentArticles = await getRecentArticles();
  const footerConfig = await getFooterConfig();

  return (
    <div className="col-span-12 space-y-4">
      <NavBar links={navLinks} />
      <Hero
        hero={blocks.hero}
        quickLinks={blocks.quickLinks}
        liveStatusFeed={blocks.liveStatusFeed}
      />
      <StartHereSection cards={blocks.startHereCards} />
      <EncyclopediaGrid categories={blocks.encyclopediaCategories} />
      <RecentlyUpdated articles={recentArticles} />
      <Footer config={footerConfig} />
    </div>
  );
}
