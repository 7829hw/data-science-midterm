# 표본추출(sampling)과 경험적 분포(empirical distribution)
데이터 과학(data science)의 중요한 부분은 무작위 표본(random sample)의 데이터를 바탕으로 결론을 내리는 일이다. 그 결과를 올바르게 해석하려면 데이터 과학자는 먼저 무작위 표본이 정확히 무엇인지 이해해야 한다.

이 장에서는 표본추출(sampling)을 좀 더 주의 깊게 살펴보며, 특히 큰 무작위 표본(random sample)의 성질에 주목한다.

먼저 몇 개의 표본(sample)을 추출해 보자. 예제는 [`top_movies_2017.csv`](https://inferentialthinking.com/chapters/07/1/Visualizing_Categorical_Distributions.html#grouping-categorical-data) 데이터 세트(data set)를 바탕으로 한다.

```python
from datascience import *
path_data = '../../assets/data/'
import numpy as np
import matplotlib.pyplot as plots
plots.style.use('fivethirtyeight')
%matplotlib inline
```

```python
top1 = Table.read_table(path_data + 'top_movies_2017.csv')
top2 = top1.with_column('Row Index', np.arange(top1.num_rows))
top = top2.move_to_start('Row Index')

top.set_format(make_array(3, 4), NumberFormatter)
```

<table border="1" class="dataframe">
    <thead>
        <tr>
            <th>Row Index</th> <th>Title</th> <th>Studio</th> <th>Gross</th> <th>Gross (Adjusted)</th> <th>Year</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>0        </td> <td>Gone with the Wind              </td> <td>MGM            </td> <td>198,676,459</td> <td>1,796,176,700   </td> <td>1939</td>
        </tr>
        <tr>
            <td>1        </td> <td>Star Wars                       </td> <td>Fox            </td> <td>460,998,007</td> <td>1,583,483,200   </td> <td>1977</td>
        </tr>
        <tr>
            <td>2        </td> <td>The Sound of Music              </td> <td>Fox            </td> <td>158,671,368</td> <td>1,266,072,700   </td> <td>1965</td>
        </tr>
        <tr>
            <td>3        </td> <td>E.T.: The Extra-Terrestrial     </td> <td>Universal      </td> <td>435,110,554</td> <td>1,261,085,000   </td> <td>1982</td>
        </tr>
        <tr>
            <td>4        </td> <td>Titanic                         </td> <td>Paramount      </td> <td>658,672,302</td> <td>1,204,368,000   </td> <td>1997</td>
        </tr>
        <tr>
            <td>5        </td> <td>The Ten Commandments            </td> <td>Paramount      </td> <td>65,500,000 </td> <td>1,164,590,000   </td> <td>1956</td>
        </tr>
        <tr>
            <td>6        </td> <td>Jaws                            </td> <td>Universal      </td> <td>260,000,000</td> <td>1,138,620,700   </td> <td>1975</td>
        </tr>
        <tr>
            <td>7        </td> <td>Doctor Zhivago                  </td> <td>MGM            </td> <td>111,721,910</td> <td>1,103,564,200   </td> <td>1965</td>
        </tr>
        <tr>
            <td>8        </td> <td>The Exorcist                    </td> <td>Warner Brothers</td> <td>232,906,145</td> <td>983,226,600     </td> <td>1973</td>
        </tr>
        <tr>
            <td>9        </td> <td>Snow White and the Seven Dwarves</td> <td>Disney         </td> <td>184,925,486</td> <td>969,010,000     </td> <td>1937</td>
        </tr>
    </tbody>
</table>
<p>... (190 rows omitted)</p>

**테이블의 행 표본추출(sampling)**

데이터 테이블의 각 행은 하나의 개체(individual)를 나타낸다. `top`에서 각 개체는 영화 한 편이다. 따라서 개체를 표본추출(sampling)하는 것은 테이블의 행을 표본추출함으로써 이루어질 수 있다.

한 행의 내용은 같은 개체(individual)에 대해 측정된 여러 변수(variable)의 값이다. 따라서 표본추출된 행들의 내용은 각 변수 값들의 표본(sample)을 이룬다.

**결정적 표본(deterministic sample)**

우연이 전혀 개입하지 않은 채 집합의 어떤 원소를 고를지 단순히 지정하면, *결정적 표본*(deterministic sample)을 만들게 된다.

여러분은 이미 이런 일을 여러 번 해 보았다. 예를 들어 `take`를 사용했을 때가 그렇다.

```python
top.take(make_array(3, 18, 100))
```

<table border="1" class="dataframe">
    <thead>
        <tr>
            <th>Row Index</th> <th>Title</th> <th>Studio</th> <th>Gross</th> <th>Gross (Adjusted)</th> <th>Year</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>3        </td> <td>E.T.: The Extra-Terrestrial</td> <td>Universal  </td> <td>435,110,554</td> <td>1,261,085,000   </td> <td>1982</td>
        </tr>
        <tr>
            <td>18       </td> <td>The Lion King              </td> <td>Buena Vista</td> <td>422,783,777</td> <td>792,511,700     </td> <td>1994</td>
        </tr>
        <tr>
            <td>100      </td> <td>The Hunger Games           </td> <td>Lionsgate  </td> <td>408,010,692</td> <td>452,174,400     </td> <td>2012</td>
        </tr>
    </tbody>
</table>

`where`도 사용해 보았다.

```python
top.where('Title', are.containing('Harry Potter'))
```

<table border="1" class="dataframe">
    <thead>
        <tr>
            <th>Row Index</th> <th>Title</th> <th>Studio</th> <th>Gross</th> <th>Gross (Adjusted)</th> <th>Year</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>74       </td> <td>Harry Potter and the Sorcerer's Stone      </td> <td>Warner Brothers</td> <td>317,575,550</td> <td>497,066,400     </td> <td>2001</td>
        </tr>
        <tr>
            <td>114      </td> <td>Harry Potter and the Deathly Hallows Part 2</td> <td>Warner Brothers</td> <td>381,011,219</td> <td>426,630,300     </td> <td>2011</td>
        </tr>
        <tr>
            <td>131      </td> <td>Harry Potter and the Goblet of Fire        </td> <td>Warner Brothers</td> <td>290,013,036</td> <td>401,608,200     </td> <td>2005</td>
        </tr>
        <tr>
            <td>133      </td> <td>Harry Potter and the Chamber of Secrets    </td> <td>Warner Brothers</td> <td>261,988,482</td> <td>399,302,200     </td> <td>2002</td>
        </tr>
        <tr>
            <td>154      </td> <td>Harry Potter and the Order of the Phoenix  </td> <td>Warner Brothers</td> <td>292,004,738</td> <td>377,314,200     </td> <td>2007</td>
        </tr>
        <tr>
            <td>175      </td> <td>Harry Potter and the Half-Blood Prince     </td> <td>Warner Brothers</td> <td>301,959,197</td> <td>359,788,300     </td> <td>2009</td>
        </tr>
        <tr>
            <td>177      </td> <td>Harry Potter and the Prisoner of Azkaban   </td> <td>Warner Brothers</td> <td>249,541,069</td> <td>357,233,500     </td> <td>2004</td>
        </tr>
    </tbody>
</table>

이것들은 표본(sample)이기는 하지만 무작위 표본(random sample)은 아니다. 우연이 개입하지 않기 때문이다.

**확률 표본(probability sample)**

무작위 표본(random sample)을 설명하려면 몇 가지 용어가 있으면 도움이 된다.

*모집단*(population)은 표본(sample)이 추출될 대상이 되는 모든 원소의 집합이다.

*확률 표본*(probability sample)이란 표본을 추출하기 전에, 원소들의 임의의 부분집합(subset)이 표본에 포함될 확률을 계산할 수 있는 표본이다.

확률 표본(probability sample)에서 모든 원소가 같은 확률로 선택될 필요는 없다.

**무작위 표본추출(random sampling) 방식**

예를 들어, 세 사람 A, B, C로 이루어진 모집단(population)에서 다음 방식에 따라 두 사람을 고른다고 하자.

- A는 확률 1로 선택된다.
- B와 C 중 한 사람은 동전 던지기로 선택된다. 동전이 앞면이 나오면 B를, 뒷면이 나오면 C를 선택한다.

이것은 크기가 2인 확률 표본(probability sample)이다. 공집합이 아닌 모든 부분집합(subset)이 표본에 포함될 확률은 다음과 같다.

    A: 1 
    B: 1/2
    C: 1/2
    AB: 1/2
    AC: 1/2
    BC: 0
    ABC: 0

A는 B나 C보다 선택될 확률이 더 높다. 사실 A는 반드시 선택된다. 이러한 차이는 알려져 있고 수치로 나타낼 수 있으므로, 표본(sample)을 다룰 때 이를 고려할 수 있다.

**계통 표본(systematic sample)**

모집단(population)의 모든 원소가 하나의 순서로 나열되어 있다고 상상해 보자. 한 가지 표본추출(sampling) 방법은 목록 앞부분에서 무작위로 한 위치를 고른 뒤, 그 이후로 같은 간격으로 떨어진 위치들을 고르는 것이다. 표본은 그 위치에 있는 원소들로 이루어진다. 이러한 표본을 *계통 표본*(systematic sample)이라고 한다.

여기서는 `top`의 행들로부터 계통 표본(systematic sample)을 뽑아 보겠다. 먼저 처음 10개 행 중 하나를 무작위로 고른 다음, 그 이후로 10번째 행마다 하나씩 고른다.

```python
"""Choose a random start among rows 0 through 9;
then take every 10th row."""

start = np.random.choice(np.arange(10))
top.take(np.arange(start, top.num_rows, 10))
```

<table border="1" class="dataframe">
    <thead>
        <tr>
            <th>Row Index</th> <th>Title</th> <th>Studio</th> <th>Gross</th> <th>Gross (Adjusted)</th> <th>Year</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>6        </td> <td>Jaws                               </td> <td>Universal           </td> <td>260,000,000</td> <td>1,138,620,700   </td> <td>1975</td>
        </tr>
        <tr>
            <td>16       </td> <td>Jurassic Park                      </td> <td>Universal           </td> <td>402,453,882</td> <td>817,186,200     </td> <td>1993</td>
        </tr>
        <tr>
            <td>26       </td> <td>Mary Poppins                       </td> <td>Disney              </td> <td>102,272,727</td> <td>695,036,400     </td> <td>1964</td>
        </tr>
        <tr>
            <td>36       </td> <td>Love Story                         </td> <td>Paramount           </td> <td>106,397,186</td> <td>622,283,500     </td> <td>1970</td>
        </tr>
        <tr>
            <td>46       </td> <td>The Robe                           </td> <td>Fox                 </td> <td>36,000,000 </td> <td>581,890,900     </td> <td>1953</td>
        </tr>
        <tr>
            <td>56       </td> <td>Rogue One: A Star Wars Story       </td> <td>Buena Vista         </td> <td>532,177,324</td> <td>537,326,000     </td> <td>2016</td>
        </tr>
        <tr>
            <td>66       </td> <td>The Dark Knight Rises              </td> <td>Warner Brothers     </td> <td>448,139,099</td> <td>511,902,300     </td> <td>2012</td>
        </tr>
        <tr>
            <td>76       </td> <td>Close Encounters of the Third Kind </td> <td>Columbia            </td> <td>132,088,635</td> <td>494,066,600     </td> <td>1977</td>
        </tr>
        <tr>
            <td>86       </td> <td>Transformers: Revenge of the Fallen</td> <td>Paramount/Dreamworks</td> <td>402,111,870</td> <td>479,179,200     </td> <td>2009</td>
        </tr>
        <tr>
            <td>96       </td> <td>Toy Story 3                        </td> <td>Buena Vista         </td> <td>415,004,880</td> <td>464,074,600     </td> <td>2010</td>
        </tr>
    </tbody>
</table>
<p>... (10 rows omitted)</p>

셀을 여러 번 실행하여 출력이 어떻게 달라지는지 확인해 보자.

이 계통 표본(systematic sample)은 확률 표본(probability sample)이다. 이 방식에서 모든 행은 $1/10$의 확률로 선택된다. 예를 들어 23번 행은 3번 행이 선택될 때, 그리고 그때에만 선택되며, 그 확률은 $1/10$이다.

그러나 모든 부분집합(subset)이 같은 확률로 선택되는 것은 아니다. 선택되는 행들이 같은 간격으로 떨어져 있으므로, 대부분의 행 부분집합은 선택될 가능성이 전혀 없다. 가능한 부분집합은 모든 행이 10의 배수만큼 떨어져 있는 것들뿐이다. 그러한 부분집합은 각각 1/10의 확률로 선택된다. 테이블의 15번째 행과 16번째 행을 모두 포함하는 부분집합이나 크기가 10보다 큰 부분집합과 같은 그 밖의 부분집합은 확률 0으로 선택된다.

**복원 또는 비복원으로 추출한 무작위 표본(random sample)**
 
이 강좌에서는 주로 가장 간단한 두 가지 표본추출(sampling) 방법을 다룬다.

첫 번째는 복원 무작위 표본추출(random sampling with replacement)로, (앞에서 보았듯이) `np.random.choice`가 배열에서 표본을 추출할 때의 기본 동작이다.

다른 하나는 "단순 무작위 표본(simple random sample)"이라고 하며, *비복원*(without replacement)으로 무작위 추출한 표본이다. 표본으로 뽑힌 개체는 다음 개체를 추출하기 전에 모집단(population)으로 되돌려 놓지 않는다. 예를 들어 카드 한 벌에서 패를 나누어 줄 때 일어나는 것이 바로 이런 종류의 표본추출이다. `np.random.choice`로 단순 무작위 표본추출을 하려면 `replace=False` 인수를 포함해야 한다.

이 장에서는 시뮬레이션(simulation)을 이용하여 복원 또는 비복원으로 무작위 추출한 큰 표본(sample)이 어떻게 행동하는지 살펴본다.

**편의 표본(convenience sample)**
무작위 표본(random sample)을 추출하려면 주의와 정확성이 필요하다. "무작위(random)"라는 단어가 일상적으로는 아무렇게나라는 뜻으로 쓰이기도 하지만, 무작위 표본추출은 아무렇게나 하는 것이 아니다. 길모퉁이에 서서 지나가는 처음 열 사람을 표본으로 삼는다면, 누가 지나갈지 여러분이 고르지 않았으므로 무작위로 표본을 추출하고 있다고 생각할 수도 있다. 그러나 이것은 무작위 표본이 아니라 *편의 표본*(sample of convenience)이다. 여러분은 각 사람이 표본에 포함될 확률을 미리 알지 못했고, 어쩌면 모집단(population)에 정확히 누가 속하는지조차 정하지 않았을 것이다.
