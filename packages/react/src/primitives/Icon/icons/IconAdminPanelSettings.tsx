import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconAdminPanelSettings } from '@aws-amplify/ui-react';` → `import { MdAdminPanelSettings } from 'react-icons/md';`
 */
export const IconAdminPanelSettings = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconAdminPanelSettings } from '@aws-amplify/ui-react'; → import { MdAdminPanelSettings } from 'react-icons/md';`,
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
          d="M17 16.6199C17.6186 16.6199 18.12 16.1184 18.12 15.4999C18.12 14.8813 17.6186 14.3799 17 14.3799C16.3814 14.3799 15.88 14.8813 15.88 15.4999C15.88 16.1184 16.3814 16.6199 17 16.6199Z"
          fill="currentColor"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M17 17.5C16.27 17.5 14.81 17.86 14.76 18.58C15.26 19.29 16.08 19.75 17 19.75C17.92 19.75 18.74 19.29 19.24 18.58C19.19 17.86 17.73 17.5 17 17.5Z"
          fill="black"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M18 11.09V6.27L10.5 3L3 6.27V11.18C3 15.72 6.2 19.97 10.5 21C11.05 20.87 11.58 20.68 12.1 20.45C13.18 21.99 14.97 23 17 23C20.31 23 23 20.31 23 17C23 14.03 20.84 11.57 18 11.09ZM11 17C11 17.56 11.08 18.11 11.23 18.62C10.99 18.73 10.75 18.84 10.5 18.92C7.33 17.92 5 14.68 5 11.18V7.58L10.5 5.18L16 7.58V11.09C13.16 11.57 11 14.03 11 17ZM17 21C14.79 21 13 19.21 13 17C13 14.79 14.79 13 17 13C19.21 13 21 14.79 21 17C21 19.21 19.21 21 17 21Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
