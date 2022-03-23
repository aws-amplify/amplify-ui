import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconPhonelinkLock } from '@aws-amplify/ui-react';` → `import { MdPhonelinkLock } from 'react-icons/md';`
 */
export const IconPhonelinkLock = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconPhonelinkLock } from '@aws-amplify/ui-react'; → import { MdPhonelinkLock } from 'react-icons/md';`,
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
          d="M19 1H9C7.9 1 7 1.9 7 3V6H9V4H19V20H9V18H7V21C7 22.1 7.9 23 9 23H19C20.1 23 21 22.1 21 21V3C21 1.9 20.1 1 19 1ZM10.8 11V9.5C10.8 8.1 9.4 7 8 7C6.6 7 5.2 8.1 5.2 9.5V11C4.6 11 4 11.6 4 12.2V15.7C4 16.4 4.6 17 5.2 17H10.7C11.4 17 12 16.4 12 15.8V12.3C12 11.6 11.4 11 10.8 11ZM9.5 11H6.5V9.5C6.5 8.7 7.2 8.2 8 8.2C8.8 8.2 9.5 8.7 9.5 9.5V11Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
