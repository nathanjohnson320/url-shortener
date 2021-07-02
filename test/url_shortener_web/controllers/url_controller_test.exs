defmodule UrlShortenerWeb.UrlControllerTest do
  use UrlShortenerWeb.ConnCase

  alias UrlShortener.Generator
  alias UrlShortener.Urls

  test "POST /", %{conn: conn} do
    conn =
      post(conn, Routes.url_path(conn, :create), %{
        "long_url" =>
          "https://www.google.com/search?q=url+shortener&oq=google+u&aqs=chrome.0.69i59j69i60l3j0j69i57.1069j0j7&sourceid=chrome&ie=UTF-8"
      })

    assert %{
             "longUrl" =>
               "https://www.google.com/search?q=url+shortener&oq=google+u&aqs=chrome.0.69i59j69i60l3j0j69i57.1069j0j7&sourceid=chrome&ie=UTF-8",
             "id" => id,
             "shortUrl" => short_url,
             "fullShortUrl" => full_short_url
           } = json_response(conn, 200)

    short_code = Generator.encode(id)
    assert short_url == short_code
    assert full_short_url == "http://localhost:4002/#{short_code}"
  end

  test "GET /*short_url", %{conn: conn} do
    {:ok, %{url: url}} = Urls.create_url(%{"long_url" => "https://test.com"})
    conn = get(conn, Routes.url_path(conn, :short_redirect, [url.short_url]))
    assert redirected_to(conn, 302) =~ "https://test.com"
  end
end
