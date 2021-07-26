FROM node:14-alpine

RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

COPY package.json yarn.lock /usr/src/bot/

# 注册 alpinelinux 镜像地址,防止下载过慢
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories \
  && apk add --no-cache \
  build-base \
  g++ \
  cairo \
  jpeg \
  pango \
  giflib  \
  && apk add --update  --repository http://dl-3.alpinelinux.org/alpine/edge/testing \
  libmount \
  ttf-dejavu \
  ttf-droid \
  ttf-freefont \
  ttf-liberation \
  ttf-ubuntu-font-family \
  fontconfig \
  && yarn --prod

COPY ./src /usr/src/bot/src

EXPOSE 9000

ENTRYPOINT ["yarn" ,"start"]
