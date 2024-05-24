FROM node:18.20.2 as build
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
RUN npm ci


COPY . .
ENV NODE_ENV production

RUN npm run build



FROM nginx:1.26-alpine3.19 as production-stage

COPY --from=build --chown=nginx:nginx  /usr/src/app/config/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build --chown=nginx:nginx /usr/src/app/dist /usr/share/nginx/html
COPY config/env.sh /docker-entrypoint.d/env.sh
EXPOSE 80
RUN chmod +x /docker-entrypoint.d/env.sh

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
