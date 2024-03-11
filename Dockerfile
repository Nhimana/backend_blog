FROM node:18
EXPOSE 3000
# WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm i -g pnpm
RUN pnpm i
COPY . ./
CMD ["pnpm", "start"]