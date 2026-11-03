# Генератор сайта

### Без домена: HTTP на порту 80

```bash
docker run -d --name random-site --pull=always \
  -p 80:80 \
  -e LLM_BASE_URL=https://openrouter.ai/api/v1 \
  -e LLM_API_KEY='sk-or-v1-ТВОЙ-КЛЮЧ' \
  -e LLM_MODEL='ID-модели-из-OpenRouter' \
  ghcr.io/your-owner/your-repo:v1.0.0 \
  'Минималистичный сайт кофейни'
```


### С доменом: HTTPS и редирект с HTTP

```bash
docker run -d --name random-site --pull=always \
  -p 80:80 \
  -p 443:443 \
  -e SITE_DOMAIN=example.com \
  -e LLM_BASE_URL=https://openrouter.ai/api/v1 \
  -e LLM_API_KEY='sk-or-v1-ТВОЙ-КЛЮЧ' \
  -e LLM_MODEL='ID-модели-из-OpenRouter' \
  -v random-site-caddy-data:/data \
  ghcr.io/your-owner/your-repo:v1.0.0 \
  'Минималистичный сайт кофейни'
```