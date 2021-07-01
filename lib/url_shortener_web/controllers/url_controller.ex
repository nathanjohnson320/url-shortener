defmodule UrlShortenerWeb.UrlController do
  use UrlShortenerWeb, :controller

  alias UrlShortener.Urls

  action_fallback(UrlShortenerWeb.FallbackController)

  def create(conn, params) do
    # Creates a url, any "else" clause will be handled in action fallback
    with {:ok, %{url: url}} <- Urls.create_url(params) do
      render(conn, "url.json", %{url: url})
    end
  end

  @doc """
  Given a short code this will either redirect to the full url or render
  a 404 if the short code isn't found.
  """
  def short_redirect(conn, %{"short_url" => [short_url]}) do
    with {:ok, %{long_url: long_url}} <- Urls.get_url_by(short_url: short_url) do
      redirect(conn, external: long_url)
    end
  end
end
