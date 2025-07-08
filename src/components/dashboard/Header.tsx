
import { LogOut, Menu, Plus, Search } from 'lucide-react';

interface HeaderProps {
  onLogout: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onToggleSidebar: () => void;
  onNewSnippet: () => void;
}

export const Header = ({ onLogout, searchQuery, onSearchChange, onToggleSidebar, onNewSnippet }: HeaderProps) => {
  return (
    <header className="bg-white/10 backdrop-blur-xl border-b border-white/20 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <h1 className="text-2xl font-bold text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            CodeVault
          </h1>
        </div>

        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search snippets..."
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onNewSnippet}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>New Snippet</span>
          </button>
          
          <button
            onClick={onLogout}
            className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
