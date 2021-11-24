FROM node:lts

WORKDIR /app
RUN mkdir -p /app/client
RUN mkdir -p /app/server
COPY ./server/package*.json ./server/
WORKDIR /app/server
RUN npm install
WORKDIR /app
COPY ./server ./server
COPY ./client ./client
WORKDIR /app/client
RUN npm install 
RUN npm run build && cp -r build/* ../server/public/
WORKDIR /app/server
RUN chown -R node:node /app
USER node

EXPOSE 3000
CMD npm start