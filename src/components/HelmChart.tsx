
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CodeBlock from './CodeBlock';

const HelmChart = () => {
  const valuesYaml = `# values.yaml
# Application configuration
app:
  name: \${APP_NAME}
  replicaCount: 2
  image:
    repository: \${CONTAINER_REGISTRY}/\${IMAGE_REPOSITORY}
    tag: \${IMAGE_TAG}
    pullPolicy: Always
  resources:
    limits:
      cpu: 500m
      memory: 512Mi
    requests:
      cpu: 250m
      memory: 256Mi
  livenessProbe:
    httpGet:
      path: /health
      port: http
    initialDelaySeconds: 30
    periodSeconds: 10
    timeoutSeconds: 5
    failureThreshold: 3
  readinessProbe:
    httpGet:
      path: /health
      port: http
    initialDelaySeconds: 5
    periodSeconds: 10
    timeoutSeconds: 2
  autoscaling:
    enabled: true
    minReplicas: 2
    maxReplicas: 10
    targetCPUUtilizationPercentage: 70
  service:
    type: ClusterIP
    port: 80
    targetPort: \${CONTAINER_PORT}

# Database configuration
database:
  enabled: true
  type: \${DATABASE_TYPE} # mongodb, postgres, mysql
  # For MongoDB
  mongodb:
    architecture: replicaset
    replicaCount: 3
    auth:
      enabled: true
      existingSecret: \${APP_NAME}-db-credentials
      database: \${APP_NAME}
    persistence:
      enabled: true
      storageClass: "\${STORAGE_CLASS}"
      size: 10Gi
  # For PostgreSQL
  postgres:
    enabled: false
    # ... PostgreSQL specific configuration

# Ingress configuration
ingress:
  enabled: true
  className: \${INGRESS_CLASS}
  annotations:
    kubernetes.io/ingress.class: \${INGRESS_CLASS}
    cert-manager.io/cluster-issuer: \${CERT_ISSUER}
  hosts:
    - host: \${APP_HOSTNAME}
      paths:
        - path: /
          pathType: Prefix
  tls:
    - secretName: \${APP_NAME}-tls
      hosts:
        - \${APP_HOSTNAME}

# Service Mesh integration
istio:
  enabled: \${ISTIO_ENABLED}
  gateway:
    enabled: \${ISTIO_GATEWAY_ENABLED}
    host: \${APP_HOSTNAME}
  virtualService:
    enabled: \${ISTIO_VS_ENABLED}
    gateways:
      - \${ISTIO_GATEWAY}

# Observability
monitoring:
  enabled: true
  serviceMonitor:
    enabled: true
    scrapeInterval: 30s
    path: /metrics

# Environment-specific configuration
environment: \${ENVIRONMENT} # dev, staging, production

# Global tags
global:
  labels:
    environment: \${ENVIRONMENT}
    app: \${APP_NAME}
    team: \${TEAM_NAME}`;

  const chartYaml = `# Chart.yaml
apiVersion: v2
name: \${APP_NAME}
description: A Helm chart for \${APP_DESCRIPTION}
type: application
version: 0.1.0
appVersion: "\${APP_VERSION}"
dependencies:
  - name: mongodb
    version: ~13.x.x
    repository: https://charts.bitnami.com/bitnami
    condition: database.mongodb.enabled
  - name: postgresql
    version: ~12.x.x
    repository: https://charts.bitnami.com/bitnami
    condition: database.postgres.enabled
  - name: redis
    version: ~17.x.x
    repository: https://charts.bitnami.com/bitnami
    condition: cache.enabled
maintainers:
  - name: \${MAINTAINER_NAME}
    email: \${MAINTAINER_EMAIL}
annotations:
  artifacthub.io/prerelease: "true" # Set to false for stable releases
  artifacthub.io/license: MIT
  artifacthub.io/links: |
    - name: Source Code
      url: \${SOURCE_CODE_URL}`;

  const deploymentYaml = `# templates/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ include "app.fullname" . }}
  labels:
    {{- include "app.labels" . | nindent 4 }}
  annotations:
    {{- with .Values.deploymentAnnotations }}
    {{- toYaml . | nindent 4 }}
    {{- end }}
spec:
  {{- if not .Values.app.autoscaling.enabled }}
  replicas: {{ .Values.app.replicaCount }}
  {{- end }}
  selector:
    matchLabels:
      {{- include "app.selectorLabels" . | nindent 6 }}
  # Strategy for high availability - minimize downtime during updates
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 25%
      maxSurge: 25%
  template:
    metadata:
      labels:
        {{- include "app.selectorLabels" . | nindent 8 }}
        {{- with .Values.podLabels }}
        {{- toYaml . | nindent 8 }}
        {{- end }}
      annotations:
        {{- with .Values.podAnnotations }}
        {{- toYaml . | nindent 8 }}
        {{- end }}
    spec:
      # Always restart pods automatically if they crash
      restartPolicy: Always
      serviceAccountName: {{ include "app.serviceAccountName" . }}
      securityContext:
        {{- toYaml .Values.podSecurityContext | nindent 8 }}
      {{- with .Values.imagePullSecrets }}
      imagePullSecrets:
        {{- toYaml . | nindent 8 }}
      {{- end }}
      containers:
        - name: {{ .Chart.Name }}
          securityContext:
            {{- toYaml .Values.securityContext | nindent 12 }}
          image: "{{ .Values.app.image.repository }}:{{ .Values.app.image.tag | default .Chart.AppVersion }}"
          imagePullPolicy: {{ .Values.app.image.pullPolicy }}
          # Automatically restart if healthchecks fail
          ports:
            - name: http
              containerPort: {{ .Values.app.service.targetPort }}
              protocol: TCP
          # Comprehensive health checks for auto-recovery
          livenessProbe:
            {{- toYaml .Values.app.livenessProbe | nindent 12 }}
          readinessProbe:
            {{- toYaml .Values.app.readinessProbe | nindent 12 }}
          # Resource limits and requests
          resources:
            {{- toYaml .Values.app.resources | nindent 12 }}
          # Environment variables from multiple sources
          envFrom:
            - configMapRef:
                name: {{ include "app.fullname" . }}-config
            {{- if .Values.externalSecrets.enabled }}
            - secretRef:
                name: {{ include "app.fullname" . }}-external-secrets
            {{- else }}
            - secretRef:
                name: {{ include "app.fullname" . }}-secrets
            {{- end }}
          # Startup probe for slow-starting applications
          {{- if .Values.app.startupProbe }}
          startupProbe:
            {{- toYaml .Values.app.startupProbe | nindent 12 }}
          {{- end }}
      # Node selector for specific hardware/zone placement
      {{- with .Values.nodeSelector }}
      nodeSelector:
        {{- toYaml . | nindent 8 }}
      {{- end }}
      # Affinity for pod distribution
      {{- with .Values.affinity }}
      affinity:
        {{- toYaml . | nindent 8 }}
      {{- end }}
      # Tolerations for special nodes
      {{- with .Values.tolerations }}
      tolerations:
        {{- toYaml . | nindent 8 }}
      {{- end }}`;

  const serviceYaml = `# templates/service.yaml
apiVersion: v1
kind: Service
metadata:
  name: {{ include "app.fullname" . }}
  labels:
    {{- include "app.labels" . | nindent 4 }}
  {{- with .Values.serviceAnnotations }}
  annotations:
    {{- toYaml . | nindent 4 }}
  {{- end }}
spec:
  type: {{ .Values.app.service.type }}
  ports:
    - port: {{ .Values.app.service.port }}
      targetPort: {{ .Values.app.service.targetPort }}
      protocol: TCP
      name: http
      {{- if (and (eq .Values.app.service.type "NodePort") .Values.app.service.nodePort) }}
      nodePort: {{ .Values.app.service.nodePort }}
      {{- end }}
  selector:
    {{- include "app.selectorLabels" . | nindent 4 }}`;

  const hpaYaml = `# templates/hpa.yaml
{{- if .Values.app.autoscaling.enabled }}
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: {{ include "app.fullname" . }}
  labels:
    {{- include "app.labels" . | nindent 4 }}
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: {{ include "app.fullname" . }}
  minReplicas: {{ .Values.app.autoscaling.minReplicas }}
  maxReplicas: {{ .Values.app.autoscaling.maxReplicas }}
  metrics:
    {{- if .Values.app.autoscaling.targetCPUUtilizationPercentage }}
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: {{ .Values.app.autoscaling.targetCPUUtilizationPercentage }}
    {{- end }}
    {{- if .Values.app.autoscaling.targetMemoryUtilizationPercentage }}
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: {{ .Values.app.autoscaling.targetMemoryUtilizationPercentage }}
    {{- end }}
{{- end }}`;

  return (
    <div className="w-full">
      <Card className="border-2 border-helm shadow-lg">
        <CardHeader className="bg-helm bg-opacity-10">
          <CardTitle className="text-helm">Helm Chart Configuration</CardTitle>
          <CardDescription>Kubernetes manifests as Helm templates</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="values">
            <TabsList className="grid grid-cols-5 mb-4">
              <TabsTrigger value="values">values.yaml</TabsTrigger>
              <TabsTrigger value="chart">Chart.yaml</TabsTrigger>
              <TabsTrigger value="deployment">deployment.yaml</TabsTrigger>
              <TabsTrigger value="service">service.yaml</TabsTrigger>
              <TabsTrigger value="hpa">hpa.yaml</TabsTrigger>
            </TabsList>
            <TabsContent value="values">
              <CodeBlock 
                title="values.yaml" 
                code={valuesYaml} 
                language="yaml"
              />
            </TabsContent>
            <TabsContent value="chart">
              <CodeBlock 
                title="Chart.yaml" 
                code={chartYaml}
                language="yaml" 
              />
            </TabsContent>
            <TabsContent value="deployment">
              <CodeBlock 
                title="templates/deployment.yaml" 
                code={deploymentYaml}
                language="yaml" 
              />
            </TabsContent>
            <TabsContent value="service">
              <CodeBlock 
                title="templates/service.yaml" 
                code={serviceYaml}
                language="yaml" 
              />
            </TabsContent>
            <TabsContent value="hpa">
              <CodeBlock 
                title="templates/hpa.yaml" 
                code={hpaYaml}
                language="yaml" 
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default HelmChart;
