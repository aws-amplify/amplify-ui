import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconPhonelinkOff } from '@aws-amplify/ui-react';` → `import { MdPhonelinkOff } from 'react-icons/md';`
 */
export const IconPhonelinkOff = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconPhonelinkOff } from '@aws-amplify/ui-react'; → import { MdPhonelinkOff } from 'react-icons/md';`,
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
          d="M22 5.99977V3.99977H7.39L9.39 5.99977H22ZM24 18.9998V8.99977C24 8.44977 23.55 7.99977 23 7.99977H17C16.45 7.99977 16 8.44977 16 8.99977V12.6098L18 14.6098V9.99977H22V16.9998H20.39L23.32 19.9298C23.71 19.7998 24 19.4398 24 18.9998ZM2.06 1.50977L0.65 2.91977L2.47 4.73977C2.18 5.07977 2 5.51977 2 5.99977V16.9998H0V19.9998H17.73L20.08 22.3498L21.49 20.9398L2.06 1.50977ZM4 16.9998V6.26977L14.73 16.9998H4Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
