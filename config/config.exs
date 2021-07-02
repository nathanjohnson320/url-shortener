# This file is responsible for configuring your application
# and its dependencies with the aid of the Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
import Config

config :url_shortener,
  ecto_repos: [UrlShortener.Repo]

# Configures the endpoint
config :url_shortener, UrlShortenerWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "GBNDPrrLRiZR45DGKN6AKi0BnitUdqqV0waPGoinerplS0zhRcQ/K3HYBSYttT0l",
  render_errors: [view: UrlShortenerWeb.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: UrlShortener.PubSub,
  live_view: [signing_salt: "FKuZua/5"]

# Set the env so we have access at runtime
config :url_shortener, env: Mix.env()

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# When encoding json for the client use camel case
config :phoenix, :format_encoders, json: UrlShortenerWeb.CustomJSONEncoder

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
