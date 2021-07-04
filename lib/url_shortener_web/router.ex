defmodule UrlShortenerWeb.Router do
  use UrlShortenerWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug RemoteIp
  end

  pipeline :api do
    plug :accepts, ["json"]

    plug RemoteIp
    plug ProperCase.Plug.SnakeCaseParams
    plug UrlShortenerWeb.Plugs.RateLimit
  end

  scope "/api", UrlShortenerWeb do
    pipe_through :api

    resources "/url", UrlController, only: [:create]
  end

  scope "/", UrlShortenerWeb do
    pipe_through :browser

    get "/", PageController, :index
  end

  # Enables LiveDashboard only for development
  #
  # If you want to use the LiveDashboard in production, you should put
  # it behind authentication and allow only admins to access it.
  # If your application does not have an admins-only section yet,
  # you can use Plug.BasicAuth to set up some basic authentication
  # as long as you are also using SSL (which you should anyway).
  if Mix.env() in [:dev, :test] do
    import Phoenix.LiveDashboard.Router

    scope "/" do
      pipe_through :browser
      live_dashboard "/dashboard", metrics: UrlShortenerWeb.Telemetry
    end
  end

  # This is our catchall route for short urls
  # Make sure it's at the bottom so it doesn't collide
  # with other routes
  scope "/", UrlShortenerWeb do
    pipe_through :browser

    get "/*short_url", UrlController, :short_redirect
  end
end
