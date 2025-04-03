
import React, { useState } from 'react';
import { ArrowRight, GitBranch, Box, RefreshCw, CheckCircle, GitCommit } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import GitopsFlowModal from './GitopsFlowModal';

const GitopsFlow = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState<'git' | 'cicd' | 'argocd' | 'kubernetes' | null>(null);

  const handleCardClick = (section: 'git' | 'cicd' | 'argocd' | 'kubernetes') => {
    setSelectedSection(section);
    setModalOpen(true);
  };

  return (
    <div className="w-full p-4">
      <div className="flex flex-col lg:flex-row gap-4 mb-8 relative overflow-hidden">
        {/* Git Repository */}
        <Card 
          className="flex-1 border-2 border-purple-500 shadow-lg cursor-pointer hover:border-purple-400 transition-all hover:shadow-xl"
          onClick={() => handleCardClick('git')}
        >
          <CardHeader className="bg-purple-500 bg-opacity-10 pb-2">
            <CardTitle className="flex items-center gap-2 text-purple-600">
              <GitBranch className="h-5 w-5" />
              Git Repository
            </CardTitle>
            <CardDescription>Source of truth for configuration</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 mb-2">
              <GitCommit className="h-4 w-4 text-purple-500" />
              <span className="text-sm">manifest changes</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <GitCommit className="h-4 w-4 text-purple-500" />
              <span className="text-sm">helm chart updates</span>
            </div>
            <div className="flex items-center gap-2">
              <GitCommit className="h-4 w-4 text-purple-500" />
              <span className="text-sm">application code</span>
            </div>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            GitHub / GitLab repository
          </CardFooter>
        </Card>
        
        {/* Arrow */}
        <div className="flex justify-center items-center p-2 lg:p-0">
          <ArrowRight className="h-6 w-6 text-primary animate-flow-arrow" />
        </div>
        
        {/* CI/CD Pipeline */}
        <Card 
          className="flex-1 border-2 border-gitlab shadow-lg cursor-pointer hover:border-gitlab/80 transition-all hover:shadow-xl"
          onClick={() => handleCardClick('cicd')}
        >
          <CardHeader className="bg-gitlab bg-opacity-10 pb-2">
            <CardTitle className="flex items-center gap-2 text-gitlab">
              <RefreshCw className="h-5 w-5" />
              CI/CD Pipeline
            </CardTitle>
            <CardDescription>Validation and verification</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-gitlab" />
              <span className="text-sm">Lint manifest files</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-gitlab" />
              <span className="text-sm">Helm Chart validation</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-gitlab" />
              <span className="text-sm">Security scanning</span>
            </div>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            GitHub Actions / GitLab CI
          </CardFooter>
        </Card>
        
        {/* Arrow */}
        <div className="flex justify-center items-center p-2 lg:p-0">
          <ArrowRight className="h-6 w-6 text-primary animate-flow-arrow" />
        </div>
        
        {/* ArgoCD */}
        <Card 
          className="flex-1 border-2 border-argocd shadow-lg cursor-pointer hover:border-argocd/80 transition-all hover:shadow-xl"
          onClick={() => handleCardClick('argocd')}
        >
          <CardHeader className="bg-argocd bg-opacity-10 pb-2">
            <CardTitle className="flex items-center gap-2 text-argocd">
              <RefreshCw className="h-5 w-5" />
              ArgoCD
            </CardTitle>
            <CardDescription>GitOps controller</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-argocd" />
              <span className="text-sm">Detects config changes</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-argocd" />
              <span className="text-sm">Applies to cluster</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-argocd" />
              <span className="text-sm">Ensures desired state</span>
            </div>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            Kubernetes GitOps operator
          </CardFooter>
        </Card>
        
        {/* Arrow */}
        <div className="flex justify-center items-center p-2 lg:p-0">
          <ArrowRight className="h-6 w-6 text-primary animate-flow-arrow" />
        </div>
        
        {/* Kubernetes */}
        <Card 
          className="flex-1 border-2 border-kubernetes shadow-lg cursor-pointer hover:border-kubernetes/80 transition-all hover:shadow-xl"
          onClick={() => handleCardClick('kubernetes')}
        >
          <CardHeader className="bg-kubernetes bg-opacity-10 pb-2">
            <CardTitle className="flex items-center gap-2 text-kubernetes">
              <Box className="h-5 w-5" />
              Kubernetes
            </CardTitle>
            <CardDescription>Container orchestration</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-kubernetes" />
              <span className="text-sm">Node.js Deployment</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-kubernetes" />
              <span className="text-sm">MongoDB StatefulSet</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-kubernetes" />
              <span className="text-sm">Service & Ingress</span>
            </div>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            Running containerized workloads
          </CardFooter>
        </Card>

        {/* Modal for detailed view */}
        <GitopsFlowModal 
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          section={selectedSection}
        />
      </div>
    </div>
  );
};

export default GitopsFlow;
