FROM mhart/alpine-node:12 AS dev

WORKDIR /app

RUN apk add --no-cache make gcc g++ python2 python3 git

ADD . /app

# Do the npm install or yarn install in the full image
FROM mhart/alpine-node:12 AS builder
WORKDIR /app

RUN apk add --no-cache make gcc g++ python2 python3 git

COPY package.json yarn.lock ./

# RUN yarn --production
RUN yarn install  --frozen-lockfile

COPY . .

RUN yarn build
RUN yarn install --production --frozen-lockfile

# RUN npm install modclean pkg -g
# RUN modclean -r ; yarn autoclean --force

# RUN yarn dist

# And then copy over node_modules, etc from that stage to the smaller base image
FROM mhart/alpine-node:slim-12 AS prod-runtime
# RUN apk update && \
#   apk add --no-cache libstdc++ libgcc ca-certificates && \
#   rm -rf /var/cache/apk/*
WORKDIR /app

# COPY package.json next.config.js .env* ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js

EXPOSE 3000

CMD ["node_modules/.bin/next", "start"]
