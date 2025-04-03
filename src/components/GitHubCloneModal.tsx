
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Github, CheckCircle, XCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface GitHubCloneModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GitHubCloneModal: React.FC<GitHubCloneModalProps> = ({ isOpen, onClose }) => {
  const [repoUrl, setRepoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClone = () => {
    // Simple validation
    if (!repoUrl) {
      setError('Please enter a GitHub repository URL');
      return;
    }

    // GitHub URL validation (simple regex)
    const githubUrlRegex = /^https:\/\/github\.com\/[\w-]+\/[\w-]+\.git$/;
    
    if (!githubUrlRegex.test(repoUrl)) {
      setError('Please enter a valid GitHub repository URL (https://github.com/username/repo.git)');
      return;
    }

    setError(null);
    setIsLoading(true);

    // Simulate API call to clone repository
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      
      toast({
        title: "Repository Cloned Successfully",
        description: "The project has been cloned to your GitHub repository.",
      });

      // Reset after short delay
      setTimeout(() => {
        setIsSuccess(false);
        setRepoUrl('');
        onClose();
      }, 2000);
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Github className="h-5 w-5" />
            Clone to GitHub Repository
          </DialogTitle>
          <DialogDescription>
            Enter the URL of your GitHub repository where you want to clone this project.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="repo-url" className="text-sm font-medium">
              Repository URL
            </label>
            <Input
              id="repo-url"
              placeholder="https://github.com/username/repo.git"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              disabled={isLoading || isSuccess}
              className={error ? "border-destructive" : ""}
            />
            {error && (
              <p className="text-xs text-destructive">{error}</p>
            )}
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p>Make sure you have:</p>
            <ul className="list-disc list-inside ml-2 mt-1 space-y-1">
              <li>Created an empty repository</li>
              <li>Connected your GitHub account</li>
              <li>Sufficient permissions to push to the repository</li>
            </ul>
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={onClose}
            disabled={isLoading || isSuccess}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleClone}
            disabled={isLoading || isSuccess}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full border-2 border-current border-r-transparent animate-spin"></div>
                Cloning...
              </span>
            ) : isSuccess ? (
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Cloned!
              </span>
            ) : (
              "Clone Repository"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GitHubCloneModal;
