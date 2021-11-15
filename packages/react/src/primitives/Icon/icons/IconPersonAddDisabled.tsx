import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconPersonAddDisabled = (props) => {
  const { className, ...rest } = props;
  return (
    <View
      as="span"
      width="1em"
      height="1em"
      className={classNames(ComponentClassNames.Icon, className)}
      {...rest}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_1020_39085)">
          <path
            d="M15 5.99996C16.1 5.99996 17 6.89996 17 7.99996C17 8.98996 16.27 9.81996 15.33 9.96996L13.02 7.65996C13.19 6.71996 14.01 5.99996 15 5.99996ZM15 3.99996C12.79 3.99996 11 5.78996 11 7.99996C11 8.17996 11.03 8.34996 11.05 8.51996L14.48 11.95C14.65 11.97 14.82 12 15 12C17.21 12 19 10.21 19 7.99996C19 5.78996 17.21 3.99996 15 3.99996ZM16.69 14.16L22.53 20H23V18C23 15.86 19.44 14.5 16.69 14.16ZM13.01 16.13L14.88 18H9C9.08 17.76 9.88 16.99 11.91 16.43L13.01 16.13V16.13ZM1.41 1.70996L0 3.11996L4 7.11996V9.99996H1V12H4V15H6V12H8.88L11.39 14.51C9.19 15.11 7 16.3 7 18V20H16.88L20.88 24L22.29 22.59L1.41 1.70996ZM6 9.99996V9.11996L6.88 9.99996H6Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_1020_39085">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </View>
  );
};
