import React, { useState } from 'react';
import Form from '@components/input/form';
import ErrorAlert from '@components/alerts/error';
import InfoAlert from '@components/alerts/info';
import { create } from '@api/url';

async function handleSubmit(data, setUrl, setErrors) {
  try {
    setUrl(null);
    setErrors({});
    const {data: url} = await create(data);
    setUrl(url);
  } catch(err) {
    setErrors(err?.response?.data?.errors || err?.response?.data);
  }
}

function handleCopy(url) {
  navigator.clipboard.writeText(url.full_short_url);
}

export default function Home() {
  const [url, setUrl] = useState(null);
  const [errors, setErrors] = useState({});

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="relative sm:py-16">
        <div aria-hidden="true" className="hidden sm:block">
          <div className="absolute inset-y-0 left-0 w-1/2 bg-gray-50 rounded-r-3xl" />
          <svg className="absolute top-8 left-1/2 -ml-3" width={404} height={392} fill="none" viewBox="0 0 404 392">
            <defs>
              <pattern
                id="8228f071-bcee-4ec8-905a-2a059a2cc4fb"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
              </pattern>
            </defs>
            <rect width={404} height={392} fill="url(#8228f071-bcee-4ec8-905a-2a059a2cc4fb)" />
          </svg>
        </div>
        <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="relative rounded-2xl px-6 py-10 bg-indigo-600 overflow-hidden shadow-xl sm:px-12 sm:py-20">
            <div aria-hidden="true" className="absolute inset-0 -mt-72 sm:-mt-32 md:mt-0">
              <svg
                className="absolute inset-0 h-full w-full"
                preserveAspectRatio="xMidYMid slice"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 1463 360"
              >
                <path
                  className="text-indigo-500 text-opacity-40"
                  fill="currentColor"
                  d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z"
                />
                <path
                  className="text-indigo-700 text-opacity-40"
                  fill="currentColor"
                  d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z"
                />
              </svg>
            </div>
            <div className="relative">
              <div className="sm:text-center">
                <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
                  Enter a long URL to make it short
                </h2>
                <p className="mt-6 mx-auto max-w-2xl text-lg text-indigo-200">
                  URLs must start with http:// or https://
                </p>
              </div>

              <Form
                id="url-shortener-form"
                onSubmit={(e) => handleSubmit(e, setUrl, setErrors)}
                className="mt-12 sm:mx-auto sm:max-w-lg"
              >
                <ErrorAlert errors={errors} className="min-w-0" />
                {
                  url &&
                    <InfoAlert title="Shortened Successfully!">
                      <div className="mt-2 text-sm text-blue-700">
                        <a href={url.full_short_url}>
                          Shortened URL: <span className="underline">{url.full_short_url}</span>
                        </a>
                      </div>

                      <div className="mt-4">
                        <div className="-mx-2 -my-1.5 flex">
                          <button
                            type="button"
                            onClick={() => { handleCopy(url); }}
                            className="bg-blue-50 px-2 py-1.5 rounded-md text-sm font-medium text-blue-800 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-50 focus:ring-blue-600"
                          >
                            Copy to Clipboard
                          </button>
                        </div>
                      </div>
                    </InfoAlert>
                }

                <div className="sm:flex mt-3">
                  <div className="min-w-0 flex-1">
                    <label htmlFor="long_url" className="sr-only">
                      Long Url
                    </label>
                    <input
                      id="long_url"
                      name="long_url"
                      type="text"
                      required
                      className="block w-full border border-transparent rounded-md px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
                      placeholder="Enter a long URL"
                    />
                  </div>

                  <div className="mt-4 sm:mt-0 sm:ml-3">
                    <button
                      type="submit"
                      className="block w-full rounded-md border border-transparent px-5 py-3 bg-indigo-500 text-base font-medium text-white shadow hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 sm:px-10"
                    >
                      Shorten
                    </button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

