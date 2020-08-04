## Development flow

* Code review -> Merge Pull Request
* git tag
* build docker image with tag
* push image to AWS docker hub
* deploy docker image to AWS EKS(k8s)

## Todo

* Can reuse docker image for different environments (dev, staging, production)
* improve k8s configurations
* install k8s Dashboard
