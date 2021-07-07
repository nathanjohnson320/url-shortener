defmodule UrlShortener.Generator do
  @moduledoc """
  Handles generating short IDs for URLs. Wraps Hashids with pre defined salt
  """
  def encode(id) do
    salt =
      Hashids.new(
        salt: Application.get_env(:url_shortener, UrlShortenerWeb.Endpoint)[:secret_key_base]
      )

    Hashids.encode(salt, id)
  end
end
