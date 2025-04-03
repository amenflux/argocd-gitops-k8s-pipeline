# ArgoCD GitOps Pipeline

This project is a Kubernetes GitOps Pipeline demonstration application that showcases how GitOps principles can be used to automate Kubernetes deployments. The application provides a visual and educational overview of the complete workflow from code changes to deployment.  
[![Dashboard Preview](https://i.postimg.cc/fLFkLCjT/temp-Image3-TK7j4.avif)](https://postimg.cc/Q9QjYpyR)
[![Dashboard Preview](https://i.postimg.cc/pLtkGb5x/temp-Image-ZXf-RM3.avif)](https://postimg.cc/HVBQnNtP)

This project can be used to automate:
1. Continuous Deployment to Kubernetes - Any changes pushed to the Git repository trigger automatic validation and deployment to the Kubernetes cluster
2. Multi-environment Deployments - Support for different environments (staging, production) with environment-specific configurations
3. Application Lifecycle Management - Automated rolling updates, scaling, and health monitoring
4. Configuration Management - Version-controlled application configurations with GitOps principles
5. Infrastructure as Code - Declarative approach to define and version the entire application stack

The templates provided can be customized to create real-world GitOps pipelines by replacing placeholders with actual values specific to your infrastructure and applications.  

[![Dashboard Preview](https://i.postimg.cc/t4ytd384/temp-Image-Enbm-Ls.avif)](https://postimg.cc/MvPQqQWC)
[![Dashboard Preview](https://i.postimg.cc/90ZZZ0p9/temp-Imagexdaf-Uo.avif)](https://postimg.cc/CnMRVF9M)
[![Dashboard Preview](https://i.postimg.cc/x1tHKWK6/temp-Image-ORh-Ym-D.avif)](https://postimg.cc/yD3kKppR)
[![Dashboard Preview](https://i.postimg.cc/59LCPHBY/temp-Imagef-FY5-Z2.avif)](https://postimg.cc/Z0Ynn5D4)
[![Dashboard Preview](https://i.postimg.cc/qvbht2TY/temp-Imageg-V2z-SU.avif)](https://postimg.cc/pmjX4hyY)

## Project Objective
The main objective is to demonstrate a complete DevOps pipeline using GitOps methodology with ArgoCD and Helm for Kubernetes deployments. It serves as an educational tool to help users understand how changes flow from Git repositories to Kubernetes clusters in an automated fashion.

## Key Features

### 1. GitOps Workflow Visualization
* Interactive diagram illustrating the flow from Git repository through CI/CD pipelines to ArgoCD and finally to Kubernetes
* Detailed information about each component in the workflow via modal pop-ups

### 2. Node.js Application Template
* Sample Node.js microservice implementation with MongoDB integration
* Containerization setup with Docker
* API endpoints and health checks for Kubernetes readiness/liveness probes

### 3. Helm Chart Templates
* Complete Helm chart structure for deploying applications to Kubernetes
* Configuration templates for values.yaml, Chart.yaml, and deployment manifests
* Best practices for resource management, scaling, and high availability  

### 4. ArgoCD Configuration
* Application and Project manifest templates following GitOps best practices
* CI/CD pipeline integration with GitHub Actions
* Deployment instructions and step-by-step guides  

### 5. Secrets Management
* Multiple approaches for secure secrets handling in Kubernetes
* Implementation examples for Kubernetes Secrets, Sealed Secrets, and External Secrets
* Best practices for managing sensitive information  

## Automation Capabilities

## Tech Stack
* React: JavaScript library for building the user interface
* TypeScript: Type-safe JavaScript for improved developer experience
* Vite: Modern frontend build tool for fast development
* Tailwind CSS: Utility-first CSS framework for styling
* shadcn/ui: High-quality UI components built with Radix UI and Tailwind
* React Router: For client-side routing
* Lucide Icons: SVG icon collection
* Tanstack React Query: For data fetching (prepared for potential API integration)

Additionally, the application demonstrates integration with these DevOps technologies:
* Kubernetes: Container orchestration platform
* ArgoCD: GitOps continuous delivery tool
* Helm: Kubernetes package manager
* GitHub Actions: CI/CD pipeline automation

## Project Structure

```plaintext
├── public/
│ ├── favicon.ico # Application favicon
│ ├── placeholder.svg # Image placeholder
│ └── robots.txt # Robots configuration
│
├── src/
│ ├── components/ # Application UI Components
│ │ ├── layout/ # Layout components
│ │ │ └── Header.tsx # Main application header
│ │ ├── ui/ # ShadCN UI Components
│ │ │ ├── accordion.tsx # Accordion component
│ │ │ ├── alert.tsx # Alert component
│ │ │ ├── badge.tsx # Badge component
│ │ │ ├── button.tsx # Button component
│ │ │ ├── card.tsx # Card component
│ │ │ ├── progress.tsx # Progress bar component
│ │ │ ├── separator.tsx # Separator component
│ │ │ ├── tabs.tsx # Tabs component
│ │ │ ├── toast.tsx # Toast notification
│ │ │ ├── tooltip.tsx # Tooltip component
│ │ │ └── ... # Other UI components
│ │ ├── ArgoConfig.tsx # ArgoCD configuration component
│ │ ├── CodeBlock.tsx # Code syntax highlighting component
│ │ ├── GitHubCloneModal.tsx # Modal for GitHub repository cloning
│ │ ├── GitopsFlow.tsx # Main GitOps flow visualization
│ │ ├── GitopsFlowModal.tsx # Detailed GitOps flow explanation modal
│ │ ├── HelmChart.tsx # Helm charts explanation component
│ │ ├── NodeApp.tsx # Node.js application explanation
│ │ ├── SecretsManagement.tsx # Kubernetes secrets management component
│ │ ├── ThemeToggle.tsx # Dark/light mode toggle
│ │ └── VersionDisplay.tsx # Version information display
│ │
│ ├── hooks/ # Custom React hooks
│ │ ├── use-mobile.tsx # Hook for responsive design
│ │ └── use-toast.ts # Toast notification hook
│ │
│ ├── lib/ # Utility libraries
│ │ └── utils.ts # Helper utility functions
│ │
│ ├── pages/ # Application pages
│ │ ├── Index.tsx # Main landing page
│ │ └── NotFound.tsx # 404 page
│ │
│ ├── App.tsx # Main application component
│ ├── index.css # Global CSS styles
│ └── main.tsx # Application entry point
│
├── tailwind.config.ts # Tailwind CSS configuration
├── vite.config.ts # Vite build configuration
├── tsconfig.json # TypeScript configuration
└── package.json # Project dependencies and scripts
```


This structure organizes the application into logical sections with components, hooks, utilities, and pages separated for better maintainability. The UI components use shadcn/ui with Tailwind CSS for styling, and the application demonstrates various aspects of GitOps workflows and Kubernetes deployments through interactive visualizations and educational content.  

## Key Components in Detail

### 1. GitopsFlow.tsx: 
Visualizes the GitOps workflow from Git repository to Kubernetes deployment with interactive cards for each step in the process. Features clickable cards for Git Repository, CI/CD Pipeline, ArgoCD, and Kubernetes with animated arrows showing the flow between components. Each card reveals detailed information when clicked through a modal component.

### 2. NodeApp.tsx: 
Provides details about the Node.js application that will be deployed, including code examples and architecture. Presents a tabbed interface showing the main app.js file, Dockerfile for containerization, and package.json configuration. Demonstrates a simple Express microservice with MongoDB integration.

### 3. HelmChart.tsx: 
Explains Helm chart structure and how it's used to package Kubernetes manifests for the application. Contains tabs for values.yaml (configuration), Chart.yaml (metadata), and template files like deployment.yaml, service.yaml, and hpa.yaml. Shows proper templating and Kubernetes resource configuration.

### 4. ArgoConfig.tsx: 
Shows ArgoCD configuration examples and explains how ArgoCD monitors Git repositories for changes. Includes templates for ArgoCD Application and Project resources, GitHub Actions CI/CD pipeline configuration, and step-by-step deployment instructions. Located at src/components/ArgoConfig.tsx, it contains yaml configurations for GitOps implementation.

### 5. SecretsManagement.tsx: 
Demonstrates different approaches to manage secrets in Kubernetes environments. Covers basic Kubernetes secrets, Helm integration patterns, Sealed Secrets for GitOps security, and External Secrets Operator for cloud provider integration. Includes security best practices warnings.

### 6. Index.tsx: 
The main page that brings all components together in a structured layout with clear sections for the workflow, components, and getting started guide. Located at src/pages/Index.tsx, it uses a tabbed interface to organize different sections and provides a comprehensive overview of the GitOps pipeline.

The application uses a custom color scheme with specific colors for different technologies (Kubernetes blue, ArgoCD red, Helm navy, etc.) and animations to provide visual feedback for the GitOps flow process.

## Config files:

The deployment, services, and other configuration files in this project are not actual files in the filesystem, but rather code examples displayed within the UI components. This project is an educational demonstration that shows what these configurations would look like in a real GitOps pipeline.

Here's where you can find these configuration examples in the codebase:
1. Deployment YAML examples are in:
    * src/components/HelmChart.tsx - Contains deployment.yaml, service.yaml, and secrets.yaml template examples
    * src/components/GitopsFlowModal.tsx - Has more detailed Kubernetes manifest examples
2. Service configurations are in:
    * src/components/HelmChart.tsx - Contains the service.yaml template
    * src/components/GitopsFlowModal.tsx - Shows additional service configuration examples
3. ArgoCD configurations are in:
    * src/components/ArgoConfig.tsx - Shows application.yaml and project.yaml examples
    * src/components/GitopsFlowModal.tsx - Contains more detailed ArgoCD configuration examples
4. Other configurations:
    * CI/CD pipeline examples in src/components/ArgoConfig.tsx
    * MongoDB StatefulSet examples in src/components/GitopsFlowModal.tsx
    * Secrets management examples in src/components/SecretsManagement.tsx

These configurations are presented as code blocks in the UI to demonstrate what they would look like in a real implementation, but they aren't meant to be deployed to an actual Kubernetes cluster. The application serves as a reference guide for understanding GitOps workflows rather than as a functioning Kubernetes application itself.

## Customizing the Kubernetes GitOps Pipeline Project
This project is an educational demonstration of a GitOps workflow with Kubernetes, Helm, and ArgoCD. Here's a detailed guide on how to customize every aspect of the project to make it your own:

### 1. Project Branding and Styling
**Update Site Title and Metadata**
* File: index.html
    * Line 5: Change `<title>ArgoCD GitOps Pipeline</title>` to your project name
    * Line 6: Update the meta description
    * Lines 9-13: Modify OpenGraph metadata for social sharing

**Customize Color Scheme**
* File: tailwind.config.ts
    * Lines 60-69: Modify the DevOps themed colors to match your brand
    * Lines 14-59: Adjust primary, secondary, accent colors in the HSL values

**Modify Root CSS Variables**
* File: src/index.css
    * Lines 6-40: Modify the CSS variables for light mode
    * Lines 42-76: Modify the CSS variables for dark mode

### 2. Main Page Content
**Update Landing Page**
* File: src/pages/Index.tsx
    * Lines 13-16: Change the main heading and description
    * Lines 18-23: Modify the GitOps workflow section text
    * Lines 85-110: Update the "Getting Started" steps to match your workflow

**Customize Header**
* File:  src/components/layout/Header.tsx
    * Line 15: Change the logo/icon styling
    * Line 17: Update the application name

**Modify Footer**
* File: src/pages/Index.tsx
    * Lines 112-118: Update the footer text and links

### 3. Application Components
**Node.js Application**
* File: src/components/NodeApp.tsx
    * Lines 8-65: Replace the Node.js application code with your own application code
    * Lines 67-84: Update the Dockerfile to match your application requirements
    * Lines 86-107: Modify package.json example to include your dependencies

**Helm Chart Configuration**
* File: src/components/HelmChart.tsx
    * Lines 8-67: Update the values.yaml to match your application's configuration
    * Lines 69-92: Modify Chart.yaml to reference your app and dependencies
    * Lines 94-137: Update deployment.yaml template with your app's specific requirements
    * Lines 139-166: Customize service.yaml to expose your application correctly
    * Lines 168-206: Adjust the HPA configuration for your application needs

**ArgoCD Configuration**
* File: src/components/ArgoConfig.tsx
    * Lines 8-38: Update the ArgoCD application.yaml with your Git repository URL and other settings
    * Lines 40-86: Modify the project.yaml with your project specifics
    * Lines 89-220: Change CI/CD pipeline examples to match your CI/CD tools
    * Lines 222-254: Update deployment instructions for your specific environment

**Secrets Management**
* File: src/components/SecretsManagement.tsx
    * Lines 9-33: Update Kubernetes secret examples with your application's required secrets
    * Lines 35-67: Modify Helm secrets handling to match your approach
    * Lines 69-99: Customize SealedSecrets example if you're using this approach
    * Lines 101-165: Update External Secrets example with your cloud provider

### 4. GitOps Flow Visualization
**Customize Flow Diagram**
* File: src/components/GitopsFlow.tsx
    * Lines 13-130: Modify the card components to match your actual GitOps workflow
    * Update component labels and descriptions in each card

**Flow Modal Details**
* File: src/components/GitopsFlowModal.tsx
    * Update the detailed flow descriptions and code examples to match your implementation

### 5. Application Configuration
**Routes Configuration**
* File: src/App.tsx
    * Lines 11-17: Add any additional routes for new pages you create

**Main Entry Point**
* File: src/main.tsx
    * Update any global providers or configuration


## Variables and Secrets to Replace
While this is a demonstration project without real secrets, in a real implementation you would need to replace:

1. **Git Repository URLs:**
    * In `src/components/ArgoConfig.tsx` line 14: `repoURL: ${GIT_REPOSITORY_URL}`
    * In `src/components/ArgoConfig.tsx` line 42: `- '${GIT_REPOSITORY_URL}'`

2. **Container Registry:**
    * In `src/components/HelmChart.tsx` line 11: `repository: ${CONTAINER_REGISTRY}/${IMAGE_REPOSITORY}`

3. **Domain Names:**
    * In `src/components/HelmChart.tsx` line 67: `host: ${APP_HOSTNAME}`

4. **Database Credentials:**
    * All placeholder variables in `src/components/SecretsManagement.tsx`
    * MongoDB connection strings in `src/components/NodeApp.tsx`

5. **Kubernetes Namespace:**
    * Update all instances of `${APPLICATION_NAMESPACE}` to your preferred namespace

## Additional Customization Points

1. **Add New Components:**
    * Create new component files in `src/components/` for additional features
    * Update the tab interface in `src/pages/Index.tsx` to include them

2. **Extend Functionality:**
    * Add real API integrations using React Query (already installed)
    * Implement interactive deployment simulations
    * Add monitoring and logging components for your application

3. **Documentation Updates:**
    * Create a comprehensive `README.md` with your project details and setup instructions
    * Add documentation for your specific implementation details

## Deploying Your Own Microservices
To use this GitOps pipeline for real deployments:

1. Set up a Kubernetes cluster (EKS, GKE, AKS, or other)
2. Install ArgoCD on your cluster following instructions in `ArgoConfig.tsx`
3. Create a Git repository with your actual Helm charts and application code
4. Customize the Helm `values.yaml` for your application's specific needs
5. Configure ArgoCD to watch your Git repository
6. Set up secrets management using one of the demonstrated approaches
7. Configure CI/CD pipeline in GitHub Actions or other CI system
8. Push changes to your repository and watch ArgoCD deploy them

**Remember:** This is a demonstration project - to make it a functional GitOps pipeline, you would need to create actual Kubernetes manifests, Helm charts, and configure a real ArgoCD instance pointing to your Git repository.


## Detailed Deployment Instructions for Kubernetes GitOps Pipeline

This guide will walk you through deploying the application using only Kubernetes, ensuring the application restarts automatically if it crashes.

### Prerequisites

1. **Kubernetes Cluster**: You'll need access to a Kubernetes cluster (local like Minikube/kind or cloud-based like GKE, EKS, AKS)
2. **kubectl**: The Kubernetes command-line tool, configured to communicate with your cluster
3. **Docker**: To build container images

### Step-by-Step Deployment Guide

#### 1. Prepare Your Environment

```bash
# Verify kubectl is properly configured
kubectl cluster-info

# Create a namespace for your application
kubectl create namespace webapp

#### 2. Build and Push Your Docker Image
# Build the Docker image
docker build -t your-registry/node-webapp:latest .

# Push to your registry
docker push your-registry/node-webapp:latest

# If using a private registry, create a secret
kubectl create secret docker-registry regcred \
  --namespace webapp \
  --docker-server=<your-registry-server> \
  --docker-username=<your-username> \
  --docker-password=<your-password>


#### 3. Create ConfigMap for Environment Variables
# Create a ConfigMap for environment variables
kubectl create configmap webapp-config \
  --namespace webapp \
  --from-literal=PORT=3000 \
  --from-literal=NODE_ENV=production


#### 4. Create a Kubernetes Deployment
# Create a file named deployment.yaml with the following content:
apiVersion: apps/v1
kind: Deployment
metadata:
  name: webapp
  namespace: webapp
  labels:
    app: webapp
spec:
  replicas: 2  # Run 2 instances for high availability
  selector:
    matchLabels:
      app: webapp
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1
      maxSurge: 1
  template:
    metadata:
      labels:
        app: webapp
    spec:
      # Add image pull secret if using private registry
      # imagePullSecrets:
      # - name: regcred
      containers:
      - name: webapp
        image: your-registry/node-webapp:latest
        imagePullPolicy: Always
        ports:
        - containerPort: 3000
        envFrom:
        - configMapRef:
            name: webapp-config
        resources:
          limits:
            cpu: "500m"
            memory: "512Mi"
          requests:
            cpu: "250m"
            memory: "256Mi"
        # Liveness probe to detect and restart unhealthy containers
        livenessProbe:
          httpGet:
            path: /
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
          timeoutSeconds: 3
          failureThreshold: 3
        # Readiness probe to determine if container can receive traffic
        readinessProbe:
          httpGet:
            path: /
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 10
          timeoutSeconds: 2
        # Always restart containers if they exit
        restartPolicy: Always

#### 5. Create a Service to Expose Your Application
# Create a file named service.yaml:

apiVersion: v1
kind: Service
metadata:
  name: webapp
  namespace: webapp
spec:
  selector:
    app: webapp
  ports:
  - port: 80
    targetPort: 3000
  type: ClusterIP


#### 6. Create an Ingress for External Access (Optional)
# Create a file named ingress.yaml:

apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: webapp-ingress
  namespace: webapp
  annotations:
    kubernetes.io/ingress.class: nginx
spec:
  rules:
  - host: webapp.example.com  # Replace with your domain
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: webapp
            port:
              number: 80


#### 7. Apply the Kubernetes Manifests

# Apply deployment
kubectl apply -f deployment.yaml

# Apply service
kubectl apply -f service.yaml

# Apply ingress (if using)
kubectl apply -f ingress.yaml

#### 8. Verify Your Deployment
# Check deployment status
kubectl get deployments -n webapp

# Check pods
kubectl get pods -n webapp

# Check service
kubectl get services -n webapp

# Watch pod status (useful for monitoring restarts)
kubectl get pods -n webapp -w

#### 9. Test Automatic Restart
# Find a pod name
kubectl get pods -n webapp

# Delete a pod to simulate a crash
kubectl delete pod <pod-name> -n webapp

# Watch Kubernetes automatically recreate the pod
kubectl get pods -n webapp -w

#### 10. Access Your Application
# Port forward to test locally
kubectl port-forward service/webapp -n webapp 8080:80

```

# Or access through Ingress if configured
# Verify using curl or browser: http://webapp.example.com


## Understanding the Restart Mechanism

The deployment includes four important elements for auto-recovery:

1. **Replicas: 2** - Ensures high availability with multiple instances
2. **restartPolicy: Always** - Ensures Kubernetes automatically restarts containers that exit
3. **Liveness Probe** - Checks if the container is alive; restarts it if probes fail
4. **Readiness Probe** - Determines when the container is ready to accept traffic

These configurations ensure that if your application crashes or becomes unresponsive, Kubernetes will automatically attempt to restore it to a working state.

## Troubleshooting Common Issues

* **Pods stuck in "Pending" state**:  
```bash
  kubectl describe pod [POD_NAME] -n webapp
```
. Set up secrets management using one of the demonstrated approaches
. Configure CI/CD pipeline in GitHub Actions or other CI system
. Push changes to your repository and watch ArgoCD deploy them

## "ImagePullBackOff" error
```bash
kubectl describe pod [POD_NAME] -n webapp
```
. Verify container registry credentials are correct
. Check image name and tag exist in registry
. Ensure network connectivity to registry
. Validate any pull secrets are properly configured

## Application not accessible
```bash
kubectl get svc,ingress -n webapp
```
. Verify Service selector matches Pod labels
. Check Ingress controller is running
. Validate ports are correctly mapped
. Examine network policies that might block traffic

## Container crashing repeatedly
```bash
kubectl logs [POD_NAME] -n webapp --previous
kubectl describe pod [POD_NAME] -n webapp
```
. Check application logs for errors
. Verify environment variables are set correctly
. Validate resource limits aren't too restrictive
. Examine liveness probe configuration

## Monitoring Setup

### Install Prometheus Operator:
```bash
helm install prometheus prometheus-community/kube-prometheus-stack -n monitoring

### Deploy Grafana for visualization:
helm install grafana grafana/grafana -n monitoring
```

These instructions provide a simple but effective way to deploy your application on Kubernetes with automatic restart capabilities if it crashes.
