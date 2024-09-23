FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . ./
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/dist/loonsimulatie ./
RUN npm install express
CMD node proxy-server.mjs
EXPOSE 4000
