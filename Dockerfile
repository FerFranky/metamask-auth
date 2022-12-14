FROM node:16.16.0-alpine3.16
WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm install
COPY . /app/
CMD [ "npm" , "start" ]