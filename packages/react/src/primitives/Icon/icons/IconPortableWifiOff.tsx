import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconPortableWifiOff } from '@aws-amplify/ui-react';` → `import { MdPortableWifiOff } from 'react-icons/md';`
 */
export const IconPortableWifiOff = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconPortableWifiOff } from '@aws-amplify/ui-react'; → import { MdPortableWifiOff } from 'react-icons/md';`,
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
          d="M3.42 2.36L2.01 3.78L4.1 5.87C2.79 7.57 2 9.69 2 12C2 15.7 4.01 18.92 6.99 20.65L7.99 18.92C5.61 17.53 4 14.96 4 12C4 10.24 4.57 8.62 5.53 7.31L6.96 8.75C6.36 9.68 6 10.8 6 12C6 14.22 7.21 16.15 9 17.19L10 15.45C8.81 14.75 8 13.48 8 12C8 11.35 8.17 10.75 8.44 10.21L10.02 11.79L10 12C10 13.1 10.9 14 12 14L12.21 13.98L19.73 21.5L21.14 20.09L3.42 2.36ZM17.71 13.82C17.89 13.25 18 12.63 18 12C18 8.69 15.31 6 12 6C11.37 6 10.75 6.11 10.18 6.29L11.9 8.01C11.93 8.01 11.96 8 12 8C14.21 8 16 9.79 16 12C16 12.04 15.99 12.07 15.99 12.11L17.71 13.82ZM12 4C16.42 4 20 7.58 20 12C20 13.2 19.71 14.32 19.23 15.35L20.72 16.84C21.53 15.4 22 13.76 22 12C22 6.48 17.52 2 12 2C10.24 2 8.6 2.48 7.16 3.28L8.64 4.76C9.66 4.28 10.8 4 12 4Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
