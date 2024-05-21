FROM node:18.20.2 as build
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build



FROM nginx:1.26-alpine3.19 as production-stage

COPY --from=build --chown=nginx:nginx  /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build --chown=nginx:nginx /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]
