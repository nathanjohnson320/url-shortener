defmodule UrlShortenerWeb.ChangesetView do
  use UrlShortenerWeb, :view

  alias Ecto.Changeset

  @doc """
  Traverses and translates changeset errors.

  See `Ecto.Changeset.traverse_errors/2` and
  `UrlShortenerWeb.ErrorHelpers.translate_error/1` for more details.
  """
  def translate_errors(changeset) do
    changeset
    |> Changeset.traverse_errors(&translate_error/1)
    |> strip_empty_maps()
  end

  defp strip_empty_maps(list) when is_list(list) do
    list |> Enum.filter(&not_empty?/1) |> Enum.map(&strip_empty_maps/1)
  end

  defp strip_empty_maps(%{__struct__: _any_struct} = node), do: node

  defp strip_empty_maps(node) when is_map(node) do
    node
    |> Enum.filter(fn {_key, value} -> not_empty?(value) end)
    |> Enum.map(fn {key, value} ->
      {key, strip_empty_maps(value)}
    end)
    |> Enum.into(%{})
  end

  defp strip_empty_maps(something_else), do: something_else

  defp not_empty?(list) when list == [], do: false

  defp not_empty?(map) when map == %{}, do: false

  defp not_empty?(_), do: true

  def render("error.json", %{changeset: changeset} = error) do
    # When encoded, the changeset returns its errors
    # as a JSON object. So we just pass it forward.
    case error do
      %{message: message} ->
        %{errors: translate_errors(changeset), message: message}

      _ ->
        %{errors: translate_errors(changeset)}
    end
  end

  def render("error.json", %{errors: errors}) do
    %{errors: errors}
  end

  def render("error.json", %{message: message}) do
    %{message: message}
  end
end
