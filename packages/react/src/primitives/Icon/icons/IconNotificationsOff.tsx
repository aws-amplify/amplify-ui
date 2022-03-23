import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconNotificationsOff } from '@aws-amplify/ui-react';` → `import { MdNotificationsOff } from 'react-icons/md';`
 */
export const IconNotificationsOff = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconNotificationsOff } from '@aws-amplify/ui-react'; → import { MdNotificationsOff } from 'react-icons/md';`,
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
          d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM12 6.5C14.49 6.5 16 8.52 16 11V11.1L18 13.1V11C18 7.93 16.37 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C10.26 4.74 10.03 4.83 9.81 4.91L11.45 6.55C11.63 6.53 11.81 6.5 12 6.5V6.5ZM5.41 3.35L4 4.76L6.81 7.57C6.29 8.57 6 9.74 6 11V16L4 18V19H18.24L19.98 20.74L21.39 19.33L5.41 3.35ZM16 17H8V11C8 10.32 8.12 9.68 8.34 9.1L16 16.76V17Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
