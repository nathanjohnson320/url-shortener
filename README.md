# UrlShortener

## Dependencies

* elixir (1.12)
* node.js (14)
* docker (https://docs.docker.com/get-docker/)

## Getting started

1. Install asdf to get the right elixir and node versions: https://asdf-vm.com/#/core-manage-asdf
1. Make sure you have a postgres db running on port 5432 with username/password of postgres
   1. You can use this docker command to quickly spin one up: `docker run -d -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 postgres:latest``
1. make setup

## Running the server

1. make server

## Tests

1. make test

This will run mix test, jest, and cypress tests

## Making changes

1. Branch off of master
1. Wait for CI github action to pass
1. Open a PR into "release"
1. On merge will deploy to heroku


