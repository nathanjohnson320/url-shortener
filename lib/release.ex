defmodule UrlShortener.Release do
  @moduledoc """
  When we deploy to a minimal docker container there's no longer iex or mix available
  on the CLI so we have to expose scripts that allow us to do things like migrate, rollback,
  or run seeds.
  """

  @app :url_shortener

  @doc """
  bin/start_server eval 'UrlShortener.Release.migrate()'
  """
  def migrate do
    for repo <- repos() do
      {:ok, _, _} = Ecto.Migrator.with_repo(repo, &Ecto.Migrator.run(&1, :up, all: true))
    end
  end

  @doc """
  bin/start_server eval 'UrlShortener.Release.rollback(repo, version)'
  """
  def rollback(repo, version) do
    {:ok, _, _} = Ecto.Migrator.with_repo(repo, &Ecto.Migrator.run(&1, :down, to: version))
  end

  @doc """
  bin/start_server eval 'UrlShortener.Release.seed()'
  """
  def seed() do
    filename = Application.app_dir(:url_shortener, "priv/repo/seeds.exs")

    for repo <- repos() do
      {:ok, _, _} =
        Ecto.Migrator.with_repo(repo, fn _repo ->
          if File.regular?(filename) do
            {:ok, Code.eval_file(filename)}
          else
            {:error, "Seeds file not found."}
          end
        end)
    end
  end

  defp start_minimal() do
    Application.ensure_all_started(:ssl)
    Application.load(@app)
  end

  defp repos do
    start_minimal()
    Application.fetch_env!(@app, :ecto_repos)
  end
end
