#!/bin/bash

cd ~/dev/wisdom-site-client
git add *
git cm "update"
git push heroku master

cd ~/dev/wisdom-site-server
git add *
git cm "update"
git push heroku master

echo "Deployed wisdom-site-client and wisdom-site-server"

