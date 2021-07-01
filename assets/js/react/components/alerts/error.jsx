import React from 'react';
import { XCircleIcon } from '@heroicons/react/solid';
import { capitalCase } from 'change-case';

export default function ErrorAlert(props) {
  const errorCount = props.errors && Object.keys(props.errors).length;
  if (!props.errors || errorCount <= 0) {
    return null;
  }

  return (
    <div className="rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            {
              props.name || errorCount < 2 ? 'There was an error with your submission' : `There were ${errorCount} errors with your submission`
            }

          </h3>

          <div className="mt-2 text-sm text-red-700">
            <ul className="list-disc pl-5 space-y-1">
              {
                props.name ? <li>{props.errors[props.name]}</li> : Object.entries(props.errors).map(([field, message]) => <li key={field}>{capitalCase(field)}: {message}</li>)
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

