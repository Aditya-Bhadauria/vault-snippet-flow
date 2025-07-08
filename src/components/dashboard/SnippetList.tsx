
import { Copy, Edit, MoreVertical, Trash2 } from 'lucide-react';
import { Snippet } from '@/types/snippet';
import { useState } from 'react';

interface SnippetListProps {
  snippets: Snippet[];
  selectedSnippet: Snippet | null;
  onSelectSnippet: (snippet: Snippet) => void;
  onEditSnippet: (snippet: Snippet) => void;
  onDeleteSnippet: (id: string) => void;
}

export const SnippetList = ({ 
  snippets, 
  selectedSnippet, 
  onSelectSnippet, 
  onEditSnippet, 
  onDeleteSnippet 
}: SnippetListProps) => {
  const [hoveredSnippet, setHoveredSnippet] = useState<string | null>(null);

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    // Could add a toast notification here
  };

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      javascript: 'bg-yellow-500',
      typescript: 'bg-blue-500',
      python: 'bg-green-500',
      css: 'bg-pink-500',
      html: 'bg-orange-500',
      react: 'bg-cyan-500',
      node: 'bg-green-600',
      sql: 'bg-purple-500'
    };
    return colors[language.toLowerCase()] || 'bg-gray-500';
  };

  return (
    <div className="w-80 bg-white/5 backdrop-blur-xl border-r border-white/20 overflow-y-auto">
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white mb-4">
          Snippets ({snippets.length})
        </h3>
        
        <div className="space-y-3">
          {snippets.map((snippet) => (
            <div
              key={snippet.id}
              onMouseEnter={() => setHoveredSnippet(snippet.id)}
              onMouseLeave={() => setHoveredSnippet(null)}
              onClick={() => onSelectSnippet(snippet)}
              className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                selectedSnippet?.id === snippet.id
                  ? 'bg-gradient-to-r from-blue-500/20 to-purple-600/20 border-blue-500/30'
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-white truncate flex-1">{snippet.title}</h4>
                {hoveredSnippet === snippet.id && (
                  <div className="flex items-center space-x-1 ml-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(snippet.code);
                      }}
                      className="p-1 text-slate-400 hover:text-white hover:bg-white/10 rounded transition-colors duration-200"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditSnippet(snippet);
                      }}
                      className="p-1 text-slate-400 hover:text-white hover:bg-white/10 rounded transition-colors duration-200"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteSnippet(snippet.id);
                      }}
                      className="p-1 text-slate-400 hover:text-red-400 hover:bg-white/10 rounded transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
              
              <p className="text-sm text-slate-300 mb-3 line-clamp-2">{snippet.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className={`w-3 h-3 rounded-full ${getLanguageColor(snippet.language)}`}></span>
                  <span className="text-xs text-slate-400">{snippet.language}</span>
                </div>
                <span className="text-xs text-slate-400">{snippet.category}</span>
              </div>
              
              <div className="flex flex-wrap gap-1 mt-2">
                {snippet.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs bg-white/10 text-slate-300 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
                {snippet.tags.length > 3 && (
                  <span className="px-2 py-1 text-xs bg-white/10 text-slate-300 rounded-full">
                    +{snippet.tags.length - 3}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
