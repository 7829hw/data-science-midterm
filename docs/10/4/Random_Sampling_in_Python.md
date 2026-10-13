# 파이썬(Python)에서의 무작위 표본추출(random sampling)

이 절에서는 파이썬(Python)으로 무작위 표본추출(random sampling)을 하는 방법 가운데 지금까지 배운 것들을 요약하고, 새로운 방법 하나를 소개한다.

## 복습: 테이블에 있는 모집단(population)으로부터의 표본추출(sampling)
데이터가 테이블의 행으로 표현된 개체들의 모집단(population)에서 표본추출(sampling)을 한다면, Table 메서드(method) `sample`을 사용하여 테이블의 [행을 무작위로 선택](https://inferentialthinking.com/chapters/10/1/Empirical_Distributions.html#id1)할 수 있다. 즉, `sample`을 사용하여 개체들의 무작위 표본(random sample)을 선택할 수 있다.

기본적으로 `sample`은 균등(uniform)하게 무작위로 복원 추출(sampling with replacement)을 한다. 이는 주사위 굴리기와 같은 우연 실험(chance experiment)에 대한 자연스러운 모형(model)이다.

```python
from datascience import *
path_data = '../../../assets/data/'
import matplotlib
matplotlib.use('Agg')
%matplotlib inline
import matplotlib.pyplot as plots
plots.style.use('fivethirtyeight')
import numpy as np
```

```python
faces = np.arange(1, 7)
die = Table().with_columns('Face', faces)
die
```

<table border="1" class="dataframe">
    <thead>
        <tr>
            <th>Face</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1   </td>
        </tr>
        <tr>
            <td>2   </td>
        </tr>
        <tr>
            <td>3   </td>
        </tr>
        <tr>
            <td>4   </td>
        </tr>
        <tr>
            <td>5   </td>
        </tr>
        <tr>
            <td>6   </td>
        </tr>
    </tbody>
</table>

아래 셀을 실행하여 주사위를 7번 굴리는 것을 시뮬레이션(simulation)해 보자.

```python
die.sample(7)
```

<table border="1" class="dataframe">
    <thead>
        <tr>
            <th>Face</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>5   </td>
        </tr>
        <tr>
            <td>3   </td>
        </tr>
        <tr>
            <td>3   </td>
        </tr>
        <tr>
            <td>5   </td>
        </tr>
        <tr>
            <td>5   </td>
        </tr>
        <tr>
            <td>1   </td>
        </tr>
        <tr>
            <td>6   </td>
        </tr>
    </tbody>
</table>

때로는 개체들을 비복원(without replacement)으로 무작위 추출하는 것이 더 자연스럽다. 이를 단순 무작위 표본(simple random sample)이라고 한다. 인수 `with_replacement=False`를 사용하면 이렇게 할 수 있다.

```python
actors = Table.read_table(path_data + 'actors.csv')
actors
```

<table border="1" class="dataframe">
    <thead>
        <tr>
            <th>Actor</th> <th>Total Gross</th> <th>Number of Movies</th> <th>Average per Movie</th> <th>#1 Movie</th> <th>Gross</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Harrison Ford     </td> <td>4871.7     </td> <td>41              </td> <td>118.8            </td> <td>Star Wars: The Force Awakens</td> <td>936.7</td>
        </tr>
        <tr>
            <td>Samuel L. Jackson </td> <td>4772.8     </td> <td>69              </td> <td>69.2             </td> <td>The Avengers                </td> <td>623.4</td>
        </tr>
        <tr>
            <td>Morgan Freeman    </td> <td>4468.3     </td> <td>61              </td> <td>73.3             </td> <td>The Dark Knight             </td> <td>534.9</td>
        </tr>
        <tr>
            <td>Tom Hanks         </td> <td>4340.8     </td> <td>44              </td> <td>98.7             </td> <td>Toy Story 3                 </td> <td>415  </td>
        </tr>
        <tr>
            <td>Robert Downey, Jr.</td> <td>3947.3     </td> <td>53              </td> <td>74.5             </td> <td>The Avengers                </td> <td>623.4</td>
        </tr>
        <tr>
            <td>Eddie Murphy      </td> <td>3810.4     </td> <td>38              </td> <td>100.3            </td> <td>Shrek 2                     </td> <td>441.2</td>
        </tr>
        <tr>
            <td>Tom Cruise        </td> <td>3587.2     </td> <td>36              </td> <td>99.6             </td> <td>War of the Worlds           </td> <td>234.3</td>
        </tr>
        <tr>
            <td>Johnny Depp       </td> <td>3368.6     </td> <td>45              </td> <td>74.9             </td> <td>Dead Man's Chest            </td> <td>423.3</td>
        </tr>
        <tr>
            <td>Michael Caine     </td> <td>3351.5     </td> <td>58              </td> <td>57.8             </td> <td>The Dark Knight             </td> <td>534.9</td>
        </tr>
        <tr>
            <td>Scarlett Johansson</td> <td>3341.2     </td> <td>37              </td> <td>90.3             </td> <td>The Avengers                </td> <td>623.4</td>
        </tr>
    </tbody>
</table>
<p>... (40 rows omitted)</p>

```python
# Simple random sample of 5 rows
actors.sample(5, with_replacement=False)
```

<table border="1" class="dataframe">
    <thead>
        <tr>
            <th>Actor</th> <th>Total Gross</th> <th>Number of Movies</th> <th>Average per Movie</th> <th>#1 Movie</th> <th>Gross</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Morgan Freeman   </td> <td>4468.3     </td> <td>61              </td> <td>73.3             </td> <td>The Dark Knight </td> <td>534.9</td>
        </tr>
        <tr>
            <td>Orlando Bloom    </td> <td>2815.8     </td> <td>17              </td> <td>165.6            </td> <td>Dead Man's Chest</td> <td>423.3</td>
        </tr>
        <tr>
            <td>Cameron Diaz     </td> <td>3031.7     </td> <td>34              </td> <td>89.2             </td> <td>Shrek 2         </td> <td>441.2</td>
        </tr>
        <tr>
            <td>Michael Caine    </td> <td>3351.5     </td> <td>58              </td> <td>57.8             </td> <td>The Dark Knight </td> <td>534.9</td>
        </tr>
        <tr>
            <td>Leonardo DiCaprio</td> <td>2518.3     </td> <td>25              </td> <td>100.7            </td> <td>Titanic         </td> <td>658.7</td>
        </tr>
    </tbody>
</table>

`sample`은 행이 선택된 순서대로 전체 표본(sample)을 제공하므로, 표본추출된 테이블에 Table 메서드(method)를 사용하여 표본에 관한 많은 질문에 답할 수 있다. 예를 들어 주사위에서 눈이 여섯 개인 면이 나온 횟수, 표본으로 뽑힌 배우들이 출연한 영화 수의 평균(average), 또는 지정한 두 배우 중 한 명이 표본에 나타났는지 여부를 알아낼 수 있다. 이러한 정보 중 일부를 얻으려면 여러 줄의 코드가 필요할 수도 있다.

## 복습: 배열에 있는 모집단(population)으로부터의 표본추출(sampling)

데이터가 배열로 표현된 개체들의 모집단(population)에서 표본추출(sampling)을 한다면, NumPy 함수 `np.random.choice`를 사용하여 [배열의 원소를 무작위로 선택](https://inferentialthinking.com/chapters/09/3/Simulation.html#example-number-of-heads-in-100-tosses)할 수 있다.

기본적으로 `np.random.choice`는 복원 무작위 표본추출(random sampling with replacement)을 한다.

```python
# The faces of a die, as an array
faces
```

```
array([1, 2, 3, 4, 5, 6])
```

```python
# 7 rolls of the die
np.random.choice(faces, 7)
```

```
array([4, 1, 6, 3, 5, 4, 6])
```

인수 `replace=False`를 사용하면 단순 무작위 표본(simple random sample), 즉 비복원으로 무작위 추출한 표본을 얻을 수 있다.

```python
# Array of actor names
actor_names = actors.column('Actor')
```

```python
# Simple random sample of 5 actor names
np.random.choice(actor_names, 5, replace=False)
```

```
array(['Jonah Hill', 'Julia Roberts', 'Bruce Willis', 'Eddie Murphy',
       'Matt Damon'], dtype='<U22')
```

`sample`과 마찬가지로 `np.random.choice`도 표본추출된 원소들의 전체 순서를 제공한다. 배열 연산을 사용하여 표본(sample)에 관한 많은 질문에 답할 수 있다. 예를 들어 두 번째로 뽑힌 배우가 누구인지, 또는 주사위에서 두 번 이상 나온 면의 개수를 알아낼 수 있다. 어떤 답은 여러 줄의 코드가 필요할 수도 있다.

## 범주형 분포(categorical distribution)로부터의 표본추출(sampling)
때로는 표본으로 뽑힌 개체들의 범주형 속성(categorical attribute)에 관심이 있다. 예를 들어 동전이 앞면으로 떨어지는지 뒷면으로 떨어지는지를 살펴볼 수 있다. 또는 무작위로 선택된 유권자들의 지지 정당에 관심이 있을 수도 있다.

이러한 경우 우리는 흔히 서로 다른 범주(category)에 속하는 표본 유권자들의 비율(proportion)이 필요하다. 전체 표본(sample)을 가지고 있다면 이러한 비율을 계산할 수 있다. `datascience` 라이브러리의 함수 `sample_proportions`가 이 작업을 대신해 준다. 이 함수는 범주형 분포(categorical distribution)에서 복원 무작위 표본추출(random sampling with replacement)을 하도록 맞추어져 있으며, 각 범주에 속하는 표본 원소들의 비율을 반환한다.

`sample_proportions` 함수는 두 개의 인수를 받는다.
- 표본 크기(sample size)
- 모집단(population)에서 범주들의 분포(distribution). 합이 1인 비율들의 리스트 또는 배열로 나타낸다.

이 함수는 모집단(population)에서 추출한, 주어진 크기의 무작위 표본(random sample)에서의 범주 분포(distribution)를 담은 배열을 반환한다. 이 배열은 서로 다른 모든 범주에서의 표본 비율(sample proportion)로 이루어지며, 그 순서는 모집단 분포에서 범주가 나타난 순서와 같다.

예를 들어 어떤 종의 각 식물이 다른 모든 식물의 꽃 색깔과 관계없이 25%의 확률(probability)로 빨간 꽃을, 50%의 확률로 분홍 꽃을, 25%의 확률로 흰 꽃을 피운다고 하자. `sample_proportions`를 사용하여 이 종의 식물 300그루 중 서로 다른 색깔의 비율(proportion)을 확인할 수 있다.

```python
# Species distribution of flower colors:
# Proportions are in the order Red, Pink, White
species_proportions = [0.25, 0.5, .25]

sample_size = 300

# Distribution of sample
sample_distribution = sample_proportions(sample_size, species_proportions)
sample_distribution
```

```
array([0.24333333, 0.50333333, 0.25333333])
```

예상대로 표본(sample)에서의 비율(proportion)들을 더하면 1이 된다.

```python
sum(sample_distribution)
```

```
1.0
```

`species_proportions`의 범주(category)들은 빨강(Red), 분홍(Pink), 흰색(White)의 순서로 되어 있다. 이 순서는 `sample_proportions`에서도 유지된다. 표본(sample)에서 분홍 꽃을 피우는 식물의 비율(proportion)만 원한다면 `item`을 사용하면 된다.

```python
# Sample proportion of Heads
sample_distribution.item(1)
```

```
0.5033333333333333
```

`sample_proportions`와 배열 연산을 사용하면 서로 다른 범주(category)에 속하는 표본 개체들의 비율(proportion)만을 바탕으로 한 질문에 답할 수 있다. 표본으로 뽑힌 식물 중 어느 것이 각각 어떤 색깔이었는지와 같이 표본(sample)에 관한 더 자세한 정보가 필요한 질문에는 답할 수 없다.
