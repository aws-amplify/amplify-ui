import React from 'react';
export const IconCalendarViewDay = (props) => {
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
      <path d="M3 17h18v2H3zm0-7h18v5H3zm0-4h18v2H3z" />
    </svg>
  );
};
