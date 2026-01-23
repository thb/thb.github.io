export interface Article {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  content: string
}

import { stackTechniqueMaitrisee } from './stack-technique-maitrisee'
import { designSystemIA } from './design-system-ia'
import { mcpOutils } from './mcp-outils'
import { agentBrowserVercel } from './agent-browser-vercel'
import { specificationsIA } from './specifications-ia'
import { configurationServeurs } from './configuration-serveurs'
import { iaGithub } from './ia-github'
import { promptsMagiques } from './prompts-magiques'
import { travailParalleleAgents } from './travail-parallele-agents'
import { dashboardGithubActions } from './dashboard-github-actions'
import { powerUsersIA } from './power-users-ia'
import { cliServeurIA } from './cli-serveur-ia'
import { claudeCodeTokens } from './claude-code-tokens'
import { claudeCodeSkills } from './claude-code-skills'
import { optimisationPerfIA } from './optimisation-perf-ia'
import { metierChangeIA } from './metier-change-ia'
import { testsE2EAgentsIA } from './tests-e2e-agents-ia'
import { testsE2ERailsReact } from './tests-e2e-rails-react'

export const articles: Article[] = [
  testsE2ERailsReact,
  testsE2EAgentsIA,
  metierChangeIA,
  claudeCodeSkills,
  optimisationPerfIA,
  claudeCodeTokens,
  cliServeurIA,
  powerUsersIA,
  dashboardGithubActions,
  travailParalleleAgents,
  promptsMagiques,
  iaGithub,
  configurationServeurs,
  specificationsIA,
  agentBrowserVercel,
  mcpOutils,
  designSystemIA,
  stackTechniqueMaitrisee,
]

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug)
}
