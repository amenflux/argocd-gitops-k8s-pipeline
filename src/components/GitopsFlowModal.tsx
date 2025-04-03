import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, GitBranch, GitCommit, RefreshCw, Box, Database, Globe, Server } from 'lucide-react';
import CodeBlock from './CodeBlock';

interface GitopsFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
  section: 'git' | 'cicd' | 'argocd' | 'kubernetes' | null;
}

const GitopsFlowModal: React.FC<GitopsFlowModalProps> = ({ isOpen, onClose, section }) => {
  // Content for each section
  const renderContent = () => {
    switch(section) {
      case 'git': {
        return (
          <div className="space-y-6 animate-dialog-in">
            <DialogHeader>
              <DialogTitle className="text-2xl flex items-center gap-2 text-purple-500">
                <GitBranch className="h-6 w-6" />
                Git Repository
              </DialogTitle>
              <DialogDescription className="text-lg">
                Source of truth for application configuration and code
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-purple-500">Repository Structure</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-muted p-4 rounded-md text-sm">
{`├── .github/
│   └── workflows/
│       └── ci.yaml
├── helm/
│   ├── node-app/
│   │   ├── Chart.yaml
│   │   ├── values.yaml
│   │   └── templates/
│   │       ├── deployment.yaml
│   │       ├── service.yaml
│   │       └── configmap.yaml
├── src/
│   ├── app.js
│   ├── routes/
│   └── models/
└── kubernetes/
    ├── namespace.yaml
    └── argocd-application.yaml`}
                  </pre>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-purple-500">GitOps Workflow</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-2">
                    <GitCommit className="h-5 w-5 text-purple-500 mt-1 shrink-0" />
                    <div>
                      <span className="font-medium">Make Changes</span>
                      <p className="text-sm text-muted-foreground">Update code, Helm charts, or Kubernetes manifests</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <GitBranch className="h-5 w-5 text-purple-500 mt-1 shrink-0" />
                    <div>
                      <span className="font-medium">Commit and Push</span>
                      <p className="text-sm text-muted-foreground">Create a Pull Request for team review</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-purple-500 mt-1 shrink-0" />
                    <div>
                      <span className="font-medium">Merge to Main</span>
                      <p className="text-sm text-muted-foreground">Triggers CI/CD pipeline and ArgoCD sync</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Tabs defaultValue="helm">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="helm">Helm Chart</TabsTrigger>
                <TabsTrigger value="app">Node.js Code</TabsTrigger>
                <TabsTrigger value="argo">ArgoCD Config</TabsTrigger>
              </TabsList>
              <TabsContent value="helm">
                <CodeBlock
                  title="helm/node-app/values.yaml"
                  code={`# Default values for node-app
replicaCount: 1

image:
  repository: yourregistry/node-app
  tag: latest
  pullPolicy: Always

service:
  type: ClusterIP
  port: 80
  targetPort: 3000

mongodb:
  enabled: true
  architecture: standalone
  auth:
    rootPassword: "\${MONGODB_ROOT_PASSWORD}"
    username: "\${MONGODB_USERNAME}"
    password: "\${MONGODB_PASSWORD}"
    database: appdb`}
                  language="yaml"
                />
              </TabsContent>
              <TabsContent value="app">
                <CodeBlock
                  title="src/app.js"
                  code={`const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: process.env.MONGODB_USERNAME,
  pass: process.env.MONGODB_PASSWORD
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Node.js API is running' });
});

// Start server
app.listen(port, () => {
  console.log(\`Server running on port \${port}\`);
});`}
                  language="javascript"
                />
              </TabsContent>
              <TabsContent value="argo">
                <CodeBlock
                  title="kubernetes/argocd-application.yaml"
                  code={`apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: node-app
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/yourusername/node-app.git
    targetRevision: HEAD
    path: helm/node-app
    helm:
      valueFiles:
        - values.yaml
  destination:
    server: https://kubernetes.default.svc
    namespace: node-app
  syncPolicy:
    automated:
      prune: true
      selfHeal: true`}
                  language="yaml"
                />
              </TabsContent>
            </Tabs>
          </div>
        );
      }
      
      case 'cicd': {
        return (
          <div className="space-y-6 animate-dialog-in">
            <DialogHeader>
              <DialogTitle className="text-2xl flex items-center gap-2 text-gitlab">
                <RefreshCw className="h-6 w-6" />
                CI/CD Pipeline
              </DialogTitle>
              <DialogDescription className="text-lg">
                Automated validation and verification of changes
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-gitlab">Pipeline Stages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-2">
                      <Badge className="bg-gitlab h-6 flex items-center">1</Badge>
                      <div>
                        <span className="font-medium">Lint & Validate</span>
                        <p className="text-sm text-muted-foreground">Check YAML, Helm charts, and Kubernetes manifests for errors</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge className="bg-gitlab h-6 flex items-center">2</Badge>
                      <div>
                        <span className="font-medium">Build & Test</span>
                        <p className="text-sm text-muted-foreground">Build Docker image and run automated tests</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge className="bg-gitlab h-6 flex items-center">3</Badge>
                      <div>
                        <span className="font-medium">Security Scanning</span>
                        <p className="text-sm text-muted-foreground">Check for vulnerabilities in images and dependencies</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge className="bg-gitlab h-6 flex items-center">4</Badge>
                      <div>
                        <span className="font-medium">Push & Register</span>
                        <p className="text-sm text-muted-foreground">Push image to registry and update Helm values</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-gitlab">Pipeline Benefits</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-gitlab mt-1 shrink-0" />
                    <div>
                      <span className="font-medium">Quality Gate</span>
                      <p className="text-sm text-muted-foreground">Prevents bad configurations from reaching production</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-gitlab mt-1 shrink-0" />
                    <div>
                      <span className="font-medium">Security First</span>
                      <p className="text-sm text-muted-foreground">Early detection of security issues and vulnerabilities</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-gitlab mt-1 shrink-0" />
                    <div>
                      <span className="font-medium">Consistency</span>
                      <p className="text-sm text-muted-foreground">Ensures all changes follow established patterns</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-gitlab mt-1 shrink-0" />
                    <div>
                      <span className="font-medium">Traceability</span>
                      <p className="text-sm text-muted-foreground">Links code changes to deployed artifacts</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <CodeBlock
              title="GitHub Actions Workflow (.github/workflows/ci.yaml)"
              code={`name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Set up Helm
        uses: azure/setup-helm@v1
        
      - name: Lint Helm Chart
        run: helm lint ./helm/node-app
        
      - name: Validate Kubernetes manifests
        uses: instrumenta/kubeval-action@master
        with:
          files: kubernetes/

  build:
    needs: validate
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v1
        
      - name: Build and push
        uses: docker/build-push-action@v2
        with:
          context: .
          push: \${{ github.event_name != 'pull_request' }}
          tags: yourregistry/node-app:\${{ github.sha }}
          
  security-scan:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Run Trivy vulnerability scanner
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: 'yourregistry/node-app:\${{ github.sha }}'
          format: 'table'
          exit-code: '1'
          severity: 'CRITICAL'`}
              language="yaml"
            />
          </div>
        );
      }
      
      case 'argocd': {
        return (
          <div className="space-y-6 animate-dialog-in">
            <DialogHeader>
              <DialogTitle className="text-2xl flex items-center gap-2 text-argocd">
                <RefreshCw className="h-6 w-6" />
                ArgoCD
              </DialogTitle>
              <DialogDescription className="text-lg">
                Kubernetes-native GitOps continuous delivery tool
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-argocd">How ArgoCD Works</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-2">
                      <Badge className="bg-argocd h-6 flex items-center">1</Badge>
                      <div>
                        <span className="font-medium">Git Repository Monitoring</span>
                        <p className="text-sm text-muted-foreground">Continuously watches configured Git repositories</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge className="bg-argocd h-6 flex items-center">2</Badge>
                      <div>
                        <span className="font-medium">Desired State Detection</span>
                        <p className="text-sm text-muted-foreground">Detects changes in Helm charts or Kubernetes manifests</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge className="bg-argocd h-6 flex items-center">3</Badge>
                      <div>
                        <span className="font-medium">Cluster Synchronization</span>
                        <p className="text-sm text-muted-foreground">Applies changes to bring the cluster to the desired state</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge className="bg-argocd h-6 flex items-center">4</Badge>
                      <div>
                        <span className="font-medium">Health Monitoring</span>
                        <p className="text-sm text-muted-foreground">Continuously monitors application health</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-argocd">ArgoCD Benefits</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-argocd mt-1 shrink-0" />
                    <div>
                      <span className="font-medium">Declarative GitOps</span>
                      <p className="text-sm text-muted-foreground">Git repository is the single source of truth</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-argocd mt-1 shrink-0" />
                    <div>
                      <span className="font-medium">Self-Healing</span>
                      <p className="text-sm text-muted-foreground">Automatically corrects drift between Git and cluster state</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-argocd mt-1 shrink-0" />
                    <div>
                      <span className="font-medium">Multi-Cluster Support</span>
                      <p className="text-sm text-muted-foreground">Manage applications across multiple Kubernetes clusters</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-argocd mt-1 shrink-0" />
                    <div>
                      <span className="font-medium">Visualization</span>
                      <p className="text-sm text-muted-foreground">Web UI for application deployment status and history</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CodeBlock
                title="ArgoCD Application Definition"
                code={`apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: node-app
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/yourusername/node-app.git
    targetRevision: HEAD
    path: helm/node-app
    helm:
      valueFiles:
        - values.yaml
  destination:
    server: https://kubernetes.default.svc
    namespace: node-app
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
      - CreateNamespace=true`}
                language="yaml"
              />
              
              <CodeBlock
                title="ArgoCD Installation"
                code={`# Create namespace
kubectl create namespace argocd

# Install ArgoCD
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# Access the ArgoCD API server
kubectl port-forward svc/argocd-server -n argocd 8080:443

# Login using the CLI
# Default username: admin
# Get password with:
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d`}
                language="bash"
              />
            </div>
          </div>
        );
      }
      
      case 'kubernetes': {
        return (
          <div className="space-y-6 animate-dialog-in">
            <DialogHeader>
              <DialogTitle className="text-2xl flex items-center gap-2 text-kubernetes">
                <Box className="h-6 w-6" />
                Kubernetes
              </DialogTitle>
              <DialogDescription className="text-lg">
                Container orchestration platform for deployment and scaling
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-kubernetes">Architecture</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-2">
                      <Server className="h-5 w-5 text-kubernetes mt-1 shrink-0" />
                      <div>
                        <span className="font-medium">Control Plane</span>
                        <p className="text-sm text-muted-foreground">API Server, Scheduler, Controller Manager, etcd</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Server className="h-5 w-5 text-kubernetes mt-1 shrink-0" />
                      <div>
                        <span className="font-medium">Worker Nodes</span>
                        <p className="text-sm text-muted-foreground">kubelet, kube-proxy, Container Runtime</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Box className="h-5 w-5 text-kubernetes mt-1 shrink-0" />
                      <div>
                        <span className="font-medium">Workloads</span>
                        <p className="text-sm text-muted-foreground">Deployments, StatefulSets, DaemonSets, Jobs</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Globe className="h-5 w-5 text-kubernetes mt-1 shrink-0" />
                      <div>
                        <span className="font-medium">Networking</span>
                        <p className="text-sm text-muted-foreground">Services, Ingress, Network Policies</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-kubernetes">Deployment Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <Card className="border border-kubernetes/30">
                      <CardHeader className="py-2">
                        <CardTitle className="text-sm font-medium">Node.js Application</CardTitle>
                      </CardHeader>
                      <CardContent className="py-2 text-xs">
                        <Badge className="bg-kubernetes mr-2">Deployment</Badge>
                        <Badge className="bg-kubernetes/80 mr-2">Service</Badge>
                        <Badge className="bg-kubernetes/60">ConfigMap</Badge>
                        <div className="mt-2 text-muted-foreground">Version: 1.0.0</div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border border-mongodb/30">
                      <CardHeader className="py-2">
                        <CardTitle className="text-sm font-medium">MongoDB Database</CardTitle>
                      </CardHeader>
                      <CardContent className="py-2 text-xs">
                        <Badge className="bg-mongodb mr-2">StatefulSet</Badge>
                        <Badge className="bg-mongodb/80 mr-2">Service</Badge>
                        <Badge className="bg-mongodb/60">PersistentVolume</Badge>
                        <div className="mt-2 text-muted-foreground">Version: 4.4.6</div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border border-kubernetes/30">
                      <CardHeader className="py-2">
                        <CardTitle className="text-sm font-medium">Ingress Configuration</CardTitle>
                      </CardHeader>
                      <CardContent className="py-2 text-xs">
                        <Badge className="bg-kubernetes mr-2">Ingress</Badge>
                        <Badge className="bg-kubernetes/80">TLS</Badge>
                        <div className="mt-2 text-muted-foreground">nginx-ingress-controller</div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Tabs defaultValue="deployment">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="deployment">Deployment</TabsTrigger>
                <TabsTrigger value="service">Service</TabsTrigger>
                <TabsTrigger value="statefulset">StatefulSet</TabsTrigger>
                <TabsTrigger value="configmap">ConfigMap</TabsTrigger>
              </TabsList>
              <TabsContent value="deployment">
                <CodeBlock
                  title="Node.js Application Deployment"
                  code={`apiVersion: apps/v1
kind: Deployment
metadata:
  name: node-app
  namespace: node-app
  labels:
    app: node-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: node-app
  template:
    metadata:
      labels:
        app: node-app
    spec:
      containers:
      - name: node-app
        image: yourregistry/node-app:latest
        ports:
        - containerPort: 3000
        env:
        - name: MONGODB_URI
          value: "mongodb://mongodb.node-app.svc.cluster.local:27017/appdb"
        - name: MONGODB_USERNAME
          valueFrom:
            secretKeyRef:
              name: mongodb-credentials
              key: MONGODB_USERNAME
        - name: MONGODB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: mongodb-credentials
              key: MONGODB_PASSWORD
        resources:
          limits:
            cpu: "0.5"
            memory: "512Mi"
          requests:
            cpu: "0.2"
            memory: "256Mi"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10`}
                  language="yaml"
                />
              </TabsContent>
              <TabsContent value="service">
                <CodeBlock
                  title="Node.js Service Configuration"
                  code={`apiVersion: v1
kind: Service
metadata:
  name: node-app
  namespace: node-app
spec:
  selector:
    app: node-app
  ports:
  - port: 80
    targetPort: 3000
  type: ClusterIP`}
                  language="yaml"
                />
              </TabsContent>
              <TabsContent value="statefulset">
                <CodeBlock
                  title="MongoDB StatefulSet Configuration"
                  code={`apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: mongodb
  namespace: node-app
spec:
  serviceName: "mongodb"
  replicas: 1
  selector:
    matchLabels:
      app: mongodb
  template:
    metadata:
      labels:
        app: mongodb
    spec:
      containers:
      - name: mongodb
        image: mongo:4.4.6
        ports:
        - containerPort: 27017
        env:
        - name: MONGO_INITDB_ROOT_PASSWORD
          valueFrom:
            secretKeyRef:
              name: mongodb-credentials
              key: MONGODB_ROOT_PASSWORD
        - name: MONGO_INITDB_DATABASE
          value: "appdb"
        - name: MONGO_INITDB_USERNAME
          valueFrom:
            secretKeyRef:
              name: mongodb-credentials
              key: MONGODB_USERNAME
        - name: MONGO_INITDB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: mongodb-credentials
              key: MONGODB_PASSWORD
        volumeMounts:
        - name: mongodb-data
          mountPath: /data/db
  volumeClaimTemplates:
  - metadata:
      name: mongodb-data
    spec:
      accessModes: [ "ReadWriteOnce" ]
      resources:
        requests:
          storage: 10Gi`}
                  language="yaml"
                />
              </TabsContent>
              <TabsContent value="configmap">
                <CodeBlock
                  title="Application Configuration ConfigMap"
                  code={`apiVersion: v1
kind: ConfigMap
metadata:
  name: node-app-config
  namespace: node-app
data:
  app-config.json: |
    {
      "logLevel": "info",
      "enableMetrics": true,
      "metricsPort": 9090,
      "corsAllowedOrigins": "*",
      "rateLimiting": {
        "enabled": true,
        "maxRequests": 100,
        "windowMs": 60000
      }
    }`}
                  language="yaml"
                />
              </TabsContent>
            </Tabs>
          </div>
        );
      }
      
      default:
        return <div className="p-6 text-center text-muted-foreground">Select a component to view details</div>;
    }
  };

  return (
    <Dialog open={isOpen && section !== null} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[85vh] p-0 gap-0 overflow-hidden bg-card">
        <ScrollArea className="h-[calc(85vh-2rem)] p-6">
          {renderContent()}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default GitopsFlowModal;
