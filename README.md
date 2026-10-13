# 데이터과학기초 중간고사 범위 웹사이트

강의 Markdown 26개와 포함 이미지를 VitePress 문서 사이트로 배포하기 위한 프로젝트입니다.

## 실행 방법

실행 경로는 Docker Compose와 GitHub Actions 두 가지입니다. 호스트에 Node.js를 설치할 필요가 없습니다(Node 버전은 `.nvmrc`의 24 LTS 기준).

| 방법 | 명령 | 주소 |
| --- | --- | --- |
| Docker 개발 서버 | `docker compose up --build` | http://localhost:5173 |
| Docker 배포용 빌드(nginx) | `docker compose --profile prod up --build prod` | http://localhost:8080 |
| GitHub Pages | `main` 브랜치에 push | 저장소 Pages 주소 |

### 1. Docker Compose

```bash
docker compose up --build                       # dev: docs/ 를 마운트한 개발 서버
docker compose --profile prod up --build prod   # prod: 정적 빌드 후 nginx로 서빙
```

- `dev`는 `./docs`를 컨테이너에 마운트하므로 문서를 수정하면 바로 반영됩니다.
- `prod`는 이미지 안에서 빌드하므로 문서를 수정한 뒤에는 `--build`로 다시 빌드해야 합니다.
- `Dockerfile`은 멀티 스테이지(`deps` → `dev` / `build` → `prod`)로 구성되어 있습니다.

### 2. GitHub Actions (GitHub Pages 배포)

1. 이 폴더의 내용을 GitHub 저장소의 `main` 브랜치에 push합니다.
2. GitHub 저장소에서 **Settings → Pages**로 이동합니다.
3. **Build and deployment → Source**를 **GitHub Actions**로 선택합니다.
4. `main`에 push할 때마다 `.github/workflows/deploy.yml`이 자동으로 사이트를 빌드·배포합니다.

### 의존성 변경

`package-lock.json`은 Node 24 컨테이너의 npm으로 관리합니다.

```bash
docker run --rm -u "$(id -u):$(id -g)" -e HOME=/tmp -v "$PWD:/app" -w /app node:24-alpine npm install <패키지>
```

## base 경로

사이트의 `base` 경로는 `docs/.vitepress/config.mts`의 `resolveBase()`가 다음 순서로 정합니다.

1. `VITEPRESS_BASE` 환경변수 — GitHub Actions에서는 `actions/configure-pages`가 알려준 경로를 넘겨주므로 프로젝트 Pages, 사용자/조직 Pages, 커스텀 도메인 모두 별도 수정 없이 동작합니다.
2. GitHub Actions 환경이면 저장소 이름으로 추론
3. 그 외(Docker)는 `/`

하위 경로로 빌드해 보고 싶다면 `docker compose build --build-arg VITEPRESS_BASE=/my-repo prod`처럼 실행하세요.

## 문서 수정

- 강의 자료: `docs/10` ~ `docs/14`
- 공용 이미지: `docs/images`
- 목차(nav·sidebar): `docs/.vitepress/chapters.ts`
- 사이트 설정: `docs/.vitepress/config.mts`
- 스타일: `docs/.vitepress/theme/style.css`
- 홈 화면: `docs/index.md`

새 문서를 추가했다면 `docs/.vitepress/chapters.ts`의 해당 장 `sections`에 `[절 번호, 제목, 파일명]`을 추가하세요. 상단 nav와 sidebar에 함께 반영됩니다.
