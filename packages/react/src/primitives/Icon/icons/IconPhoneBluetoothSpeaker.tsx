import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconPhoneBluetoothSpeaker } from '@aws-amplify/ui-react';` → `import { MdPhoneBluetoothSpeaker } from 'react-icons/md';`
 */
export const IconPhoneBluetoothSpeaker = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconPhoneBluetoothSpeaker } from '@aws-amplify/ui-react'; → import { MdPhoneBluetoothSpeaker } from 'react-icons/md';`,
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
          d="M20 15.5C18.75 15.5 17.55 15.3 16.43 14.93C16.33 14.9 16.22 14.88 16.12 14.88C15.86 14.88 15.61 14.98 15.41 15.17L13.21 17.37C10.38 15.93 8.06 13.62 6.62 10.78L8.82 8.57C9.1 8.31 9.18 7.92 9.07 7.57C8.7 6.45 8.5 5.25 8.5 4C8.5 3.45 8.05 3 7.5 3H4C3.45 3 3 3.45 3 4C3 13.39 10.61 21 20 21C20.55 21 21 20.55 21 20V16.5C21 15.95 20.55 15.5 20 15.5ZM5.03 5H6.53C6.6 5.88 6.75 6.75 6.98 7.58L5.78 8.79C5.38 7.58 5.12 6.32 5.03 5V5ZM19 18.97C17.68 18.88 16.4 18.62 15.2 18.21L16.4 17.01C17.25 17.25 18.12 17.4 19 17.46V18.97ZM14.71 9.5L17 7.21V11H17.5L20.35 8.15L18.21 6L20.36 3.85L17.5 1H17V4.79L14.71 2.5L14 3.21L16.79 6L14 8.79L14.71 9.5ZM18 2.91L18.94 3.85L18 4.79V2.91ZM18 7.21L18.94 8.15L18 9.09V7.21Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
