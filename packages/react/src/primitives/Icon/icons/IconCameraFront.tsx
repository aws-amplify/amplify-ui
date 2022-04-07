import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconCameraFront } from '@aws-amplify/ui-react';` → `import { MdCameraFront } from 'react-icons/md';`
 */
export const IconCameraFront = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconCameraFront } from '@aws-amplify/ui-react'; → import { MdCameraFront } from 'react-icons/md';`,
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
          d="M5 20V22H10V24L13 21L10 18V20H5ZM14 20H19V22H14V20ZM11.99 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 11.99 4C10.88 4 10 4.9 10 6C10 7.1 10.89 8 11.99 8ZM17 0H7C5.9 0 5 0.9 5 2V16C5 17.1 5.9 18 7 18H17C18.1 18 19 17.1 19 16V2C19 0.9 18.1 0 17 0ZM17 16H7V14H17V16ZM17 12.5C17 10.83 13.67 10 12 10C10.33 10 7 10.83 7 12.5V2H17V12.5Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
