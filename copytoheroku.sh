#!/bin/bash

cd ~/dev/wisdom-site/client
cp -r Procfile package.json public src ../../wisdom-site-client
cd ~/dev/wisdom-site/server
cp -r Procfile .babelrc .env nodemon.json package.json package-lock.json public src ../../wisdom-site-server

#shopt -s extglob
#cp -r !(node_modules) ~/dev/nimbus/client/* ~/dev/nimbus-client-1
#cp -r !(__pycache__) ~/dev/nimbus/server/* ~/dev/nimbus-server-2

echo "Copied from wisdom-site to wisdom-site-client and wisdom-site-server"

