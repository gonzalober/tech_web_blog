FROM node:14.14.0-alpine
WORKDIR /app
COPY ./package.json ./
RUN npm i
COPY . .
EXPOSE 5432
CMD ["npm","start"]