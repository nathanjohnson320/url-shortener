import React from 'react';
import PropTypes from 'prop-types';
import { InformationCircleIcon } from '@heroicons/react/solid';

function InfoAlert({ title, children }) {
  return (
    <div className="rounded-md bg-blue-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <InformationCircleIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <p className="text-sm text-blue-700">
            {title}
          </p>

          {children}
        </div>
      </div>
    </div>
  );
}

InfoAlert.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default InfoAlert;
