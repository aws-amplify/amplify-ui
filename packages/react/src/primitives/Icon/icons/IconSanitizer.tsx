import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconSanitizer } from '@aws-amplify/ui-react';` → `import { MdSanitizer } from 'react-icons/md';`
 */
export const IconSanitizer = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconSanitizer } from '@aws-amplify/ui-react'; → import { MdSanitizer } from 'react-icons/md';`,
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
          d="M15.5 6.5C15.5 5.66 17 4 17 4C17 4 18.5 5.66 18.5 6.5C18.5 7.33 17.83 8 17 8C16.17 8 15.5 7.33 15.5 6.5ZM19.5 15C20.88 15 22 13.88 22 12.5C22 10.83 19.5 8 19.5 8C19.5 8 17 10.83 17 12.5C17 13.88 18.12 15 19.5 15ZM13 14H11V12H9V14H7V16H9V18H11V16H13V14ZM16 12V20C16 21.1 15.1 22 14 22H6C4.9 22 4 21.1 4 20V12C4 9.03 6.16 6.57 9 6.09V4H7V2H13C14.13 2 15.15 2.39 15.99 3.01L14.56 4.44C14.1 4.17 13.57 4 13 4H11V6.09C13.84 6.57 16 9.03 16 12ZM14 12C14 9.79 12.21 8 10 8C7.79 8 6 9.79 6 12V20H14V12Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
