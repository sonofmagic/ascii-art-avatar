FROM node:14-alpine

RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

COPY package.json /usr/src/bot

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories \
  && apk add --no-cache \
  build-base \
  g++ \
  cairo-dev \
  jpeg-dev \
  pango-dev \
  giflib-dev  \
  && apk add --update  --repository http://dl-3.alpinelinux.org/alpine/edge/testing \
  libmount \
  ttf-dejavu \
  ttf-droid \
  ttf-freefont \
  ttf-liberation \
  ttf-ubuntu-font-family \
  fontconfig

RUN npm install

COPY . /usr/src/bot

EXPOSE 9000

CMD ["node", "index.js"]