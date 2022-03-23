import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { Icon3dRotation } from '@aws-amplify/ui-react';` → `import { Md3dRotation } from 'react-icons/md';`
 */
export const Icon3dRotation = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { Icon3dRotation } from '@aws-amplify/ui-react'; → import { Md3dRotation } from 'react-icons/md';`,
  });
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
          d="M7.53 21.48C4.26 19.94 1.92 16.76 1.56 13H0.0599995C0.569999 19.16 5.72 24 12.01 24L12.67 23.97L8.86 20.16L7.53 21.48V21.48ZM8.42 14.96C8.23 14.96 8.05 14.93 7.9 14.88C7.74 14.82 7.61 14.75 7.5 14.64C7.39 14.54 7.3 14.42 7.24 14.27C7.18 14.13 7.15 13.97 7.15 13.8H5.85C5.85 14.16 5.92 14.48 6.06 14.75C6.2 15.02 6.39 15.25 6.62 15.44C6.86 15.62 7.13 15.76 7.44 15.85C7.74 15.95 8.06 16 8.4 16C8.77 16 9.12 15.95 9.43 15.85C9.75 15.75 10.03 15.6 10.26 15.41C10.49 15.22 10.68 14.98 10.81 14.69C10.94 14.4 11.01 14.08 11.01 13.72C11.01 13.53 10.99 13.34 10.94 13.16C10.89 12.98 10.82 12.81 10.71 12.65C10.61 12.49 10.47 12.35 10.31 12.22C10.14 12.09 9.94 11.99 9.7 11.91C9.9 11.82 10.07 11.71 10.22 11.58C10.37 11.45 10.49 11.31 10.59 11.16C10.69 11.01 10.76 10.86 10.81 10.7C10.86 10.54 10.88 10.38 10.88 10.22C10.88 9.86 10.82 9.54 10.7 9.26C10.58 8.98 10.41 8.75 10.19 8.57C9.99 8.38 9.72 8.24 9.42 8.14C9.11 8.05 8.77 8 8.4 8C8.04 8 7.71 8.05 7.4 8.16C7.1 8.27 6.83 8.42 6.61 8.61C6.4 8.8 6.23 9.02 6.1 9.28C5.98 9.54 5.92 9.82 5.92 10.13H7.22C7.22 9.96 7.25 9.81 7.31 9.68C7.37 9.55 7.45 9.43 7.56 9.34C7.67 9.25 7.79 9.17 7.94 9.12C8.09 9.07 8.24 9.04 8.42 9.04C8.82 9.04 9.12 9.14 9.31 9.35C9.5 9.55 9.6 9.84 9.6 10.21C9.6 10.39 9.57 10.55 9.52 10.7C9.47 10.85 9.38 10.97 9.27 11.07C9.16 11.17 9.02 11.25 8.86 11.31C8.7 11.37 8.5 11.4 8.28 11.4H7.51V12.43H8.28C8.5 12.43 8.7 12.45 8.88 12.5C9.06 12.55 9.21 12.63 9.33 12.73C9.45 12.84 9.55 12.97 9.62 13.13C9.69 13.29 9.72 13.48 9.72 13.7C9.72 14.11 9.6 14.42 9.37 14.63C9.14 14.86 8.82 14.96 8.42 14.96V14.96ZM16.97 9.04C16.65 8.71 16.27 8.45 15.83 8.27C15.39 8.09 14.9 8 14.36 8H12V16H14.3C14.85 16 15.36 15.91 15.81 15.73C16.26 15.55 16.65 15.3 16.97 14.97C17.29 14.64 17.54 14.24 17.71 13.78C17.88 13.31 17.97 12.79 17.97 12.21V11.81C17.97 11.23 17.88 10.71 17.71 10.24C17.54 9.77 17.29 9.37 16.97 9.04ZM16.58 12.2C16.58 12.62 16.53 12.99 16.44 13.33C16.34 13.66 16.2 13.95 16.01 14.18C15.82 14.41 15.58 14.59 15.3 14.71C15.01 14.83 14.68 14.89 14.31 14.89H13.4V9.12H14.37C15.09 9.12 15.64 9.35 16.01 9.81C16.39 10.27 16.58 10.93 16.58 11.8V12.2V12.2ZM12.01 0L11.35 0.03L15.16 3.84L16.49 2.51C19.76 4.06 22.1 7.23 22.45 10.99H23.95C23.45 4.84 18.3 0 12.01 0Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
