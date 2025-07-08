
import { ChevronLeft, Code, Database, Globe, Palette, Server, Smartphone } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  onToggle: () => void;
}

const categories = [
  { id: 'all', name: 'All Snippets', icon: Code, count: 42 },
  { id: 'JavaScript', name: 'JavaScript', icon: Globe, count: 15 },
  { id: 'React', name: 'React', icon: Smartphone, count: 12 },
  { id: 'CSS', name: 'CSS', icon: Palette, count: 8 },
  { id: 'Node.js', name: 'Node.js', icon: Server, count: 5 },
  { id: 'SQL', name: 'SQL', icon: Database, count: 2 }
];

export const Sidebar = ({ isOpen, selectedCategory, onCategorySelect, onToggle }: SidebarProps) => {
  return (
    <div className={`${isOpen ? 'w-64' : 'w-0'} transition-all duration-300 overflow-hidden bg-white/5 backdrop-blur-xl border-r border-white/20`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">Categories</h2>
          <button
            onClick={onToggle}
            className="p-1 text-slate-300 hover:text-white hover:bg-white/10 rounded transition-all duration-200"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        <nav className="space-y-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => onCategorySelect(category.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-white border border-blue-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="flex-1">{category.name}</span>
                <span className="text-xs bg-white/10 px-2 py-1 rounded-full">
                  {category.count}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
