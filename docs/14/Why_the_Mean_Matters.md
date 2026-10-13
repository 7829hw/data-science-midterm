# 평균(mean)이 중요한 이유
이 강좌에서 우리는 총변동거리(total variation distance), 최댓값(maximum), 중앙값(median), 그리고 평균(mean)을 비롯한 여러 가지 통계량(statistic)을 공부해 왔다. 무작위성에 관한 명확한 가정 아래에서, 우리는 이 모든 통계량의 경험적 분포(empirical distribution)를 그려 보았다. 최댓값이나 총변동거리 같은 일부 통계량은 분포가 한쪽 방향으로 뚜렷하게 치우쳐 있다. 그러나 표본 평균(sample mean)의 경험적 분포는 연구 대상 모집단(population)이 무엇이든 거의 언제나 종 모양에 가깝게 나타났다.

무작위 표본(random sample)의 어떤 성질이 *모집단과 관계없이* 성립한다면, 그 성질은 추론(inference)을 위한 강력한 도구가 된다. 우리는 모집단 전체의 데이터에 대해 아는 것이 거의 없기 때문이다. 큰 무작위 표본의 평균(mean)이 갖는 분포(distribution)가 바로 이러한 범주의 성질에 속한다. 이것이 무작위 표본 평균이 데이터 과학에서 광범위하게 사용되는 이유이다.

이 장에서는 평균(mean)을 공부하고, 그 바탕이 되는 모집단(population)에 대해 최소한의 가정만 두고도 평균에 대해 무엇을 말할 수 있는지 살펴본다. 다룰 질문은 다음과 같다.

- 평균(mean)은 정확히 무엇을 측정하는가?
- 대부분의 데이터는 평균에 얼마나 가까이 있는가?
- 표본 크기(sample size)는 표본 평균(sample mean)의 변동성(variability)과 어떤 관계가 있는가?
- 무작위 표본 평균(random sample mean)의 경험적 분포(empirical distribution)는 왜 종 모양으로 나타나는가?
- 추론(inference)을 위해 표본 평균(sample mean)을 어떻게 효과적으로 사용할 수 있는가?