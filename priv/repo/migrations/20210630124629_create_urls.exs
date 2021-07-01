defmodule UrlShortener.Repo.Migrations.CreateUrls do
  use Ecto.Migration

  def change do
    create table(:urls) do
      add :short_url, :string
      # 2048 is the max URL size according to google
      add :long_url, :string, size: 2048

      timestamps()
    end

    create unique_index(:urls, [:short_url])
  end
end
