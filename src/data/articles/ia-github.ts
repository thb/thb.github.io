import type { Article } from './index'

export const iaGithub: Article = {
  slug: 'ia-github-cicd-automatisation',
  title: "Utiliser l'IA avec GitHub : CI/CD et automatisation complète",
  description: "GitHub Actions, Container Registry, déploiements sécurisés et rollback — ce que faisaient les PaaS, l'IA l'orchestre maintenant.",
  date: '2026-01-19',
  tags: ['IA', 'GitHub', 'CI/CD', 'DevOps'],
  content: `
## Le constat

Ce qui se faisait facilement avec les PaaS (Heroku, Render, Railway) — déploiement en un clic, rollback, preview environments — est maintenant accessible avec **GitHub + Docker + l'IA** qui orchestre le tout.

L'avantage : tu gardes le contrôle total, à une fraction du coût.

## GitHub Actions : le cœur du système

L'agent génère des workflows CI/CD complets, que ce soit pour un monorepo ou des repos séparés.

### Workflow type pour une app Rails + React

\`\`\`yaml
# .github/workflows/deploy.yml
name: Build and Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test-backend:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_PASSWORD: postgres
        ports:
          - 5432:5432
    steps:
      - uses: actions/checkout@v4
      - uses: ruby/setup-ruby@v1
        with:
          bundler-cache: true
      - run: bundle exec rspec

  test-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npm run test
      - run: npm run build

  build-and-push:
    needs: [test-backend, test-frontend]
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}
      - uses: docker/build-push-action@v5
        with:
          push: true
          tags: ghcr.io/\${{ github.repository }}:latest

  deploy:
    needs: build-and-push
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to production
        uses: appleboy/ssh-action@v1
        with:
          host: \${{ secrets.SERVER_HOST }}
          username: deploy
          key: \${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /opt/myapp
            docker compose pull
            docker compose up -d
\`\`\`

**Ce que fait ce workflow :**
1. Tests backend (Rails + RSpec) en parallèle
2. Tests frontend (React + Vitest) en parallèle
3. Build de l'image Docker → push sur GitHub Container Registry
4. Déploiement SSH sur le serveur de prod

## GitHub Container Registry (GHCR)

Chaque projet a son image Docker versionnée :

\`\`\`bash
ghcr.io/thb/zenflow-back:latest
ghcr.io/thb/zenflow-back:sha-abc123
ghcr.io/thb/zenflow-front:latest
\`\`\`

**Avantages :**
- Gratuit pour les repos publics, 500MB gratuits pour privés
- Intégré nativement avec GitHub Actions
- Permissions gérées par les tokens GitHub

## Système de rollback

L'agent a configuré un système de rollback simple mais efficace :

\`\`\`bash
# deploy.sh sur le serveur
#!/bin/bash

IMAGE="ghcr.io/thb/myapp"
CURRENT_TAG=$(docker inspect --format='{{.Config.Image}}' myapp | cut -d: -f2)

# Sauvegarde du tag actuel
echo $CURRENT_TAG > /opt/myapp/.previous_tag

# Pull et redémarrage
docker compose pull
docker compose up -d

# Health check
sleep 10
if ! curl -f http://localhost:3000/health; then
  echo "Deploy failed, rolling back..."
  docker compose down
  docker tag $IMAGE:$CURRENT_TAG $IMAGE:latest
  docker compose up -d
fi
\`\`\`

\`\`\`bash
# rollback.sh
#!/bin/bash
PREVIOUS_TAG=$(cat /opt/myapp/.previous_tag)
docker pull ghcr.io/thb/myapp:$PREVIOUS_TAG
docker tag ghcr.io/thb/myapp:$PREVIOUS_TAG ghcr.io/thb/myapp:latest
docker compose up -d
\`\`\`

## Monorepo vs repos séparés

L'agent s'adapte aux deux architectures :

### Monorepo

\`\`\`yaml
# Déclenche uniquement si les fichiers concernés changent
on:
  push:
    paths:
      - 'apps/backend/**'
      - 'packages/shared/**'
\`\`\`

### Repos séparés

\`\`\`yaml
# Workflow dispatch pour trigger cross-repo
on:
  repository_dispatch:
    types: [backend-deployed]
\`\`\`

## Secrets et sécurité

L'agent configure les secrets GitHub de manière sécurisée :

\`\`\`bash
# Via GitHub CLI
gh secret set SERVER_HOST --body "123.456.789.0"
gh secret set SSH_PRIVATE_KEY < ~/.ssh/deploy_key
gh secret set DATABASE_URL --body "postgres://..."
\`\`\`

**Bonnes pratiques appliquées :**
- Clés SSH dédiées au déploiement (pas ma clé perso)
- Secrets différents par environnement (staging/prod)
- Tokens avec scopes minimaux

## Preview environments (bonus)

Pour les PRs, l'agent peut configurer des environnements de preview :

\`\`\`yaml
deploy-preview:
  if: github.event_name == 'pull_request'
  runs-on: ubuntu-latest
  steps:
    - name: Deploy preview
      run: |
        PREVIEW_URL="pr-\${{ github.event.number }}.preview.myapp.com"
        # ... déploiement sur sous-domaine dédié
    - name: Comment PR
      uses: actions/github-script@v7
      with:
        script: |
          github.rest.issues.createComment({
            owner: context.repo.owner,
            repo: context.repo.repo,
            issue_number: context.issue.number,
            body: '🚀 Preview: https://pr-\${{ github.event.number }}.preview.myapp.com'
          })
\`\`\`

## Ce que l'IA orchestre

| Tâche | Avant (manuel) | Maintenant (IA) |
|-------|----------------|-----------------|
| Écrire le workflow | 2h de YAML | "Configure CI/CD pour Rails + React" |
| Débugger un workflow cassé | Stack Overflow | "Le job test échoue, corrige" |
| Ajouter un nouveau service | Copier/adapter | "Ajoute le build du service X" |
| Configurer les secrets | Doc GitHub | "Configure les secrets pour prod" |

## Workflow de développement complet

1. **Feature branch** : Je code avec l'agent
2. **Push** : Tests automatiques lancés
3. **PR** : Preview environment déployé
4. **Review** : Code review (humain) + tests verts
5. **Merge** : Build → Push GHCR → Deploy prod
6. **Problème ?** : Rollback en 1 commande

## Conclusion

GitHub est devenu une plateforme de déploiement complète :
- **Actions** : CI/CD flexible et puissant
- **GHCR** : Registry d'images intégré
- **Secrets** : Gestion sécurisée des credentials
- **Environments** : Preview et protection de branches

L'IA transforme cette puissance en quelque chose d'accessible. Tu décris ce que tu veux, elle génère le YAML, tu valides et push.

**Le PaaS, c'était payer pour ne pas avoir à comprendre. Avec l'IA, tu comprends ET tu ne paies pas.**
  `.trim()
}
