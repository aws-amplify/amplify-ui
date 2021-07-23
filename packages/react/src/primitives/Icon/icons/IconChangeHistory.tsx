import React from 'react';
export const IconChangeHistory = (props) => {
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
      <path d="M12 7.77L18.39 18H5.61L12 7.77M12 4L2 20h20L12 4z" />
    </svg>
  );
};
