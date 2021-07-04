defmodule Mix.Tasks.Cypress do
  @moduledoc """
  Starts the backend API and then runs cypress tests against it.
  """

  use Mix.Task

  def run(_) do
    Application.put_env(:phoenix, :serve_endpoints, true, persistent: true)
    Mix.Task.run("app.start")

    args = ["run", "--headless"]

    {_out, rc} =
      System.cmd(Path.expand("./assets/node_modules/.bin/cypress"), args,
        cd: "assets",
        into: IO.stream(:stdio, :line)
      )

    :erlang.halt(rc)
  end
end
