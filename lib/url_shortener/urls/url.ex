defmodule UrlShortener.Urls.Url do
  use Ecto.Schema
  import Ecto.Changeset

  schema "urls" do
    field :long_url, :string
    field :short_url, :string

    timestamps()
  end

  @doc false
  def changeset(url, attrs) do
    url
    # The short_url is intentionally left out
    # because it should only be altered by code
    |> cast(attrs, [:long_url])
    |> validate_required([:long_url])
    |> validate_format(:long_url, ~r/https?:\/\/.+/,
      message: "must start with http:// or https://"
    )
    # This should never happen because the short code is based
    # on id which is unique. But adding it here in the rare
    # event that it has a collision
    |> unique_constraint([:short_url])
  end
end
