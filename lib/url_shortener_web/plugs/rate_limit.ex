defmodule UrlShortenerWeb.Plugs.RateLimit do
  @moduledoc """
  Rate limiting module to be used on API endpoints. Doesn't perform rate limiting
  on localhost. On others it limits requests to 300 per minute per IP.
  """
  use PlugAttack

  import Plug.Conn, only: [send_resp: 3, halt: 1]

  rule "allow local", conn do
    allow(conn.remote_ip == {127, 0, 0, 1})
  end

  rule "throttle by ip", conn do
    throttle(conn.remote_ip,
      period: :timer.seconds(60),
      # 5 requests per second = 60 * 5 = 300 requests per minute
      limit: 300,
      storage: {PlugAttack.Storage.Ets, UrlShortener.PlugAttack.Storage}
    )
  end

  def block_action(conn, _data, _opts) do
    conn
    |> send_resp(:forbidden, Jason.encode!(%{"errors" => %{"rateLimit" => ["exceeded"]}}))
    |> halt()
  end
end
