defmodule UrlShortenerWeb.PageControllerTest do
  use UrlShortenerWeb.ConnCase

  test "GET /", %{conn: conn} do
    conn = get(conn, "/")
    assert html_response(conn, 200) =~ ~s(id="app")
  end
end
