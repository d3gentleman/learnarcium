import ActionLink from './ActionLink';
import { ArticleReference } from '../types/domain';

export default function RecentlyUpdated({ articles }: { articles: ArticleReference[] }) {
  return (
    <div className="console-window col-span-12">
      <div className="console-header">
        <span>MODULE_04: RECENTLY_UPDATED</span>
        <span className="text-primary">LIVE_FEED: ACTIVE</span>
      </div>
      <div className="p-4 flex flex-col gap-2">
        {articles.map((article, idx) => (
          article.action.type !== 'unavailable' ? (
            <ActionLink
              action={article.action}
              key={idx}
              className="flex justify-between items-center bg-surface-container-lowest border border-outline-variant/20 p-4 hover:bg-surface-container transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <span className="text-[10px] text-primary font-bold tracking-widest">{article.tag}</span>
                <span className="text-sm font-bold uppercase group-hover:text-primary transition-colors">{article.title}</span>
              </div>
              <div className="text-[10px] font-mono text-outline">{article.date}</div>
            </ActionLink>
          ) : (
            <div key={idx} className="flex justify-between items-center bg-surface-container-lowest border border-outline-variant/20 p-4 transition-colors">
              <div className="flex items-center gap-4">
                <span className="text-[10px] text-primary font-bold tracking-widest">{article.tag}</span>
                <span className="text-sm font-bold uppercase text-outline">{article.title}</span>
              </div>
              <div className="text-[10px] font-mono text-outline">{article.date}</div>
            </div>
          )
        ))}
      </div>
    </div>
  );
}
