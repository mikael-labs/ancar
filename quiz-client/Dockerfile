FROM node:16-alpine3.16 as build

WORKDIR /app

COPY . ./

RUN npm install --quiet

RUN npm run build

FROM nginx:mainline-alpine3.17-slim as serve

COPY nginx.conf /etc/nginx/conf.d/configfile.template

COPY --from=build /app/dist /usr/share/nginx/html

ENV PORT $PORT
ENV HOST 0.0.0.0
EXPOSE $PORT

CMD sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
