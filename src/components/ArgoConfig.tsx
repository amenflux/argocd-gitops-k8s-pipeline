
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CodeBlock from './CodeBlock';

const ArgoConfig = () => {
  const argoApplicationYaml = `# application.yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: \${APPLICATION_NAME}
  namespace: argocd
  labels:
    environment: \${ENVIRONMENT}
spec:
  project: \${PROJECT_NAME}
  source:
    repoURL: \${GIT_REPOSITORY_URL}
    targetRevision: \${GIT_REVISION}
    path: \${HELM_CHARTS_PATH}
    helm:
      valueFiles:
      - values-\${ENVIRONMENT}.yaml
      parameters:
      - name: image.tag
        value: \${IMAGE_TAG}
      - name: replicaCount
        value: "\${REPLICA_COUNT}"
  destination:
    server: \${KUBERNETES_API_URL}
    namespace: \${APPLICATION_NAMESPACE}
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
      allowEmpty: false
    syncOptions:
      - CreateNamespace=true
      - ServerSideApply=true
      - PruneLast=true
      - RespectIgnoreDifferences=true
  # Health and resource management
  revisionHistoryLimit: 5
  ignoreDifferences:
  - group: apps
    kind: Deployment
    jsonPointers:
    - /spec/replicas`;

  const argoProjectYaml = `# project.yaml
apiVersion: argoproj.io/v1alpha1
kind: AppProject
metadata:
  name: \${PROJECT_NAME}
  namespace: argocd
  # Add labels for organization and environment
  labels:
    environment: \${ENVIRONMENT}
    team: \${TEAM_NAME}
spec:
  description: \${PROJECT_DESCRIPTION}
  
  # Source repositories
  sourceRepos:
  - '\${GIT_REPOSITORY_URL}'
  
  # Destination clusters and namespaces
  destinations:
  - namespace: '\${APPLICATION_NAMESPACE}'
    server: \${KUBERNETES_API_URL}
  - namespace: '\${APPLICATION_NAMESPACE}-*'
    server: \${KUBERNETES_API_URL}
  
  # Cluster resources that applications can use
  clusterResourceWhitelist:
  - group: ''
    kind: Namespace
  - group: 'apps'
    kind: '*'
  - group: 'networking.k8s.io'
    kind: '*'
  - group: 'autoscaling'
    kind: '*'
  
  # Namespace resources that applications can use
  namespaceResourceWhitelist:
  - group: '*'
    kind: '*'
    
  # Role-based access control
  roles:
  - name: developer
    description: Developer role
    policies:
    - p, proj:\${PROJECT_NAME}:developer, applications, get, \${PROJECT_NAME}/*, allow
    - p, proj:\${PROJECT_NAME}:developer, applications, sync, \${PROJECT_NAME}/*, allow
  - name: admin
    description: Admin role
    policies:
    - p, proj:\${PROJECT_NAME}:admin, applications, *, \${PROJECT_NAME}/*, allow`;

  // Fixed pipeline YAML with escaped curly braces for GitHub Actions expressions
  const pipelineYaml = `# github-action.yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, development ]
    paths:
      - 'helm-charts/**'
      - 'src/**'
      - '.github/workflows/**'
  pull_request:
    branches: [ main, development ]
  workflow_dispatch:
    inputs:
      environment:
        description: 'Environment to deploy to'
        required: true
        default: 'staging'
        type: choice
        options:
          - staging
          - production

env:
  IMAGE_NAME: \${REPOSITORY_NAME}
  CHART_PATH: helm-charts/\${APPLICATION_NAME}

jobs:
  lint-and-validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Helm
        uses: azure/setup-helm@v3
        with:
          version: 'latest'
      
      - name: Lint Helm Chart
        run: |
          helm lint \${{ env.CHART_PATH }}
      
      - name: Template Chart and Validate with kubeval
        run: |
          helm template \${{ env.CHART_PATH }} > rendered-manifests.yaml
          npx kubeval rendered-manifests.yaml --strict
          
      - name: Run Security Scan
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'config'
          input: 'rendered-manifests.yaml'
          severity: 'CRITICAL,HIGH'
          format: 'table'
      
  build-and-push:
    needs: lint-and-validate
    runs-on: ubuntu-latest
    # Only build and push on main branch or manual trigger
    if: github.ref == 'refs/heads/main' || github.ref == 'refs/heads/development' || github.event_name == 'workflow_dispatch'
    outputs:
      image_tag: \${{ steps.set-image-tag.outputs.image_tag }}
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0
      
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2
      
      - name: Set image tag
        id: set-image-tag
        run: |
          if [[ "\${{ github.ref }}" == "refs/heads/main" ]]; then
            echo "image_tag=\${GITHUB_SHA::8}-\$(date +%Y%m%d%H%M%S)" >> \$GITHUB_OUTPUT
          else
            echo "image_tag=dev-\${GITHUB_SHA::8}-\$(date +%Y%m%d%H%M%S)" >> \$GITHUB_OUTPUT
          fi
      
      - name: Login to Container Registry
        uses: docker/login-action@v2
        with:
          registry: \${CONTAINER_REGISTRY}
          username: \${REGISTRY_USERNAME}
          password: \${REGISTRY_PASSWORD}
          
      - name: Build and Push
        uses: docker/build-push-action@v4
        with:
          context: .
          push: true
          tags: \${CONTAINER_REGISTRY}/\${{ env.IMAGE_NAME }}:\${{ steps.set-image-tag.outputs.image_tag }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
          build-args: |
            APP_VERSION=\${{ steps.set-image-tag.outputs.image_tag }}
      
  deploy:
    needs: build-and-push
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' || github.event_name == 'workflow_dispatch'
    env:
      IMAGE_TAG: \${{ needs.build-and-push.outputs.image_tag }}
      ENVIRONMENT: \${{ github.event.inputs.environment || (github.ref == 'refs/heads/main' && 'production' || 'staging') }}
    steps:
      - uses: actions/checkout@v3
      
      - name: Install argocd cli
        run: |
          curl -sSL -o argocd-cli https://github.com/argoproj/argo-cd/releases/latest/download/argocd-linux-amd64
          chmod +x argocd-cli
          sudo mv argocd-cli /usr/local/bin/argocd
      
      - name: Login to ArgoCD
        run: |
          argocd login \${ARGOCD_SERVER} --username \${ARGOCD_USERNAME} --password \${ARGOCD_PASSWORD} --insecure
      
      - name: Update image tag in ArgoCD app
        run: |
          argocd app set \${APPLICATION_NAME}-\${{ env.ENVIRONMENT }} -p image.tag=\${{ env.IMAGE_TAG }}
      
      - name: Sync ArgoCD Application
        run: |
          argocd app sync \${APPLICATION_NAME}-\${{ env.ENVIRONMENT }} --prune --timeout 300`;

  const deploymentInstructions = `# Deployment Instructions

# 1. Prerequisites
# Ensure you have the following tools installed:
- kubectl (https://kubernetes.io/docs/tasks/tools/install-kubectl/)
- helm (https://helm.sh/docs/intro/install/)
- argocd CLI (https://argo-cd.readthedocs.io/en/stable/cli_installation/)

# 2. Fork the GitOps Repository
# Fork the template repository to your own GitHub/GitLab account
git clone https://github.com/yourusername/gitops-k8s-template.git
cd gitops-k8s-template

# 3. Update Configuration Files
# Replace placeholders in the Helm chart with your application details
# Edit values.yaml, Chart.yaml and templates as needed

# 4. Install ArgoCD in your Kubernetes cluster
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# 5. Access the ArgoCD UI (wait for pods to be ready)
kubectl port-forward svc/argocd-server -n argocd 8080:443

# 6. Get the initial admin password
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d

# 7. Create application namespace
kubectl create namespace your-app-namespace

# 8. Apply the ArgoCD application manifest
# Update application.yaml with your specific configuration values
# Then apply it to the cluster
kubectl apply -f application.yaml

# 9. Verify deployment
kubectl get pods -n your-app-namespace

# 10. Setup Continuous Integration
# Add the GitHub Actions workflow to your repository (.github/workflows/ci.yaml)
# Configure the necessary secrets in your GitHub repository settings`;

  return (
    <div className="w-full">
      <Card className="border-2 border-argocd shadow-lg">
        <CardHeader className="bg-argocd bg-opacity-10">
          <CardTitle className="text-argocd">ArgoCD Configuration</CardTitle>
          <CardDescription>GitOps continuous deployment setup</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="application">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="application">Application</TabsTrigger>
              <TabsTrigger value="project">Project</TabsTrigger>
              <TabsTrigger value="pipeline">CI Pipeline</TabsTrigger>
              <TabsTrigger value="instructions">Deployment Steps</TabsTrigger>
            </TabsList>
            <TabsContent value="application">
              <CodeBlock 
                title="ArgoCD Application Template" 
                code={argoApplicationYaml} 
                language="yaml"
              />
            </TabsContent>
            <TabsContent value="project">
              <CodeBlock 
                title="ArgoCD Project Template" 
                code={argoProjectYaml}
                language="yaml" 
              />
            </TabsContent>
            <TabsContent value="pipeline">
              <CodeBlock 
                title="GitHub Actions Pipeline Template" 
                code={pipelineYaml}
                language="yaml" 
              />
            </TabsContent>
            <TabsContent value="instructions">
              <CodeBlock 
                title="Deployment Instructions" 
                code={deploymentInstructions}
                language="bash" 
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArgoConfig;
