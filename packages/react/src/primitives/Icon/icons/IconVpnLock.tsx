import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconVpnLock } from '@aws-amplify/ui-react';` → `import { MdVpnLock } from 'react-icons/md';`
 */
export const IconVpnLock = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconVpnLock } from '@aws-amplify/ui-react'; → import { MdVpnLock } from 'react-icons/md';`,
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
          d="M18.92 12C18.96 12.33 19 12.66 19 13C19 15.08 18.2 16.97 16.9 18.39C16.64 17.58 15.9 17 15 17H14V14C14 13.45 13.55 13 13 13H7V11H9C9.55 11 10 10.55 10 10V8H12C13.1 8 14 7.1 14 6V3.46C13.05 3.16 12.05 3 11 3C5.48 3 1 7.48 1 13C1 18.52 5.48 23 11 23C16.52 23 21 18.52 21 13C21 12.66 20.98 12.33 20.95 12H18.92V12ZM10 20.93C6.05 20.44 3 17.08 3 13C3 12.38 3.08 11.79 3.21 11.21L8 16V17C8 18.1 8.9 19 10 19V20.93ZM22 4V3.5C22 2.12 20.88 1 19.5 1C18.12 1 17 2.12 17 3.5V4C16.45 4 16 4.45 16 5V9C16 9.55 16.45 10 17 10H22C22.55 10 23 9.55 23 9V5C23 4.45 22.55 4 22 4ZM21 4H18V3.5C18 2.67 18.67 2 19.5 2C20.33 2 21 2.67 21 3.5V4Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
