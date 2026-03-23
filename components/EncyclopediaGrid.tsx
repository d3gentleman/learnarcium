import ActionLink from './ActionLink';
import { KnowledgeCategory } from '../types/domain';

export default function EncyclopediaGrid({ categories }: { categories: KnowledgeCategory[] }) {
  return (
    <div className="console-window col-span-12">
      <div className="console-header">
        <span>MODULE_03: ENCYCLOPEDIA_CATEGORIES</span>
        <span>TOTAL_RECORDS: 12,482</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-outline-variant/30">
        {categories.map((cat, idx) => (
          <div key={idx} className="bg-surface-container-lowest p-8 hover:bg-surface-container transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 border-2 border-primary flex items-center justify-center">
                <span className="font-black text-xl text-primary">{cat.prefix}</span>
              </div>
              <span className="text-[10px] text-outline font-mono">{cat.tag}</span>
            </div>
            <h4 className="text-2xl font-black mb-2 uppercase group-hover:text-primary transition-colors">{cat.title}</h4>
            <p className="text-sm text-on-surface-variant mb-6 max-w-md">{cat.description}</p>
            <div className="flex gap-4">
              <ActionLink
                action={cat.action}
                className="bg-primary/10 border border-primary text-primary px-4 py-2 text-[10px] font-bold uppercase hover:bg-primary hover:text-on-primary transition-all"
                unavailableClassName="bg-surface-container-high border border-outline-variant/30 text-outline px-4 py-2 text-[10px] font-bold uppercase cursor-not-allowed"
              >
                {cat.action.label}
              </ActionLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
