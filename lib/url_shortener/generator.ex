defmodule UrlShortener.Generator do
  @moduledoc """
  Handles generating short IDs for URLs. Wraps Hashids with pre defined salt
  """
  @salt Hashids.new(
          salt:
            Application.compile_env!(:url_shortener, UrlShortenerWeb.Endpoint)[:secret_key_base]
        )

  def encode(id) do
    Hashids.encode(@salt, id)
  end
end
