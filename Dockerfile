FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . ./
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=build /app/dist/loonsimulatie ./
CMD node server/server.mjs
EXPOSE 4000
