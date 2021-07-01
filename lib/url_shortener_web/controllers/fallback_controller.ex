defmodule UrlShortenerWeb.FallbackController do
  use UrlShortenerWeb, :controller

  require Logger

  alias UrlShortenerWeb.ChangesetView
  alias UrlShortenerWeb.ErrorView

  # Regular changeset failures will fall in here
  def call(conn, {:error, %Ecto.Changeset{} = changeset}) do
    Logger.warn("Sending 422 response for #{inspect(changeset)}")

    conn
    |> put_status(:unprocessable_entity)
    |> put_view(ChangesetView)
    |> render("error.json", changeset: changeset)
  end

  # When Multis fail a changeset they'll fall in here
  def call(conn, {:error, _, %Ecto.Changeset{} = changeset, _}) do
    Logger.warn("Sending 422 response for #{inspect(changeset)}")

    conn
    |> put_status(:unprocessable_entity)
    |> put_view(ChangesetView)
    |> render("error.json", changeset: changeset)
  end

  def call(conn, unknown) do
    message = "Unknown error response in FallbackController: #{inspect(unknown)}"
    Logger.error(message)

    conn
    |> put_status(:internal_server_error)
    |> put_view(ErrorView)
    |> render(:"500")
  end
end
