#!/bin/bash
if ! [ -x "$(command -v yum)" ]; then
  echo 'not a target system'
  exit 0;
fi

yum install libuuid-devel libmount-devel && cp /lib64/{libuuid,libmount,libblkid}.so.1 node_modules/canvas/build/Release/

# "vercel-build": "yum install libuuid-devel libmount-devel && cp /lib64/{libuuid,libmount,libblkid}.so.1 node_modules/canvas/build/Release/ "