FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

USER node

COPY --chown=node:node . .

ARG APP_ENV
ENV APP_ENV=${APP_ENV}

RUN if [ "$APP_ENV" = "prod" ] ; then npm run build ; fi

CMD if [ "$APP_ENV" = "prod" ] ; then npm run preview ; else npm run dev ; fi