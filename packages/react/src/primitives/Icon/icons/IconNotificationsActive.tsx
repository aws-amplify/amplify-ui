import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconNotificationsActive } from '@aws-amplify/ui-react';` → `import { MdNotificationsActive } from 'react-icons/md';`
 */
export const IconNotificationsActive = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconNotificationsActive } from '@aws-amplify/ui-react'; → import { MdNotificationsActive } from 'react-icons/md';`,
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
          d="M11.9998 22C13.0998 22 13.9998 21.1 13.9998 20H9.99979C9.99979 21.1 10.8998 22 11.9998 22ZM17.9998 16V11C17.9998 7.93 16.3698 5.36 13.4998 4.68V4C13.4998 3.17 12.8298 2.5 11.9998 2.5C11.1698 2.5 10.4998 3.17 10.4998 4V4.68C7.63979 5.36 5.99979 7.92 5.99979 11V16L3.99979 18V19H19.9998V18L17.9998 16ZM15.9998 17H7.99979V11C7.99979 8.52 9.50979 6.5 11.9998 6.5C14.4898 6.5 15.9998 8.52 15.9998 11V17ZM7.57979 4.08L6.14979 2.65C3.74978 4.48 2.16979 7.3 2.02979 10.5H4.02979C4.17979 7.85 5.53979 5.53 7.57979 4.08V4.08ZM19.9698 10.5H21.9698C21.8198 7.3 20.2398 4.48 17.8498 2.65L16.4298 4.08C18.4498 5.53 19.8198 7.85 19.9698 10.5Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
