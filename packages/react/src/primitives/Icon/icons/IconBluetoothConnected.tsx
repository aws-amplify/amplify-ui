import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconBluetoothConnected } from '@aws-amplify/ui-react';` → `import { MdBluetoothConnected } from 'react-icons/md';`
 */
export const IconBluetoothConnected = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconBluetoothConnected } from '@aws-amplify/ui-react'; → import { MdBluetoothConnected } from 'react-icons/md';`,
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
          d="M7 12L5 10L3 12L5 14L7 12ZM17.71 7.71L12 2H11V9.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L11 14.41V22H12L17.71 16.29L13.41 12L17.71 7.71ZM13 5.83L14.88 7.71L13 9.59V5.83ZM14.88 16.29L13 18.17V14.41L14.88 16.29V16.29ZM19 10L17 12L19 14L21 12L19 10Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
