defmodule UrlShortener.Urls do
  @moduledoc """
  The Urls context.
  """

  import Ecto.Query, warn: false

  alias Ecto.Multi

  alias UrlShortener.{Generator, Repo}
  alias UrlShortener.Urls.Url

  @doc """
  Returns the list of urls.

  ## Examples

      iex> list_urls()
      [%Url{}, ...]

  """
  def list_urls do
    Repo.all(Url)
  end

  @doc """
  Gets a single url.

  Raises `Ecto.NoResultsError` if the Url does not exist.

  ## Examples

      iex> get_url!(123)
      %Url{}

      iex> get_url!(456)
      ** (Ecto.NoResultsError)

  """
  def get_url!(id), do: Repo.get!(Url, id)

  @doc """
  Gets a single url.

  Raises `Ecto.NoResultsError` if the Url does not exist.

  ## Examples

  iex> get_url!(123)
  %Url{}

  iex> get_url!(456)
  ** (Ecto.NoResultsError)

  """
  def get_url_by(params) do
    case Repo.get_by(Url, params) do
      nil ->
        {:error, :not_found}

      %Url{} = url ->
        {:ok, url}
    end
  end

  @doc """
  Creates a url.

  ## Examples

      iex> create_url(%{field: value})
      {:ok, %Url{}}

      iex> create_url(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_url(attrs \\ %{}) do
    Multi.new()
    |> Multi.insert(:new_url, Url.changeset(%Url{}, attrs))
    |> Multi.update(:url, fn %{new_url: url} ->
      url
      |> change_url(%{})
      |> Ecto.Changeset.put_change(:short_url, Generator.encode(url.id))
    end)
    |> Repo.transaction()
  end

  @doc """
  Updates a url.

  ## Examples

      iex> update_url(url, %{field: new_value})
      {:ok, %Url{}}

      iex> update_url(url, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_url(%Url{} = url, attrs) do
    url
    |> Url.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a url.

  ## Examples

      iex> delete_url(url)
      {:ok, %Url{}}

      iex> delete_url(url)
      {:error, %Ecto.Changeset{}}

  """
  def delete_url(%Url{} = url) do
    Repo.delete(url)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking url changes.

  ## Examples

      iex> change_url(url)
      %Ecto.Changeset{data: %Url{}}

  """
  def change_url(%Url{} = url, attrs \\ %{}) do
    Url.changeset(url, attrs)
  end
end
