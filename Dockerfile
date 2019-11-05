FROM node:alpine

WORKDIR /app_tasks

COPY package.json package-lock.json ./

RUN npm install

COPY ./build .

EXPOSE 3000

CMD ["node", "app.js"]
