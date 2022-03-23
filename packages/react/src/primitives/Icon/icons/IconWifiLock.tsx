import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconWifiLock } from '@aws-amplify/ui-react';` → `import { MdWifiLock } from 'react-icons/md';`
 */
export const IconWifiLock = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconWifiLock } from '@aws-amplify/ui-react'; → import { MdWifiLock } from 'react-icons/md';`,
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
          d="M21.31 9.58L24 6C20.66 3.49 16.5 2 12 2C7.5 2 3.34 3.49 0 6L12 22L15.5 17.33V14.5C15.5 11.74 17.74 9.5 20.5 9.5C20.78 9.5 21.05 9.54 21.31 9.58ZM23 16V14.5C23 13.12 21.88 12 20.5 12C19.12 12 18 13.12 18 14.5V16C17.45 16 17 16.45 17 17V21C17 21.55 17.45 22 18 22H23C23.55 22 24 21.55 24 21V17C24 16.45 23.55 16 23 16ZM22 16H19V14.5C19 13.67 19.67 13 20.5 13C21.33 13 22 13.67 22 14.5V16Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
