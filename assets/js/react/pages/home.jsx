import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Input from '@components/form/input';
import Button from '@components/form/button';
import ErrorAlert from '@components/alerts/error';
import InfoAlert from '@components/alerts/info';
import { createUrl, setUrl } from '@features/url';

function handleCopy(url) {
  navigator.clipboard.writeText(url.fullShortUrl);
}

export default function Home() {
  const url = useSelector((state) => state.urls.createdUrl);
  const form = useSelector((state) => state.urls.newUrl);
  const urls = useSelector((state) => state.urls.urls);
  const errors = useSelector((state) => state.urls.errors);
  const dispatch = useDispatch();

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

              <form
                id="url-shortener-form"
                onSubmit={(e) => {
                  e.preventDefault();

                  dispatch(createUrl(form));
                }}
                className="mt-12 sm:mx-auto sm:max-w-lg"
              >
                <ErrorAlert errors={errors} className="min-w-0" />
                {
                  url
                    && (
                    <InfoAlert title="Shortened Successfully!">
                      <div className="mt-2 text-sm text-blue-700">
                        <a href={url.fullShortUrl}>
                          Shortened URL:
                          {' '}
                          <span data-test-short-url className="underline">{url.fullShortUrl}</span>
                        </a>
                      </div>

                      <div className="mt-4">
                        <div className="-mx-2 -my-1.5 flex">
                          <Button
                            type="button"
                            onClick={() => { handleCopy(url); }}
                            color="light"
                          >
                            Copy to Clipboard
                          </Button>
                        </div>
                      </div>
                    </InfoAlert>
                    )
                }

                <div className="sm:flex mt-3">
                  <div className="min-w-0 flex-1">
                    <Input
                      name="longUrl"
                      label="Long Url"
                      type="text"
                      placeholder="Enter a long URL"
                      value={form.longUrl || ''}
                      onChange={(e) => {
                        dispatch(setUrl({ ...form, longUrl: e.target.value }));
                      }}
                      required
                    />
                  </div>

                  <div className="mt-4 sm:mt-0 sm:ml-3">
                    <Button
                      type="submit"
                    >
                      Shorten
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        URL
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        To
                      </th>

                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Go</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {urls.map((row, index) => (
                      <tr key={row.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.fullShortUrl}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.longUrl}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a
                            href={row.fullShortUrl}
                            className="text-indigo-600 hover:text-indigo-900"
                            target="_blank"
                            rel="nofollow noopener noreferrer"
                          >
                            Go
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
