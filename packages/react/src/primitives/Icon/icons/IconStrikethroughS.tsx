import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconStrikethroughS } from '@aws-amplify/ui-react';` → `import { MdStrikethroughS } from 'react-icons/md';`
 */
export const IconStrikethroughS = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconStrikethroughS } from '@aws-amplify/ui-react'; → import { MdStrikethroughS } from 'react-icons/md';`,
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
          d="M7.24 8.75C6.98 8.27 6.85 7.72 6.85 7.08C6.85 6.47 6.98 5.92 7.25 5.41C7.51 4.91 7.88 4.48 8.36 4.12C8.84 3.77 9.41 3.49 10.06 3.29C10.72 3.1 11.45 3 12.24 3C13.05 3 13.78 3.11 14.45 3.34C15.11 3.56 15.68 3.88 16.14 4.28C16.61 4.68 16.97 5.16 17.22 5.71C17.47 6.26 17.6 6.86 17.6 7.52H14.59C14.59 7.21 14.54 6.93 14.44 6.67C14.35 6.4 14.2 6.18 14 5.99C13.8 5.8 13.55 5.66 13.25 5.55C12.95 5.45 12.59 5.39 12.19 5.39C11.8 5.39 11.45 5.43 11.16 5.52C10.87 5.61 10.63 5.73 10.44 5.88C10.25 6.04 10.1 6.22 10 6.43C9.9 6.64 9.85 6.86 9.85 7.09C9.85 7.57 10.1 7.97 10.59 8.3C10.97 8.55 11.36 8.78 12 9H7.39C7.34 8.92 7.28 8.83 7.24 8.75V8.75ZM21 12V10H3V12H12.62C12.8 12.07 13.02 12.14 13.17 12.2C13.54 12.37 13.83 12.54 14.04 12.71C14.25 12.88 14.39 13.07 14.47 13.28C14.54 13.48 14.58 13.71 14.58 13.97C14.58 14.2 14.53 14.42 14.44 14.63C14.35 14.83 14.21 15.01 14.02 15.16C13.83 15.31 13.6 15.42 13.31 15.51C13.02 15.59 12.68 15.64 12.3 15.64C11.87 15.64 11.47 15.6 11.12 15.51C10.77 15.42 10.46 15.28 10.21 15.09C9.96 14.9 9.76 14.65 9.62 14.34C9.48 14.03 9.37 13.58 9.37 13.13H6.4C6.4 13.68 6.48 14.26 6.64 14.71C6.8 15.16 7.01 15.56 7.29 15.92C7.57 16.27 7.89 16.58 8.27 16.84C8.64 17.1 9.05 17.32 9.49 17.49C9.93 17.66 10.39 17.79 10.87 17.88C11.35 17.96 11.83 18.01 12.31 18.01C13.11 18.01 13.84 17.92 14.49 17.73C15.14 17.54 15.7 17.28 16.16 16.94C16.62 16.6 16.98 16.17 17.23 15.67C17.48 15.17 17.61 14.6 17.61 13.96C17.61 13.36 17.51 12.82 17.3 12.35C17.25 12.24 17.19 12.12 17.13 12.02H21V12Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
