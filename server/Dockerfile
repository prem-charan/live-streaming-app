FROM node:25-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm@11.5.2 && pnpm install --frozen-lockfile

COPY tsconfig.json ./
COPY src ./src

RUN pnpm exec tsc

EXPOSE 3000

CMD ["node", "dist/index.js"]