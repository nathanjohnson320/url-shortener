import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

function Input({ name, label, ...rest }) {
  return (
    <>
      <label htmlFor={name} className="sr-only">
        {label}
      </label>
      <input
        id={name}
        className="block w-full border border-transparent rounded-md px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
        {...rest}
      />
    </>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default Input;
