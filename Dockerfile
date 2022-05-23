FROM node:16.15.0-alpine3.14 as build

WORKDIR /usr/src/app

COPY . .
RUN yarn && yarn build


FROM nginx:1.21.6-alpine as app

COPY --from=build /usr/src/app/dist /usr/share/nginx/html

EXPOSE $PORT
CMD ["nginx", "-g", "daemon off;"]