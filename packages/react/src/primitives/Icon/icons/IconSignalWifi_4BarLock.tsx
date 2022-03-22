import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconSignalWifi_4BarLock } from '@aws-amplify/ui-react';` → `import { MdSignalWifi_4BarLock } from 'react-icons/md';`
 */
export const IconSignalWifi_4BarLock = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconSignalWifi_4BarLock } from '@aws-amplify/ui-react'; → import { MdSignalWifi_4BarLock } from 'react-icons/md';`,
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
          d="M20.5 9.5C20.86 9.5 21.21 9.54 21.55 9.61L23.64 7C23.19 6.66 18.71 3 12 3C5.27999 3 0.809985 6.66 0.359985 7L12 21.5L15.5 17.14V14.5C15.5 11.7 17.7 9.5 20.5 9.5ZM23 16V14.5C23 13.1 21.9 12 20.5 12C19.1 12 18 13.1 18 14.5V16C17.5 16 17 16.5 17 17V21C17 21.5 17.5 22 18 22H23C23.5 22 24 21.5 24 21V17C24 16.5 23.5 16 23 16ZM22 16H19V14.5C19 13.7 19.7 13 20.5 13C21.3 13 22 13.7 22 14.5V16Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
