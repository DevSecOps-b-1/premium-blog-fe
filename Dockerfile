FROM node:18-alpine AS builder 

ENV REACT_APP_SERVER_HOST http://localhost:3001
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]