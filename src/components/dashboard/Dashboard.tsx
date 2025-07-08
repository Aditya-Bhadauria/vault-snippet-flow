
import { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { SnippetList } from './SnippetList';
import { SnippetEditor } from './SnippetEditor';
import { Snippet } from '@/types/snippet';

interface DashboardProps {
  onLogout: () => void;
}

export const Dashboard = ({ onLogout }: DashboardProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSnippet, setSelectedSnippet] = useState<Snippet | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [snippets, setSnippets] = useState<Snippet[]>([
    {
      id: '1',
      title: 'React useState Hook',
      description: 'Basic useState example with counter',
      code: 'const [count, setCount] = useState(0);\n\nconst increment = () => {\n  setCount(count + 1);\n};',
      language: 'javascript',
      category: 'React',
      tags: ['react', 'hooks', 'state'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '2',
      title: 'CSS Flexbox Center',
      description: 'Center content with flexbox',
      code: '.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n}',
      language: 'css',
      category: 'CSS',
      tags: ['css', 'flexbox', 'center'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]);

  const addSnippet = (snippet: Omit<Snippet, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newSnippet: Snippet = {
      ...snippet,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setSnippets([newSnippet, ...snippets]);
    setSelectedSnippet(newSnippet);
    setIsEditing(false);
  };

  const updateSnippet = (updatedSnippet: Snippet) => {
    setSnippets(snippets.map(s => 
      s.id === updatedSnippet.id 
        ? { ...updatedSnippet, updatedAt: new Date().toISOString() }
        : s
    ));
    setSelectedSnippet(updatedSnippet);
    setIsEditing(false);
  };

  const deleteSnippet = (id: string) => {
    setSnippets(snippets.filter(s => s.id !== id));
    if (selectedSnippet?.id === id) {
      setSelectedSnippet(null);
    }
  };

  const filteredSnippets = snippets.filter(snippet => {
    const matchesCategory = selectedCategory === 'all' || snippet.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snippet.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snippet.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex">
      <Sidebar 
        isOpen={sidebarOpen}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          onLogout={onLogout}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onNewSnippet={() => {
            setSelectedSnippet(null);
            setIsEditing(true);
          }}
        />
        
        <div className="flex-1 flex overflow-hidden">
          <SnippetList 
            snippets={filteredSnippets}
            selectedSnippet={selectedSnippet}
            onSelectSnippet={setSelectedSnippet}
            onEditSnippet={(snippet) => {
              setSelectedSnippet(snippet);
              setIsEditing(true);
            }}
            onDeleteSnippet={deleteSnippet}
          />
          
          <SnippetEditor 
            snippet={selectedSnippet}
            isEditing={isEditing}
            onSave={selectedSnippet ? updateSnippet : addSnippet}
            onCancel={() => {
              setIsEditing(false);
              if (!selectedSnippet) {
                setSelectedSnippet(null);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};
