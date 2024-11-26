FROM node:18-alpine AS builder 

ENV REACT_APP_SERVER_HOST https://localhost:3001
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

RUN npm install serve

COPY . .
RUN npm run build

CMD ["serve", "-s", "build"]