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
             "long_url" =>
               "https://www.google.com/search?q=url+shortener&oq=google+u&aqs=chrome.0.69i59j69i60l3j0j69i57.1069j0j7&sourceid=chrome&ie=UTF-8",
             "id" => id,
             "short_url" => short_url
           } = json_response(conn, 200)

    assert short_url == Generator.encode(id)
  end

  test "GET /*short_url", %{conn: conn} do
    {:ok, %{url: url}} = Urls.create_url(%{"long_url" => "https://test.com"})
    conn = get(conn, Routes.url_path(conn, :short_redirect, [url.short_url]))
    assert redirected_to(conn, 302) =~ "https://test.com"
  end
end
