defmodule UrlShortenerWeb.ErrorView do
  use UrlShortenerWeb, :view

  def render("403.html", _assigns) do
    "Forbidden"
  end

  def render("403.json", assigns) do
    %{error: "Forbidden", message: Map.get(assigns, :message, nil)}
  end

  def render("404.html", _assigns) do
    "Not Found"
  end

  def render("404.json", _assigns) do
    %{error: "Resource Not Found"}
  end

  def render("500.html", _assigns) do
    "Internal Server Error"
  end

  def render("500.json", _assigns) do
    %{error: "Unhandled Server Error"}
  end

  def render("504.html", _assigns) do
    "Gateway Timeout"
  end

  def render("504.json", _assigns) do
    %{error: "Gateway Timeout"}
  end

  # By default, Phoenix returns the status message from
  # the template name. For example, "404.html" becomes
  # "Not Found".
  def template_not_found(template, _assigns) do
    Phoenix.Controller.status_message_from_template(template)
  end
end
