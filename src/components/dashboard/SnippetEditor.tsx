
import { useState, useEffect } from 'react';
import { Save, X, Copy } from 'lucide-react';
import { Snippet } from '@/types/snippet';

interface SnippetEditorProps {
  snippet: Snippet | null;
  isEditing: boolean;
  onSave: (snippet: Snippet | Omit<Snippet, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

const languages = [
  'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'PHP', 'Ruby', 
  'Go', 'Rust', 'Swift', 'Kotlin', 'HTML', 'CSS', 'SQL', 'Shell', 'Other'
];

const categories = [
  'JavaScript', 'React', 'Vue', 'Angular', 'Node.js', 'Python', 'Java', 
  'CSS', 'HTML', 'SQL', 'DevOps', 'Algorithms', 'Utils', 'Other'
];

export const SnippetEditor = ({ snippet, isEditing, onSave, onCancel }: SnippetEditorProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('JavaScript');
  const [category, setCategory] = useState('JavaScript');
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (snippet) {
      setTitle(snippet.title);
      setDescription(snippet.description);
      setCode(snippet.code);
      setLanguage(snippet.language);
      setCategory(snippet.category);
      setTags(snippet.tags.join(', '));
    } else if (isEditing) {
      setTitle('');
      setDescription('');
      setCode('');
      setLanguage('JavaScript');
      setCategory('JavaScript');
      setTags('');
    }
  }, [snippet, isEditing]);

  const handleSave = () => {
    const snippetData = {
      title,
      description,
      code,
      language,
      category,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };

    if (snippet) {
      onSave({ ...snippet, ...snippetData });
    } else {
      onSave(snippetData);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
  };

  if (!snippet && !isEditing) {
    return (
      <div className="flex-1 bg-white/5 backdrop-blur-xl flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold text-white mb-2">No snippet selected</h3>
          <p className="text-slate-300">Select a snippet from the list or create a new one</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white/5 backdrop-blur-xl flex flex-col">
      {isEditing ? (
        <div className="flex-1 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">
              {snippet ? 'Edit Snippet' : 'New Snippet'}
            </h2>
            <div className="flex items-center space-x-3">
              <button
                onClick={onCancel}
                className="px-4 py-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
              >
                <X className="w-4 h-4" />
              </button>
              <button
                onClick={handleSave}
                disabled={!title || !code}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter snippet title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                {languages.map(lang => (
                  <option key={lang} value={lang} className="bg-slate-800">{lang}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat} className="bg-slate-800">{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Tags</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="react, hooks, state (comma separated)"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Describe what this snippet does"
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-300 mb-2">Code</label>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-64 px-4 py-3 bg-slate-900/50 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-mono text-sm"
              placeholder="Paste your code here..."
            />
          </div>
        </div>
      ) : (
        <div className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">{snippet?.title}</h2>
              <p className="text-slate-300">{snippet?.description}</p>
            </div>
            <button
              onClick={copyToClipboard}
              className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200 hover:scale-105"
            >
              <Copy className="w-4 h-4" />
              <span>Copy</span>
            </button>
          </div>

          <div className="flex items-center space-x-4 mb-4">
            <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
              {snippet?.language}
            </span>
            <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
              {snippet?.category}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {snippet?.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs bg-white/10 text-slate-300 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="bg-slate-900/50 rounded-lg p-4 border border-white/20">
            <pre className="text-sm text-slate-300 font-mono overflow-x-auto whitespace-pre-wrap">
              {snippet?.code}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
