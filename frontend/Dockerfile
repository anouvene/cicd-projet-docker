FROM node:lts-alpine as build

# 1. Déclaration de l'argument pour build
ARG VITE_BASE
ENV VITE_BASE=$VITE_BASE

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# 2. Utilisation normale, VITE_BASE est injectée dans vite.config.ts via process.env
RUN npm run build-only

FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]