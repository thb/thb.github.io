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

export const articles: Article[] = [
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
