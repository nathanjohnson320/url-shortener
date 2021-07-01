defmodule UrlShortenerWeb.ErrorViewTest do
  use UrlShortenerWeb.ConnCase, async: true

  # Bring render/3 and render_to_string/3 for testing custom views
  import Phoenix.View

  test "renders 403.html" do
    assert render_to_string(UrlShortenerWeb.ErrorView, "403.html", []) == "Forbidden"
  end

  test "renders 403.json" do
    assert render_to_string(UrlShortenerWeb.ErrorView, "403.json", []) ==
             "{\"error\":\"Forbidden\",\"message\":null}"
  end

  test "renders 404.html" do
    assert render_to_string(UrlShortenerWeb.ErrorView, "404.html", []) == "Not Found"
  end

  test "renders 404.json" do
    assert render_to_string(UrlShortenerWeb.ErrorView, "404.json", []) ==
             "{\"error\":\"Resource Not Found\"}"
  end

  test "renders 500.html" do
    assert render_to_string(UrlShortenerWeb.ErrorView, "500.html", []) == "Internal Server Error"
  end

  test "renders 500.json" do
    assert render_to_string(UrlShortenerWeb.ErrorView, "500.json", []) ==
             "{\"error\":\"Unhandled Server Error\"}"
  end

  test "renders 504.html" do
    assert render_to_string(UrlShortenerWeb.ErrorView, "504.html", []) == "Gateway Timeout"
  end

  test "renders 504.json" do
    assert render_to_string(UrlShortenerWeb.ErrorView, "504.json", []) ==
             "{\"error\":\"Gateway Timeout\"}"
  end
end
