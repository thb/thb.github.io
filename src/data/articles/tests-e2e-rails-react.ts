import type { Article } from './index'

export const testsE2ERailsReact: Article = {
  slug: 'tests-e2e-rails-react-cypress',
  title: "Tests E2E avec Rails API + React : retrouver la magie de Capybara",
  description: "Comment j'ai reproduit l'expérience des system tests Rails avec une architecture backend/frontend séparée. Cypress, endpoints de test, et CI parallèle.",
  date: '2026-01-23',
  tags: ['Tests', 'E2E', 'Rails', 'React', 'Cypress', 'CI/CD'],
  content: `
## Le contexte

J'ai des apps Rails full-stack qui tournent depuis 10 ans. Elles sont **indestructibles**. La raison ? Les system tests avec Capybara.

\`\`\`ruby
# spec/system/order_spec.rb
RSpec.describe "Orders", type: :system do
  it "allows user to place an order" do
    user = create(:user)
    login_as(user)

    visit new_order_path
    fill_in "Quantity", with: 10
    click_button "Submit"

    expect(page).to have_content("Order confirmed")
  end
end
\`\`\`

\`rails spec\` fait tout : setup la DB de test, lance le navigateur, reset entre chaque test. Magique.

Mais maintenant, mes apps sont en **Rails API + React**. Comment retrouver cette fiabilité ?

## Le problème

En full-stack Rails, tout est dans le même process :

\`\`\`
[RSpec] → [Rails App] → [Capybara/Selenium] → [Browser]
     ↑_______Database Cleaner________↑
\`\`\`

Avec une archi séparée :

\`\`\`
[Cypress] → [React :3000] → [Rails API :3001] → [PostgreSQL]
     ???
\`\`\`

Qui contrôle la DB ? Comment reset entre les tests ? Comment seeder les scénarios ?

## La solution

### Architecture

\`\`\`
npm run e2e
    │
    ├── 1. Lance Rails API en mode e2e (port 3001)
    ├── 2. Lance React pointant vers cette API (port 3000)
    ├── 3. Lance Cypress
    │       └── beforeEach: POST /e2e/reset
    └── 4. Cleanup à la fin
\`\`\`

### Côté Rails : environnement e2e + endpoints de test

**1. Nouvel environnement \`e2e\`**

\`\`\`ruby
# config/environments/e2e.rb
Rails.application.configure do
  config.cache_classes = true
  config.eager_load = true  # Comme prod
  config.consider_all_requests_local = true
  config.action_controller.perform_caching = false

  # Logs lisibles
  config.log_level = :info
end
\`\`\`

Pourquoi pas \`test\` ? Parce que \`test\` est optimisé pour RSpec (transactions, rack-test). \`e2e\` tourne comme un vrai serveur.

**2. Routes de test (seulement en e2e)**

\`\`\`ruby
# config/routes.rb
if Rails.env.e2e?
  scope :e2e do
    post 'reset', to: 'e2e#reset'
    post 'seed/:scenario', to: 'e2e#seed'
    post 'login', to: 'e2e#login'
  end
end
\`\`\`

**3. Controller de test**

\`\`\`ruby
# app/controllers/e2e_controller.rb
class E2eController < ApplicationController
  skip_before_action :authenticate_user
  before_action :ensure_e2e_environment

  def reset
    # Clean et seed de base
    DatabaseCleaner.clean_with(:truncation)
    E2eSeeder.seed(:base)
    render json: { status: 'ok' }
  end

  def seed
    scenario = params[:scenario].to_sym
    data = E2eSeeder.seed(scenario)
    render json: { status: 'ok', data: data }
  end

  def login
    user = User.find_by!(email: params[:email])
    token = JwtService.encode(user_id: user.id)
    render json: { token: token, user: user }
  end

  private

  def ensure_e2e_environment
    unless Rails.env.e2e?
      render json: { error: 'Not in e2e environment' }, status: :forbidden
    end
  end
end
\`\`\`

**4. Seeder avec scénarios**

\`\`\`ruby
# app/services/e2e_seeder.rb
class E2eSeeder
  SCENARIOS = %w[base with_unclaimed_org with_pending_claim].freeze

  def self.seed(scenario)
    case scenario.to_sym
    when :base
      seed_base_users
    when :with_unclaimed_org
      seed_base_users
      seed_unclaimed_organization
    when :with_pending_claim
      seed_base_users
      seed_pending_claim
    end
  end

  def self.seed_base_users
    {
      admin: User.create!(email: 'admin@test.com', password: 'password123', role: :admin),
      user: User.create!(email: 'user@test.com', password: 'password123')
    }
  end

  # ...
end
\`\`\`

### Côté Cypress : commandes custom

\`\`\`typescript
// cypress/support/commands.ts

// Reset DB avant chaque test
Cypress.Commands.add('resetDb', (scenario?: string) => {
  const apiUrl = Cypress.env('apiUrl');

  cy.request('POST', \`\${apiUrl}/e2e/reset\`);

  if (scenario) {
    cy.request('POST', \`\${apiUrl}/e2e/seed/\${scenario}\`);
  }
});

// Login via API (plus rapide que via UI)
Cypress.Commands.add('loginApi', (email: string) => {
  const apiUrl = Cypress.env('apiUrl');

  cy.request({
    method: 'POST',
    url: \`\${apiUrl}/e2e/login\`,
    body: { email, password: 'password123' }
  }).then((response) => {
    cy.setCookie('access_token', response.body.token);
  });
});
\`\`\`

### Un test E2E

\`\`\`typescript
// cypress/e2e/claim-organization.cy.ts
describe('Claim Organization', () => {
  beforeEach(() => {
    cy.resetDb('with_unclaimed_org');
  });

  it('allows user to submit a claim', () => {
    cy.loginApi('user@test.com');
    cy.visit('/organizations/test-org');

    cy.contains('Claim this Organization').click();
    cy.get('textarea').type('I am the owner...');
    cy.contains('Submit').click();

    cy.contains('Your claim has been submitted');
  });
});
\`\`\`

C'est presque aussi propre que Capybara !

### Script d'orchestration local

\`\`\`bash
#!/bin/bash
# scripts/e2e-setup.sh

trap 'kill $(jobs -p) 2>/dev/null' EXIT

# 1. Start Rails in e2e mode
cd platform-back
RAILS_ENV=e2e bundle exec rails server -p 3001 &
npx wait-on http://localhost:3001/up

# 2. Start React
cd ../platform-front
NEXT_PUBLIC_API_URL=http://localhost:3001 npm run dev &
npx wait-on http://localhost:3000

echo "Ready for e2e tests"
\`\`\`

\`\`\`json
// package.json
{
  "scripts": {
    "e2e": "./scripts/e2e-setup.sh && cypress run",
    "e2e:open": "./scripts/e2e-setup.sh && cypress open"
  }
}
\`\`\`

### CI : parallèle et non-bloquant

\`\`\`yaml
# .github/workflows/ci.yml
jobs:
  # Job existant - rapide (~4min)
  test-and-deploy:
    # ... tests unitaires + deploy

  # Job e2e - en parallèle
  e2e:
    runs-on: ubuntu-latest
    continue-on-error: true  # Ne bloque pas le deploy

    services:
      postgres:
        image: postgis/postgis:15-3.3
        # ...

    steps:
      - name: Setup database
        run: bundle exec rails db:create db:schema:load

      - name: Start Rails API
        run: bundle exec rails server -p 3001 &

      - name: Start frontend
        run: npm run build && npm run start &

      - name: Run Cypress
        uses: cypress-io/github-action@v6

      - name: Upload artifacts on failure
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: cypress-screenshots
          path: cypress/screenshots
\`\`\`

**Résultat** : le deploy reste à ~4min, les tests e2e tournent en parallèle (~6-8min), et ne bloquent pas si ils échouent.

## Comparaison : avant/après

| Aspect | Rails System Tests | Cette solution |
|--------|-------------------|----------------|
| Setup DB | Automatique (RSpec) | \`POST /e2e/reset\` |
| Isolation | Transactions | Truncation + reseed |
| Login | \`login_as(user)\` | \`cy.loginApi(email)\` |
| Scénarios | FactoryBot | E2eSeeder |
| CI | \`rails spec\` | Job parallèle |

## Avantages

1. **Même fiabilité** que les system tests Rails
2. **Scénarios réutilisables** via le seeder
3. **Fast login** via API (pas besoin de passer par l'UI)
4. **CI non-bloquante** : on est notifié si ça casse, mais le deploy continue
5. **Debug facile** : screenshots et vidéos en artifacts

## Inconvénients

1. **Plus de setup** qu'en full-stack Rails
2. **Deux repos** à synchroniser (ou monorepo)
3. **Environnement supplémentaire** (\`e2e\`) à maintenir
4. **Plus lent** que les request specs RSpec pour l'API pure

## Résultats

Après mise en place sur Fabrix (Next.js + Rails) :

| Métrique | Valeur |
|----------|--------|
| Tests e2e écrits | 2 specs (auth, claim) |
| Temps CI total | ~4min (inchangé, e2e en parallèle) |
| Temps e2e seul | ~6-8min |
| Scénarios de seed | 4 (base, unclaimed_org, pending_claim, communities) |

Les parcours critiques sont maintenant couverts. Si quelqu'un casse le login ou le claim, on le sait immédiatement.

## Conclusion

On peut retrouver la magie de Capybara avec une archi séparée. Ça demande plus de plomberie, mais le résultat est là :

- **\`beforeEach(() => cy.resetDb())\`** = l'équivalent du \`DatabaseCleaner\` de RSpec
- **\`cy.loginApi()\`** = l'équivalent du \`login_as()\` de Devise
- **E2eSeeder** = l'équivalent de FactoryBot pour les scénarios

Mes apps Rails full-stack sont indestructibles depuis 10 ans grâce aux system tests. Cette stack me permet d'avoir la même confiance sur mes apps séparées.
  `.trim()
}
