import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconCenterFocusStrong } from '@aws-amplify/ui-react';` → `import { MdCenterFocusStrong } from 'react-icons/md';`
 */
export const IconCenterFocusStrong = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconCenterFocusStrong } from '@aws-amplify/ui-react'; → import { MdCenterFocusStrong } from 'react-icons/md';`,
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
          d="M17 12C17 9.24 14.76 7 12 7C9.24 7 7 9.24 7 12C7 14.76 9.24 17 12 17C14.76 17 17 14.76 17 12ZM12 15C10.35 15 9 13.65 9 12C9 10.35 10.35 9 12 9C13.65 9 15 10.35 15 12C15 13.65 13.65 15 12 15ZM5 15H3V19C3 20.1 3.9 21 5 21H9V19H5V15ZM5 5H9V3H5C3.9 3 3 3.9 3 5V9H5V5ZM19 3H15V5H19V9H21V5C21 3.9 20.1 3 19 3ZM19 19H15V21H19C20.1 21 21 20.1 21 19V15H19V19Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
