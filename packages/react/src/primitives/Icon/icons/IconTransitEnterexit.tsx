import React from 'react';
export const IconTransitEnterexit = (props) => {
  const { size = 'medium', fill = 'currentColor', ariaLabel, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      data-size={size}
      aria-label={ariaLabel}
      fill={fill}
      {...rest}
      viewBox="0 0 24 24"
      className="amplify-ui-icon"
    >
      <path d="M16 18H6V8h3v4.77L15.98 6 18 8.03 11.15 15H16v3z" />
    </svg>
  );
};
