
import React, { useState } from 'react';
import { Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';
import VersionDisplay from '@/components/VersionDisplay';
import GitHubCloneModal from '@/components/GitHubCloneModal';

const Header = () => {
  const [isGitHubModalOpen, setIsGitHubModalOpen] = useState(false);

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-kubernetes to-accent flex items-center justify-center">
              <div className="h-4 w-4 rounded-full bg-white"></div>
            </div>
            <span className="ml-2 text-xl font-bold tracking-tight">ArgoCD GitOps Pipeline</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button variant="outline" size="sm" onClick={() => setIsGitHubModalOpen(true)} className="flex items-center gap-1">
            <Github className="h-4 w-4" />
            <span>GitHub</span>
          </Button>
          <VersionDisplay />
        </div>
        
        <GitHubCloneModal 
          isOpen={isGitHubModalOpen}
          onClose={() => setIsGitHubModalOpen(false)}
        />
      </div>
    </header>
  );
};

export default Header;
