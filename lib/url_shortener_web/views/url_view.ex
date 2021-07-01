defmodule UrlShortenerWeb.UrlView do
  use UrlShortenerWeb, :view

  def render("url.json", %{url: url}) do
    %{
      id: url.id,
      short_url: url.short_url,
      long_url: url.long_url,
      full_short_url: render_full_short_url(url, Application.get_env(:url_shortener, :env))
    }
  end

  @doc """
  Given a short URL returns a full URL.

  This could probably also go in the Urls context and
  be called here. Maybe move it if we need it somewhere
  else.
  """
  def render_full_short_url(%{short_url: short_url}, env) do
    uri =
      UrlShortenerWeb.Endpoint.struct_url()
      |> Map.put(:path, "/#{short_url}")

    uri =
      if env == :prod do
        Map.put(uri, :port, nil)
      else
        uri
      end

    to_string(uri)
  end
end
