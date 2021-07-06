defmodule UrlShortener.UrlsTest do
  use UrlShortener.DataCase

  alias UrlShortener.Generator
  alias UrlShortener.Urls

  describe "urls" do
    alias UrlShortener.Urls.Url

    @valid_attrs %{long_url: "http://google.com"}
    @update_attrs %{long_url: "https://test.com"}
    @invalid_attrs %{long_url: nil, short_url: nil}

    def url_fixture(attrs \\ %{}) do
      {:ok, %{url: url}} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Urls.create_url()

      url
    end

    test "list_urls/0 returns all urls" do
      url = url_fixture()
      assert Urls.list_urls() == [url]
    end

    test "get_url!/1 returns the url with given id" do
      url = url_fixture()
      assert Urls.get_url!(url.id) == url
    end

    test "get_url_by/1 returns the url by given params" do
      url = url_fixture()
      assert Urls.get_url_by(long_url: url.long_url) == {:ok, url}
    end

    test "get_url_by/1 returns not_found if params don't match" do
      url_fixture()
      assert Urls.get_url_by(long_url: "NO") == {:error, :not_found}
    end

    test "create_url/1 with valid data creates a url" do
      assert {:ok, %{url: %Url{} = url}} = Urls.create_url(@valid_attrs)
      assert url.long_url == "http://google.com"
      assert url.short_url == Generator.encode(url.id)
    end

    test "create_url/1 with invalid data returns error changeset" do
      assert {:error, :new_url, %Ecto.Changeset{}, %{}} = Urls.create_url(@invalid_attrs)
    end

    test "create_url/1 with invalid url returns error changeset" do
      assert {:error, :new_url, %Ecto.Changeset{}, %{}} =
               Urls.create_url(%{"long_url" => "not https"})
    end

    test "update_url/2 with valid data updates the url" do
      %{short_url: short_url} = url = url_fixture()

      assert {:ok, %Url{} = url} = Urls.update_url(url, @update_attrs)
      assert url.long_url == "https://test.com"
      assert url.short_url == short_url
    end

    test "update_url/2 with invalid data returns error changeset" do
      url = url_fixture()
      assert {:error, %Ecto.Changeset{}} = Urls.update_url(url, @invalid_attrs)
      assert url == Urls.get_url!(url.id)
    end

    test "delete_url/1 deletes the url" do
      url = url_fixture()
      assert {:ok, %Url{}} = Urls.delete_url(url)
      assert_raise Ecto.NoResultsError, fn -> Urls.get_url!(url.id) end
    end

    test "change_url/1 returns a url changeset" do
      url = url_fixture()
      assert %Ecto.Changeset{} = Urls.change_url(url)
    end
  end
end
