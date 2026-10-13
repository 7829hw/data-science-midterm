import type { DefaultTheme } from 'vitepress'

interface Chapter {
  /** 장 번호 (docs/<id> 디렉터리 이름) */
  id: string
  title: string
  /** 장 개요 문서 (docs/<id>/<overview>.md) */
  overview: string
  /** 세부 절: [절 번호, 제목, 파일명] → docs/<id>/<절 번호>/<파일명>.md */
  sections: [string, string, string][]
}

// 목차의 단일 정보원. 새 문서를 추가할 때는 여기만 수정하면 nav와 sidebar에 함께 반영된다.
export const chapters: Chapter[] = [
  {
    id: '10',
    title: '표본추출과 경험적 분포',
    overview: 'Sampling_and_Empirical_Distributions',
    sections: [
      ['1', '경험적 분포', 'Empirical_Distributions'],
      ['2', '모집단으로부터의 표본추출', 'Sampling_from_a_Population'],
      ['3', '통계량의 경험적 분포', 'Empirical_Distribution_of_a_Statistic'],
      ['4', 'Python 무작위 표본추출', 'Random_Sampling_in_Python']
    ]
  },
  {
    id: '11',
    title: '가설 검정',
    overview: 'Testing_Hypotheses',
    sections: [
      ['1', '모형 평가하기', 'Assessing_a_Model'],
      ['2', '여러 범주', 'Multiple_Categories'],
      ['3', '결정과 불확실성', 'Decisions_and_Uncertainty'],
      ['4', '오류 확률', 'Error_Probabilities']
    ]
  },
  {
    id: '12',
    title: '두 표본의 비교',
    overview: 'Comparing_Two_Samples',
    sections: [
      ['1', 'A/B 검정', 'AB_Testing'],
      ['2', '인과관계', 'Causality'],
      ['3', '디플레이트게이트', 'Deflategate']
    ]
  },
  {
    id: '13',
    title: '추정',
    overview: 'Estimation',
    sections: [
      ['1', '백분위수', 'Percentiles'],
      ['2', '부트스트랩', 'Bootstrap'],
      ['3', '신뢰구간', 'Confidence_Intervals'],
      ['4', '신뢰구간 활용', 'Using_Confidence_Intervals']
    ]
  },
  {
    id: '14',
    title: '평균이 중요한 이유',
    overview: 'Why_the_Mean_Matters',
    sections: [
      ['1', '평균의 성질', 'Properties_of_the_Mean'],
      ['2', '변동성', 'Variability'],
      ['3', 'SD와 정규 곡선', 'SD_and_the_Normal_Curve'],
      ['4', '중심극한정리', 'Central_Limit_Theorem'],
      ['5', '표본 평균의 변동성', 'Variability_of_the_Sample_Mean'],
      ['6', '표본 크기 정하기', 'Choosing_a_Sample_Size']
    ]
  }
]

const overviewLink = (c: Chapter) => `/${c.id}/${c.overview}`

export const nav: DefaultTheme.NavItem[] = [
  { text: '홈', link: '/' },
  ...chapters.map((c) => ({ text: `${c.id}장`, link: overviewLink(c) }))
]

export const sidebar: DefaultTheme.SidebarItem[] = chapters.map((c) => ({
  text: `${c.id} · ${c.title}`,
  collapsed: false,
  items: [
    { text: '개요', link: overviewLink(c) },
    ...c.sections.map(([n, text, file]) => ({
      text: `${c.id}.${n} ${text}`,
      link: `/${c.id}/${n}/${file}`
    }))
  ]
}))
