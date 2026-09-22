# Umami Analytics — heim k3s deployment notes

Self-hosted, consent-friendly analytics for webdevofreality.dev.
**Not applied yet.** Deploy order:

```bash
# 1. Secrets (generate strong values)
kubectl -n analytics create secret generic umami-secrets \
  --from-literal=postgres-password="$(openssl rand -hex 16)" \
  --from-literal=app-secret="$(openssl rand -hex 32)"

# 2. Apply manifests
kubectl apply -f 00-namespace.yaml
kubectl apply -f 10-postgres.yaml
kubectl apply -f 20-umami.yaml
kubectl apply -f 30-ingress.yaml

# 3. Verify
kubectl -n analytics get pods
```

First login: https://umami.heim — admin / umami (change immediately).

## Public reachability caveat

The blog lives on Netlify (public internet); umami.heim is LAN-only by
default. Blog visitors can only send pageviews if a public hostname reaches
heim (port-forward or tunnel). Options:

1. **Tunnel/port-forward** `analytics.webdevofreality.dev` → heim ingress,
   add the host rule to 30-ingress.yaml, then set the tracker script URL in
   the blog root layout.
2. **Defer analytics** until public reachability exists — the blog works
   without it. (Current state: no analytics script is embedded.)

Wire-up once reachable (src/routes/__root.tsx):

```html
<script async src="https://analytics.webdevofreality.dev/script.js"
  data-website-id="<id from umami dashboard>" />
```