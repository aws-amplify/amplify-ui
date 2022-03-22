import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconSpa } from '@aws-amplify/ui-react';` → `import { MdSpa } from 'react-icons/md';`
 */
export const IconSpa = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconSpa } from '@aws-amplify/ui-react'; → import { MdSpa } from 'react-icons/md';`,
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
          d="M15.49 9.63C15.31 6.84 14.18 4.12 12.06 2C9.92 4.14 8.74 6.86 8.51 9.63C9.79 10.31 10.97 11.19 12 12.26C13.03 11.2 14.21 10.32 15.49 9.63V9.63ZM12.05 5.19C12.68 6.22 13.12 7.37 13.35 8.57C12.88 8.87 12.44 9.2 12.01 9.55C11.59 9.21 11.14 8.88 10.68 8.58C10.93 7.38 11.39 6.23 12.05 5.19V5.19ZM12 15.45C11.18 14.2 10.14 13.11 8.94 12.25C8.81 12.16 8.67 12.09 8.54 11.99C8.67 12.08 8.81 12.16 8.93 12.24C6.98 10.83 4.59 10 2 10C2 15.32 5.36 19.82 10.03 21.49C10.66 21.72 11.32 21.89 12 22C12.68 21.88 13.33 21.71 13.97 21.49C18.64 19.82 22 15.32 22 10C17.82 10 14.15 12.17 12 15.45ZM13.32 19.6C12.88 19.75 12.44 19.87 11.99 19.97C11.55 19.88 11.12 19.76 10.71 19.61C7.42 18.43 5.01 15.62 4.26 12.26C5.36 12.52 6.41 12.97 7.38 13.59L7.36 13.6C7.49 13.69 7.62 13.78 7.75 13.85L7.82 13.89C8.81 14.61 9.66 15.5 10.33 16.54L12 19.1L13.67 16.55C14.36 15.5 15.22 14.6 16.2 13.89L16.27 13.84C16.36 13.79 16.45 13.73 16.54 13.67L16.53 13.65C17.51 13 18.6 12.52 19.74 12.25C18.99 15.62 16.59 18.43 13.32 19.6V19.6ZM8.99 12.28C8.97 12.27 8.95 12.25 8.94 12.24C8.94 12.24 8.95 12.24 8.95 12.25C8.96 12.26 8.97 12.27 8.99 12.28V12.28Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
