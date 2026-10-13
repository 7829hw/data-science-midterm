import { defineConfig } from 'vitepress'
import { nav, sidebar } from './chapters'

/**
 * 사이트 base 경로.
 * 1. VITEPRESS_BASE 환경변수가 있으면 그대로 사용 (GitHub Actions는 configure-pages 결과를 넘겨준다)
 * 2. 없으면 GitHub Actions 환경에서 저장소 이름으로 추론
 * 3. 그 외(Docker)는 '/'
 */
function resolveBase(): string {
  const explicit = process.env.VITEPRESS_BASE
  if (explicit !== undefined) {
    const trimmed = explicit.replace(/^\/+|\/+$/g, '')
    return trimmed ? `/${trimmed}/` : '/'
  }
  const repo = process.env.GITHUB_REPOSITORY?.split('/')[1]
  if (process.env.GITHUB_ACTIONS === 'true' && repo && !repo.endsWith('.github.io')) {
    return `/${repo}/`
  }
  return '/'
}

export default defineConfig({
  lang: 'ko-KR',
  title: '데이터과학기초 · 중간고사',
  description: '데이터과학기초 중간고사 범위 학습 노트 — 10장부터 14장까지',
  base: resolveBase(),
  cleanUrls: true,
  lastUpdated: false,
  head: [
    ['meta', { name: 'theme-color', content: '#3157d5' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'ko_KR' }]
  ],
  markdown: {
    math: true,
    lineNumbers: true
  },
  themeConfig: {
    logo: '/images/logo.svg',
    siteTitle: '데이터과학기초',
    nav,
    sidebar,
    outline: {
      level: [2, 3],
      label: '이 페이지에서'
    },
    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '검색', buttonAriaLabel: '문서 검색' },
          modal: {
            noResultsText: '검색 결과가 없습니다.',
            resetButtonTitle: '검색 초기화',
            footer: { selectText: '선택', navigateText: '이동', closeText: '닫기' }
          }
        }
      }
    },
    docFooter: {
      prev: '이전 문서',
      next: '다음 문서'
    },
    darkModeSwitchLabel: '테마',
    sidebarMenuLabel: '목차',
    returnToTopLabel: '맨 위로',
    externalLinkIcon: true,
    socialLinks: []
  }
})
