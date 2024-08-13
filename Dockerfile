# Stage 1: Build the React app
FROM node:20 AS build

WORKDIR /app

COPY package.json ./
RUN yarn install

COPY . ./
RUN yarn build

# Verifica que el directorio /app/dist existe
RUN ls -la /app/dist

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
