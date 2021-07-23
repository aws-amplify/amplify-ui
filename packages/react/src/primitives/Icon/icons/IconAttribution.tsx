import React from 'react';
export const IconAttribution = (props) => {
  const { size = 'medium', fill = 'currentColor', ariaLabel, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      enable-background="new 0 0 24 24"
      data-size={size}
      aria-label={ariaLabel}
      fill={fill}
      {...rest}
      viewBox="0 0 24 24"
      className="amplify-ui-icon"
    >
      <g>
        <rect fill="none" height="24" width="24" />
      </g>
      <g>
        <g>
          <g>
            <path d="M12,8.5c-0.91,0-2.75,0.46-2.75,1.38v4.62h1.5V19h2.5v-4.5h1.5V9.88C14.75,8.97,12.91,8.5,12,8.5z" />
            <path d="M12,2C6.47,2,2,6.47,2,12s4.47,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,20c-4.42,0-8-3.58-8-8s3.58-8,8-8s8,3.58,8,8 S16.42,20,12,20z" />
            <circle cx="12" cy="6.5" r="1.5" />
          </g>
        </g>
      </g>
    </svg>
  );
};
