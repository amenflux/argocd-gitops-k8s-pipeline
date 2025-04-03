
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ShieldAlert, Info } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CodeBlock from './CodeBlock';

const SecretsManagement = () => {
  const kubernetesSecretYaml = `# NEVER COMMIT THIS FILE TO GIT - FOR REFERENCE ONLY
# kubernetes-secret.yaml
apiVersion: v1
kind: Secret
metadata:
  name: \${APP_NAME}-credentials
  namespace: \${NAMESPACE}
  labels:
    app: \${APP_NAME}
    environment: \${ENVIRONMENT}
type: Opaque
data:
  # These values should be generated, base64 encoded, and managed securely
  # Example: echo -n "your-secure-password" | base64
  DB_PASSWORD: BASE64_ENCODED_PASSWORD
  DB_USERNAME: BASE64_ENCODED_USERNAME
  API_KEY: BASE64_ENCODED_API_KEY

# To create this secret securely:
# kubectl create secret generic \${APP_NAME}-credentials \\
#   --from-literal=DB_PASSWORD='secure-password' \\
#   --from-literal=DB_USERNAME='app-user' \\
#   --from-literal=API_KEY='your-api-key'`;

  const helmSecretYaml = `# Recommended approach: Use external secret references in Helm
# In values.yaml
secretManagement:
  secretProviderClass: \${SECRET_PROVIDER_CLASS}
  externalSecrets: true

# In deployment.yaml template
spec:
  template:
    spec:
      containers:
      - name: {{ .Values.name }}
        # Other container configuration here...
        {{- if .Values.secretManagement.externalSecrets }}
        envFrom:
        - secretRef:
            name: {{ .Release.Name }}-secrets
        {{- else }}
        env:
        - name: DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: {{ .Release.Name }}-credentials
              key: DB_PASSWORD
        # Similar for other environment variables...
        {{- end }}

# DO NOT place actual secrets in values.yaml
# Instead, create secrets out-of-band using:
# 1. CI/CD pipeline secrets
# 2. External secrets manager
# 3. Kubernetes Secrets created manually or with a secure method`;

  const sealedSecretYaml = `# sealed-secret.yaml
# This is safe to commit to Git
apiVersion: bitnami.com/v1alpha1
kind: SealedSecret
metadata:
  name: \${APP_NAME}-credentials
  namespace: \${NAMESPACE}
spec:
  encryptedData:
    # These values are encrypted and can only be decrypted by the controller
    DB_PASSWORD: AgBy8hCF8uZXwLxP6NHuFMVr3bxqCyDEYP...
    DB_USERNAME: AgCZZurAr0Piw5B9Lyutb98IKV1iMpRXQz...
    API_KEY: AgAT+4tQJ3MtL0vH2g+WuAxvNnJ6j9rI9j...

# To create a sealed secret:
# 1. Install the Sealed Secrets controller:
#    kubectl apply -f https://github.com/bitnami-labs/sealed-secrets/releases/download/v0.19.4/controller.yaml
#
# 2. Install the kubeseal CLI:
#    For macOS: brew install kubeseal
#    For others: https://github.com/bitnami-labs/sealed-secrets#installation
#
# 3. Create a regular Kubernetes secret YAML:
#    kubectl create secret generic \${APP_NAME}-credentials \\
#      --from-literal=DB_PASSWORD='secure-password' \\
#      --from-literal=DB_USERNAME='app-user' \\
#      --from-literal=API_KEY='your-api-key' \\
#      --dry-run=client -o yaml > secret.yaml
#
# 4. Seal the secret:
#    kubeseal --format yaml < secret.yaml > sealed-secret.yaml
#
# 5. Now you can safely commit sealed-secret.yaml to your Git repository`;

  const externalSecretYaml = `# Using External Secrets Operator with cloud provider secrets
# external-secret.yaml
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: \${APP_NAME}-credentials
  namespace: \${NAMESPACE}
spec:
  refreshInterval: 1h
  secretStoreRef:
    name: \${SECRET_STORE_NAME}
    kind: ClusterSecretStore
  target:
    name: \${APP_NAME}-credentials
    creationPolicy: Owner
  data:
    - secretKey: DB_PASSWORD
      remoteRef:
        key: \${SECRET_PATH}/db-credentials
        property: password
    - secretKey: DB_USERNAME
      remoteRef:
        key: \${SECRET_PATH}/db-credentials
        property: username
    - secretKey: API_KEY
      remoteRef:
        key: \${SECRET_PATH}/api-credentials
        property: api-key

# Setup Secret Store for AWS Secrets Manager:
# ---
# apiVersion: external-secrets.io/v1beta1
# kind: ClusterSecretStore
# metadata:
#   name: aws-secretsmanager
# spec:
#   provider:
#     aws:
#       service: SecretsManager
#       region: us-east-1
#       auth:
#         jwt:
#           serviceAccountRef:
#             name: external-secrets-sa
#             namespace: external-secrets

# Setup Secret Store for Azure Key Vault:
# ---
# apiVersion: external-secrets.io/v1beta1
# kind: ClusterSecretStore
# metadata:
#   name: azure-keyvault
# spec:
#   provider:
#     azurekv:
#       tenantId: \${AZURE_TENANT_ID}
#       vaultUrl: https://\${KEYVAULT_NAME}.vault.azure.net
#       authSecretRef:
#         clientId:
#           name: azure-secret-sp
#           key: client-id
#         clientSecret:
#           name: azure-secret-sp
#           key: client-secret`;

  return (
    <div className="w-full">
      <Card className="border-2 border-destructive shadow-lg">
        <CardHeader className="bg-destructive bg-opacity-10">
          <CardTitle className="text-destructive flex items-center gap-2 text-xl">
            <ShieldAlert className="h-5 w-5" />
            Secrets Management
          </CardTitle>
          <CardDescription className="text-white font-bold text-xl mt-2">
            Secure handling of sensitive information
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Alert className="mb-6 border-amber-500 bg-amber-500 bg-opacity-10">
            <Info className="h-4 w-4 text-amber-500" />
            <AlertTitle className="text-amber-500">DevOps Best Practices</AlertTitle>
            <AlertDescription>
              Never commit secrets directly to your repository. Use dedicated secrets management solutions and ensure environment-specific secrets are properly isolated. External Secrets Operator with a cloud provider's secret management service is the recommended approach.
            </AlertDescription>
          </Alert>
          
          <Tabs defaultValue="external">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="kubernetes">Basic K8s Secrets</TabsTrigger>
              <TabsTrigger value="helm">Helm Integration</TabsTrigger>
              <TabsTrigger value="sealed">Sealed Secrets</TabsTrigger>
              <TabsTrigger value="external">External Secrets</TabsTrigger>
            </TabsList>
            <TabsContent value="kubernetes">
              <CodeBlock 
                title="Basic Kubernetes Secret (Not Recommended for GitOps)" 
                code={kubernetesSecretYaml} 
                language="yaml"
              />
            </TabsContent>
            <TabsContent value="helm">
              <CodeBlock 
                title="Managing Secrets with Helm" 
                code={helmSecretYaml}
                language="yaml" 
              />
            </TabsContent>
            <TabsContent value="sealed">
              <CodeBlock 
                title="Using Sealed Secrets (Good for GitOps)" 
                code={sealedSecretYaml}
                language="yaml" 
              />
            </TabsContent>
            <TabsContent value="external">
              <CodeBlock 
                title="External Secrets Operator (Best Practice)" 
                code={externalSecretYaml}
                language="yaml" 
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecretsManagement;
