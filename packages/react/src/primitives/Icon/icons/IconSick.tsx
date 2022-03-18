import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconSick } from '@aws-amplify/ui-react';` → `import { MdSick } from 'react-icons/md';`
 */
export const IconSick = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconSick } from '@aws-amplify/ui-react'; → import { MdSick } from 'react-icons/md';`,
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
          d="M7.32018 10.56L8.38018 9.5L7.32018 8.44L8.38018 7.38L10.5002 9.5L8.38018 11.62L7.32018 10.56ZM4.50018 9C4.53018 9 4.55018 9.01 4.58018 9.01C5.77018 6.07 8.64018 4 12.0002 4C14.1902 4 16.1602 4.88 17.6102 6.3C17.7602 5.7 18.0602 5.01 18.4202 4.34C16.6802 2.88 14.4402 2 11.9902 2C7.11018 2 3.05018 5.51 2.18018 10.14C2.74018 9.44 3.59018 9 4.50018 9ZM21.0002 10.5C20.5802 10.5 20.1802 10.41 19.8102 10.28C19.9302 10.83 20.0002 11.41 20.0002 12C20.0002 16.42 16.4202 20 12.0002 20C8.64018 20 5.77018 17.93 4.58018 14.99C4.55018 14.99 4.53018 15 4.50018 15C3.98018 15 3.46018 14.86 3.00018 14.6C2.68018 14.42 2.41018 14.18 2.18018 13.9C3.07018 18.51 7.11018 22 11.9802 22C17.5202 22 22.0002 17.52 22.0002 12C22.0002 11.45 21.9402 10.91 21.8602 10.38C21.5802 10.45 21.3002 10.5 21.0002 10.5ZM21.0002 3C21.0002 3 19.0002 5.9 19.0002 7C19.0002 8.1 19.9002 9 21.0002 9C22.1002 9 23.0002 8.1 23.0002 7C23.0002 5.9 21.0002 3 21.0002 3ZM15.6202 7.38L13.5002 9.5L15.6202 11.62L16.6802 10.56L15.6202 9.5L16.6802 8.44L15.6202 7.38ZM8.56018 17C9.25018 15.81 10.5302 15 12.0002 15C13.4702 15 14.7502 15.81 15.4402 17H17.1202C16.3202 14.95 14.3302 13.5 12.0002 13.5C11.1302 13.5 10.3002 13.7 9.57018 14.07L5.99018 12C5.99018 11.48 5.73018 10.98 5.25018 10.71C4.53018 10.3 3.62018 10.54 3.20018 11.26C2.79018 11.98 3.03018 12.89 3.75018 13.31C4.23018 13.59 4.80018 13.56 5.24018 13.31L8.21018 15.03C7.64018 15.56 7.18018 16.24 6.88018 17H8.56018Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
