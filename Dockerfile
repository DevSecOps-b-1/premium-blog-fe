# Stage 1
FROM node:18-alpine AS builder 

ENV REACT_APP_SERVER_HOST http://backend:8080
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2
FROM nginx:1.27.2-alpine

RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]