import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconKeyboardHide } from '@aws-amplify/ui-react';` → `import { MdKeyboardHide } from 'react-icons/md';`
 */
export const IconKeyboardHide = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconKeyboardHide } from '@aws-amplify/ui-react'; → import { MdKeyboardHide } from 'react-icons/md';`,
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
          d="M20 3H4C2.9 3 2.01 3.9 2.01 5L2 15C2 16.1 2.9 17 4 17H20C21.1 17 22 16.1 22 15V5C22 3.9 21.1 3 20 3ZM20 15H4V5H20V15ZM11 6H13V8H11V6ZM11 9H13V11H11V9ZM8 6H10V8H8V6ZM8 9H10V11H8V9ZM5 9H7V11H5V9ZM5 6H7V8H5V6ZM8 12H16V14H8V12ZM14 9H16V11H14V9ZM14 6H16V8H14V6ZM17 9H19V11H17V9ZM17 6H19V8H17V6ZM12 23L16 19H8L12 23Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
