FROM elixir:1.12-alpine

ARG app_name=url_shortener
ARG phoenix_subdir=.
ARG build_env=prod
ENV MIX_ENV=${build_env} TERM=xterm
WORKDIR /opt/app
RUN apk update \
    && apk --no-cache --update add nodejs nodejs-npm \
    && mix local.rebar --force \
    && mix local.hex --force
COPY . .
RUN mix do deps.get, compile
RUN cd ${phoenix_subdir}/assets \
    && npm install \
    && npm run deploy \
    && cd .. \
    && mix phx.digest
RUN mix release ${app_name} \
    && mv _build/${build_env}/rel/${app_name} /opt/release \
    && mv /opt/release/bin/${app_name} /opt/release/bin/start_server
FROM alpine:latest
ARG project_id
RUN apk update \
    && apk --no-cache --update add bash ca-certificates openssl-dev \
    && mkdir -p /usr/local/bin
ENV REPLACE_OS_VARS=true
# For local dev, heroku will ignore this
EXPOSE $PORT

WORKDIR /opt/app
COPY --from=0 /opt/release .
RUN addgroup -S elixir && adduser -H -D -S -G elixir elixir
RUN chown -R elixir:elixir /opt/app
USER elixir

# Heroku sets magical $PORT variable so we need to pass it to our app's start
CMD PORT=$PORT exec /opt/app/bin/start_server start 
