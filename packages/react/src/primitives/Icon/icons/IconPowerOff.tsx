import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconPowerOff } from '@aws-amplify/ui-react';` → `import { MdPowerOff } from 'react-icons/md';`
 */
export const IconPowerOff = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconPowerOff } from '@aws-amplify/ui-react'; → import { MdPowerOff } from 'react-icons/md';`,
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
          d="M9.99996 3H7.99996V4.88L9.99996 6.88V3ZM16 9V12.88L17.8 14.68L18 14.48V9C18 7.9 17.1 7 16 7V3H14V7H10.12L12.12 9H16ZM4.11996 3.84L2.70996 5.25L5.99996 8.54V14.5L9.49996 18V21H14.5V18L14.98 17.52L19.45 21.99L20.86 20.58L4.11996 3.84ZM12.5 17.17V19H11.5V17.17L7.99996 13.65V10.54L13.57 16.11L12.5 17.17V17.17Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
