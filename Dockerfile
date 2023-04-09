
FROM node:14.20.0-alpine as build
WORKDIR /app

COPY . .

RUN npm install
RUN npm run build-prod

FROM nginx:alpine
COPY --from=build /app/clientApp /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf

# EXPOSE 80
