import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconSurroundSound } from '@aws-amplify/ui-react';` → `import { MdSurroundSound } from 'react-icons/md';`
 */
export const IconSurroundSound = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconSurroundSound } from '@aws-amplify/ui-react'; → import { MdSurroundSound } from 'react-icons/md';`,
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
          d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 18H4V6H20V18Z"
          fill="currentColor"
        />
        <path
          d="M8.29 15.7098C7.27 14.6898 6.75 13.3498 6.75 11.9998C6.75 10.6498 7.27 9.3098 8.28 8.2798L7.05 7.0498C5.68 8.4098 5 10.2098 5 11.9998C5 13.7898 5.68 15.5898 7.06 16.9398L8.29 15.7098Z"
          fill="black"
        />
        <path
          d="M12 15.5C13.93 15.5 15.5 13.93 15.5 12C15.5 10.07 13.93 8.5 12 8.5C10.07 8.5 8.5 10.07 8.5 12C8.5 13.93 10.07 15.5 12 15.5ZM12 10.5C12.83 10.5 13.5 11.17 13.5 12C13.5 12.83 12.83 13.5 12 13.5C11.17 13.5 10.5 12.83 10.5 12C10.5 11.17 11.17 10.5 12 10.5Z"
          fill="black"
        />
        <path
          d="M15.72 15.7201L16.95 16.9501C18.32 15.5901 19 13.7901 19 12.0001C19 10.2101 18.32 8.41006 16.94 7.06006L15.71 8.29006C16.73 9.31006 17.25 10.6501 17.25 12.0001C17.25 13.3501 16.73 14.6901 15.72 15.7201Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
