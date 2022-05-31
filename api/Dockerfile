FROM node:14.18.2-alpine3.12 as build

WORKDIR /usr/src/app

COPY . .
RUN yarn && yarn build


FROM node:14.18.2-alpine3.12 as app

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist dist
COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/.env .env
COPY --from=build /usr/src/app/yarn.lock yarn.lock

ENV NODE_ENV=production

ARG GOOGLE_CLIENT_ID
ENV GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID

ARG GOOGLE_CLIENT_SECRET
ENV GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET

ARG GOOGLE_REDIRECT_URL
ENV GOOGLE_REDIRECT_URL=$GOOGLE_REDIRECT_URL

RUN yarn

EXPOSE 3000
CMD [ "yarn", "node", "dist/main" ]