import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconCancelScheduleSend } from '@aws-amplify/ui-react';` → `import { MdCancelScheduleSend } from 'react-icons/md';`
 */
export const IconCancelScheduleSend = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconCancelScheduleSend } from '@aws-amplify/ui-react'; → import { MdCancelScheduleSend } from 'react-icons/md';`,
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
          d="M16.5 9C16.08 9 15.67 9.04 15.26 9.11L1.01 3L1 10L11.06 11.34C10.64 11.78 10.28 12.27 9.97 12.8L1 14L1.01 21L9.08 17.54C9.59 21.19 12.71 24 16.5 24C20.64 24 24 20.64 24 16.5C24 12.36 20.64 9 16.5 9ZM3 8.25L3.01 6.03L10.52 9.25L3 8.25ZM9.1 15.36L3 17.97V15.75L9.17 14.93C9.14 15.07 9.12 15.21 9.1 15.36ZM16.5 22C13.47 22 11 19.53 11 16.5C11 13.47 13.47 11 16.5 11C19.53 11 22 13.47 22 16.5C22 19.53 19.53 22 16.5 22Z"
          fill="currentColor"
        />
        <path
          d="M18.27 14.0298L16.5 15.7898L14.73 14.0298L14.03 14.7298L15.79 16.4998L14.03 18.2698L14.73 18.9698L16.5 17.2098L18.27 18.9698L18.97 18.2698L17.21 16.4998L18.97 14.7298L18.27 14.0298Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
