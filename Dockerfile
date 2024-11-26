FROM node:18-alpine AS builder 

ENV REACT_APP_SERVER_HOST https://localhost:3001
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

RUN npm install -g serve

CMD ["serve", "-s", "build"]