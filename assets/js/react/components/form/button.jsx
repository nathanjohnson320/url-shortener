import React from 'react';

import PropTypes from 'prop-types';

function Button({ color, children, ...rest }) {
  let classes = '';
  switch (color) {
    case 'light':
      classes = 'bg-blue-50 px-2 py-1.5 rounded-md text-sm font-medium text-blue-800 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-50 focus:ring-blue-600';
      break;
    default:
      classes = 'block w-full rounded-md border border-transparent px-5 py-3 bg-indigo-500 text-base font-medium text-white shadow hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 sm:px-10';
  }

  return (
    <button
      type="submit"
      className={classes}
      {...rest}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  color: 'dark',
};

Button.propTypes = {
  color: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Button;
