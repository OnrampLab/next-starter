FROM node:12.2.0-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
COPY . .
RUN yarn install && yarn build

EXPOSE 3000

# start app
CMD [ "yarn", "start" ]
