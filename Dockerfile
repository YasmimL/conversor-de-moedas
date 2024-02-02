FROM node:latest as build

WORKDIR /usr/local/app

COPY ./ .

RUN npm install

RUN npm run build

FROM nginx:latest

COPY --from=build /usr/local/app/dist/frete-rapido-challenge /usr/share/nginx/html

EXPOSE 80