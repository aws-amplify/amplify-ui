import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconForward_5 } from '@aws-amplify/ui-react';` → `import { MdForward_5 } from 'react-icons/md';`
 */
export const IconForward_5 = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconForward_5');
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
        <path
          d="M17.95 13C17.95 16.31 15.26 19 11.95 19C8.63995 19 5.94995 16.31 5.94995 13C5.94995 9.69 8.63995 7 11.95 7V11L16.95 6L11.95 1V5C7.52995 5 3.94995 8.58 3.94995 13C3.94995 17.42 7.52995 21 11.95 21C16.37 21 19.95 17.42 19.95 13H17.95ZM12.43 15.15C12.38 15.22 12.32 15.28 12.25 15.32C12.18 15.36 12.08 15.38 11.98 15.38C11.81 15.38 11.67 15.33 11.56 15.23C11.45 15.13 11.39 14.99 11.37 14.82H10.53C10.54 15.02 10.58 15.19 10.66 15.35C10.74 15.51 10.85 15.63 10.98 15.74C11.11 15.85 11.27 15.93 11.44 15.98C11.61 16.03 11.79 16.06 11.97 16.06C12.21 16.06 12.43 16.02 12.61 15.94C12.79 15.86 12.94 15.76 13.06 15.63C13.18 15.5 13.27 15.35 13.33 15.18C13.39 15.01 13.42 14.83 13.42 14.64C13.42 14.42 13.39 14.21 13.33 14.04C13.27 13.87 13.19 13.71 13.08 13.59C12.97 13.47 12.83 13.37 12.67 13.31C12.51 13.25 12.33 13.21 12.12 13.21C12.05 13.21 11.98 13.22 11.92 13.23C11.86 13.24 11.79 13.25 11.74 13.27C11.69 13.29 11.64 13.3 11.59 13.32C11.54 13.34 11.51 13.36 11.48 13.37L11.59 12.45H13.29V11.74H10.9L10.65 13.91L11.32 14.08C11.35 14.05 11.38 14.02 11.42 13.99C11.46 13.96 11.49 13.94 11.54 13.92C11.59 13.9 11.64 13.88 11.69 13.87C11.74 13.86 11.82 13.85 11.89 13.85C12.01 13.85 12.11 13.87 12.19 13.9C12.27 13.93 12.35 13.99 12.4 14.05C12.45 14.11 12.5 14.19 12.53 14.29C12.56 14.39 12.57 14.48 12.57 14.6C12.57 14.72 12.56 14.82 12.54 14.91C12.52 15 12.48 15.08 12.43 15.15V15.15Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
