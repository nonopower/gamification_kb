FROM node:20.7.0

WORKDIR /api
COPY . /api
EXPOSE 56000

RUN npm install

CMD [ "node", "server.js" ]