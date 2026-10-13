# syntax=docker/dockerfile:1

FROM node:24-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# 개발 서버 (HMR). compose에서 docs/를 bind mount해서 사용한다.
FROM deps AS dev
COPY docs ./docs
EXPOSE 5173
CMD ["npm", "run", "docs:dev", "--", "--host", "0.0.0.0", "--port", "5173"]

FROM deps AS build
ARG VITEPRESS_BASE=/
ENV VITEPRESS_BASE=${VITEPRESS_BASE}
COPY docs ./docs
RUN npm run docs:build

# 정적 빌드 결과를 nginx로 서빙
FROM nginx:1.30-alpine AS prod
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/docs/.vitepress/dist /usr/share/nginx/html
EXPOSE 80
