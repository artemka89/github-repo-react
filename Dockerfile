FROM node:20.18.0-alpine AS builder

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.27.2-alpine

COPY --from=builder /app/dist /usr/share/nginx/html/
#COPY --from=builder /app/images/ /usr/share/nginx/html/images/
