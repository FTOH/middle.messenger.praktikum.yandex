import * as fs from 'fs'
import { SitemapPage } from './sitemap'

const REGEX_PATTERN = /case '(?<url>[^']+)'[^/]+\/\/\s*(?<name>.*)/g

type Link = {
  name: string,
  url: string,
}

// parcel заинлайнит это
const fileContent = fs.readFileSync('src/index.ts', 'utf8')

const links: Link[] = [{
  name: 'Ошибка 404',
  url: '/notexist',
}]

for (const matched of fileContent.matchAll(REGEX_PATTERN)) {
  links.push(matched.groups as Link)
}

links.sort((a, b) => {
  if (a.name < b.name) return -1
  if (a.name > b.name) return 1
  return 0
})

export const sitemapPage = new SitemapPage({ links })
