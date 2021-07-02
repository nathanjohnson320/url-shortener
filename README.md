# UrlShortener

## Dependencies

If you are using asdf you can run `asdf install` to get the right elixir and node versions

* elixir (1.12)
* node.js (14)
* docker (https://docs.docker.com/get-docker/)

## TODO

* Swap out Form for Input and Button
* Test the Home
* A cypress test
* Rate limiting
  * https://github.com/michalmuskala/plug_attack
  * Make sure you do this on the redirect so you can't be used for DDoS
* Maybe authentication of API, at least xsrf
* Tests for elixir
* Some sort of session storage for past urls
