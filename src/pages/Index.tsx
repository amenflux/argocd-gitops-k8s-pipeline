
import React from 'react';
import Header from '@/components/layout/Header';
import GitopsFlow from '@/components/GitopsFlow';
import NodeApp from '@/components/NodeApp';
import HelmChart from '@/components/HelmChart';
import ArgoConfig from '@/components/ArgoConfig';
import SecretsManagement from '@/components/SecretsManagement';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Kubernetes GitOps Pipeline with ArgoCD and Helm</h1>
            <p className="text-muted-foreground mb-6">
              A complete DevOps project demonstrating GitOps principles for automating Kubernetes deployments
            </p>
          </div>
          
          <section className="pb-4">
            <h2 className="text-2xl font-semibold mb-4">GitOps Workflow</h2>
            <p className="text-muted-foreground mb-6">
              The diagram below shows how changes flow from Git to Kubernetes using GitOps principles
            </p>
            <GitopsFlow />
          </section>
          
          <section className="py-4">
            <h2 className="text-2xl font-semibold mb-4">Project Components</h2>
            <Tabs defaultValue="node">
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="node">Node.js App</TabsTrigger>
                <TabsTrigger value="helm">Helm Chart</TabsTrigger>
                <TabsTrigger value="argo">ArgoCD Configuration</TabsTrigger>
                <TabsTrigger value="secrets">Secrets Management</TabsTrigger>
              </TabsList>
              <TabsContent value="node">
                <NodeApp />
              </TabsContent>
              <TabsContent value="helm">
                <HelmChart />
              </TabsContent>
              <TabsContent value="argo">
                <ArgoConfig />
              </TabsContent>
              <TabsContent value="secrets">
                <SecretsManagement />
              </TabsContent>
            </Tabs>
          </section>
          
          <section className="py-4">
            <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow dark:shadow-gray-700">
              <ol className="list-decimal list-inside space-y-4">
                <li className="font-medium">
                  <span className="text-primary">Clone the repository</span>
                  <p className="text-sm text-muted-foreground mt-1">Clone the GitHub repository containing the Node.js application, Helm charts, and ArgoCD configuration.</p>
                </li>
                <li className="font-medium">
                  <span className="text-primary">Deploy ArgoCD to your Kubernetes cluster</span>
                  <p className="text-sm text-muted-foreground mt-1">Install ArgoCD in your Kubernetes cluster following the instructions in the ArgoCD section.</p>
                </li>
                <li className="font-medium">
                  <span className="text-primary">Configure secrets</span>
                  <p className="text-sm text-muted-foreground mt-1">Create the necessary secrets for MongoDB credentials using one of the methods shown in the Secrets Management section.</p>
                </li>
                <li className="font-medium">
                  <span className="text-primary">Apply the ArgoCD Application</span>
                  <p className="text-sm text-muted-foreground mt-1">Apply the ArgoCD Application manifest to connect ArgoCD to your Git repository.</p>
                </li>
                <li className="font-medium">
                  <span className="text-primary">Watch the GitOps magic</span>
                  <p className="text-sm text-muted-foreground mt-1">ArgoCD will automatically deploy your application based on the Helm charts in your Git repository. Any changes pushed to Git will be automatically detected and applied.</p>
                </li>
              </ol>
            </div>
          </section>
        </div>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-14 md:flex-row">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            Kubernetes GitOps Pipeline Demo - Built with React, Tailwind CSS, and shadcn/ui
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
