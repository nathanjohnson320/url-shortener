defmodule UrlShortenerWeb.UrlView do
  use UrlShortenerWeb, :view

  def render("url.json", %{url: url}) do
    %{
      id: url.id,
      short_url: url.short_url,
      long_url: url.long_url,
      full_short_url: render_full_short_url(url)
    }
  end

  def render_full_short_url(%{short_url: short_url}) do
    UrlShortenerWeb.Endpoint.struct_url()
    |> Map.put(:path, "/#{short_url}")
    |> to_string()
  end
end
