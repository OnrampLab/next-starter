## Kubernetes

## Requiremnet
Installations:

* kubectl
* kustomize

## Before using k8s command

Apply k8s environment

```
export KUBECONFIG=~/.kube/eks-cluster
```

Switch k8s cluster

Because we will use same cluster as backend, we will need to switch to that cluster.

```
aws eks --region us-east-1 update-kubeconfig --name next-backend-${ENVIRONMENT}-eks-cluster
```

## CI
### build image

ex. build an image for tag `v1.0.0`

```
docker build --target php-prod -t next-starter:v1.0.0 .
```

### upload image to AWS ECR
```
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin aws_account_id.dkr.ecr.us-east-1.amazonaws.com/next-starter

docker tag next-starter:${CIRCLE_TAG} aws_account_id.dkr.ecr.us-east-1.amazonaws.com/next-starter:${CIRCLE_TAG}

docker push aws_account_id.dkr.ecr.us-east-1.amazonaws.com/next-starter:${CIRCLE_TAG}
```

## Deploy

```
cd tools/infrastructure/container-based/ochestration/kubernetes/${ENVIRONMENT}/bases
kustomize edit set image "next-starter=aws_account_id.dkr.ecr.us-east-1.amazonaws.com/next-starter:${CIRCLE_TAG}"
kustomize build | kubectl apply -f -
```

## FAQ
### How do I provide access to other users and roles after cluster creation in Amazon EKS?
https://aws.amazon.com/premiumsupport/knowledge-center/amazon-eks-cluster-access/

## Folder structure
Refer to https://kubectl.docs.kubernetes.io/pages/app_composition_and_deployment/structure_directories.html
