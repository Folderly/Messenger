FROM node:16.15.0-alpine3.14 as build

WORKDIR /usr/src/app

COPY . .
RUN yarn && yarn build


FROM nginx:1.21.6-alpine as app

COPY nginx.conf /etc/nginx/conf.d/configfile.template
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

ENV PORT 8080
EXPOSE $PORT
CMD sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
