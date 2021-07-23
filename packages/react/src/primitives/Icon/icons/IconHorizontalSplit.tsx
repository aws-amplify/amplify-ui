import React from 'react';
export const IconHorizontalSplit = (props) => {
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
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M3 19h18v-6H3v6zm0-8h18V9H3v2zm0-6v2h18V5H3z" />
    </svg>
  );
};
