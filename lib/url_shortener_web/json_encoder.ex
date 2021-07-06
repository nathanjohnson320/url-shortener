defmodule UrlShortenerWeb.CustomJSONEncoder do
  @moduledoc """
  Encoder that tells ProperCase to use Jason as the encoder and transform into camel case
  """
  use ProperCase.JSONEncoder,
    transform: &ProperCase.to_camel_case/1,
    json_encoder: Jason
end
