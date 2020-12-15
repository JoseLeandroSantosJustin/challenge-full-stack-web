FROM node:14

WORKDIR /home/node/app

COPY package*.json ./

COPY . ./

RUN npm install

USER node

EXPOSE 8081

CMD [ "node", "src/server.js" ]