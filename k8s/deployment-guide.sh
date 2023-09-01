# Copy kubectl config from k8s master to target path
scp -r root@84.46.250.91:/root/.kube .

# Copy Kubernetes Credentials To Your Home
cp -r .kube $HOME/