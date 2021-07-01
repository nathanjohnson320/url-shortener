defmodule UrlShortenerWeb.UrlViewTest do
  use UrlShortenerWeb.ConnCase, async: true

  alias UrlShortenerWeb.UrlView
  alias UrlShortener.Urls

  describe "render_full_short_url/1" do
    test "should render a full url" do
      {:ok, %{url: url}} = Urls.create_url(%{"long_url" => "http://test.com"})
      assert UrlView.render_full_short_url(url) == "http://localhost:4002/#{url.short_url}"
    end
  end
end
