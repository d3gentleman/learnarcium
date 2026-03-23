import EncyclopediaGrid from '@/components/EncyclopediaGrid';
import Footer from '@/components/Footer';
import HeroMapPreview from '@/components/HeroMapPreview';
import NavBar from '@/components/NavBar';
import RecentlyUpdated from '@/components/RecentlyUpdated';
import StartHereSection from '@/components/StartHereSection';
import {
  getFooterConfig,
  getHomepageBlocks,
  getMapCategories,
  getMapEdges,
  getMapNodes,
  getMapSceneLayout,
  getNavigation,
  getRecentArticles,
  getUIConfig,
} from '@/lib/content';

export default function Home() {
  const navLinks = getNavigation();
  const blocks = getHomepageBlocks();
  const recentArticles = getRecentArticles();
  const footerConfig = getFooterConfig();
  const ui = getUIConfig();
  const previewMapProps = {
    domainNodes: getMapNodes(),
    domainEdges: getMapEdges(),
    mapCategories: getMapCategories(),
    sceneConfig: getMapSceneLayout(),
    ui,
  };

  return (
    <>
      <NavBar links={navLinks} />
      <HeroMapPreview
        hero={blocks.hero}
        quickLinks={blocks.quickLinks}
        liveStatusFeed={blocks.liveStatusFeed}
        ui={ui}
        mapProps={previewMapProps}
      />
      <StartHereSection cards={blocks.startHereCards} />
      <EncyclopediaGrid categories={blocks.encyclopediaCategories} />
      <RecentlyUpdated articles={recentArticles} />
      <Footer config={footerConfig} />
    </>
  );
}
