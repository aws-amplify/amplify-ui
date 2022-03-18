import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconImportantDevices } from '@aws-amplify/ui-react';` → `import { MdImportantDevices } from 'react-icons/md';`
 */
export const IconImportantDevices = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconImportantDevices } from '@aws-amplify/ui-react'; → import { MdImportantDevices } from 'react-icons/md';`,
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
          d="M23 11.01L18 11C17.45 11 17 11.45 17 12V21C17 21.55 17.45 22 18 22H23C23.55 22 24 21.55 24 21V12C24 11.45 23.55 11.01 23 11.01ZM23 20H18V13H23V20ZM20 2H2C0.89 2 0 2.89 0 4V16C0 17.1 0.89 18 2 18H9V20H7V22H15V20H13V18H15V16H2V4H20V9H22V4C22 2.89 21.1 2 20 2ZM11.97 9L11 6L10.03 9H7L9.47 10.76L8.53 13.67L11 11.87L13.47 13.67L12.53 10.76L15 9H11.97Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
