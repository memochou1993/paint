#!/usr/bin/env sh

set -e

npm run build

cd dist

git init
git checkout -b gh-pages
git add -A
git commit -m 'deploy'
git push -f git@github.com:memochou1993/paint.git gh-pages

cd -
