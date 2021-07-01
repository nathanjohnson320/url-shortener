import React from 'react';
import { InformationCircleIcon } from '@heroicons/react/solid';

export default function InfoAlert(props) {
  return (
    <div className="rounded-md bg-blue-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <InformationCircleIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <p className="text-sm text-blue-700">
            {props.title}
          </p>

          {props.children}
        </div>
      </div>
    </div>
  );
}
