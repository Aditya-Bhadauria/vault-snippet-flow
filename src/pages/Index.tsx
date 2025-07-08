
import { useState } from 'react';
import { Login } from '@/components/auth/Login';
import { SignUp } from '@/components/auth/SignUp';
import { Dashboard } from '@/components/dashboard/Dashboard';

const Index = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'login' | 'signup' | 'dashboard'>('landing');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (isAuthenticated) {
    return <Dashboard onLogout={() => setIsAuthenticated(false)} />;
  }

  if (currentView === 'login') {
    return (
      <Login 
        onLogin={() => setIsAuthenticated(true)} 
        onSwitchToSignup={() => setCurrentView('signup')}
        onBack={() => setCurrentView('landing')}
      />
    );
  }

  if (currentView === 'signup') {
    return (
      <SignUp 
        onSignup={() => setIsAuthenticated(true)} 
        onSwitchToLogin={() => setCurrentView('login')}
        onBack={() => setCurrentView('landing')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center animate-fade-in">
        <div className="mb-8 animate-scale-in">
          <h1 className="text-6xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            CodeVault
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            Your secure vault for code snippets. Store, organize, and access your code anywhere.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
            <div className="text-3xl mb-4">🔒</div>
            <h3 className="text-lg font-semibold text-white mb-2">Secure Storage</h3>
            <p className="text-slate-300 text-sm">Your code snippets are safely encrypted and stored in your personal vault.</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-lg font-semibold text-white mb-2">Quick Access</h3>
            <p className="text-slate-300 text-sm">Find and copy your code snippets instantly with powerful search.</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
            <div className="text-3xl mb-4">📁</div>
            <h3 className="text-lg font-semibold text-white mb-2">Organize</h3>
            <p className="text-slate-300 text-sm">Categorize your snippets by language, project, or custom tags.</p>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <button 
            onClick={() => setCurrentView('signup')}
            className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Get Started
          </button>
          <button 
            onClick={() => setCurrentView('login')}
            className="w-full sm:w-auto px-8 py-3 bg-white/10 backdrop-blur-lg text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
