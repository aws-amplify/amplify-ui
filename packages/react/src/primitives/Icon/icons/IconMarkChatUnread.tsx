import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconMarkChatUnread } from '@aws-amplify/ui-react';` → `import { MdMarkChatUnread } from 'react-icons/md';`
 */
export const IconMarkChatUnread = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconMarkChatUnread } from '@aws-amplify/ui-react'; → import { MdMarkChatUnread } from 'react-icons/md';`,
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
          d="M22 6.98V16C22 17.1 21.1 18 20 18H6L2 22V4C2 2.9 2.9 2 4 2H14.1C14.04 2.32 14 2.66 14 3C14 3.34 14.04 3.68 14.1 4H4V16H20V7.9C20.74 7.75 21.42 7.42 22 6.98ZM16 3C16 4.66 17.34 6 19 6C20.66 6 22 4.66 22 3C22 1.34 20.66 0 19 0C17.34 0 16 1.34 16 3Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
