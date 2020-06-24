FROM node:12-alpine AS Builder
WORKDIR /app-build
COPY ./package.json .
COPY ./package-lock.json .
RUN npm install
COPY . .
RUN npm test && \
  npm run build

FROM node:12-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY --from=Builder /app-build/package.json .
RUN npm install
COPY --from=Builder /app-build/dist .
CMD ["node","main.js"]


