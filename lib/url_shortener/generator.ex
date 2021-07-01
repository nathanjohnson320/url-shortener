defmodule UrlShortener.Generator do
  @salt Hashids.new(
          salt:
            System.get_env(
              "SECRET_KEY_BASE",
              "CBCWDebpITcDAOJdvzUI0CxJ/PKvaRruA9biRFBmF9xEfilSDo7RitFy5LeCQWYZ"
            )
        )

  def encode(id) do
    Hashids.encode(@salt, id)
  end
end
