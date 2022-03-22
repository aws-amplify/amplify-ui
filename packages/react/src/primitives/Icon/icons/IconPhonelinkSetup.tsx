import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconPhonelinkSetup } from '@aws-amplify/ui-react';` → `import { MdPhonelinkSetup } from 'react-icons/md';`
 */
export const IconPhonelinkSetup = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconPhonelinkSetup } from '@aws-amplify/ui-react'; → import { MdPhonelinkSetup } from 'react-icons/md';`,
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
          d="M6.99997 3V6H8.99997V4H19V20H8.99997V18H6.99997V21C6.99997 22.1 7.89997 23 8.99997 23H19C20.1 23 21 22.1 21 21V3C21 1.9 20.1 1 19 1H8.99997C7.89997 1 6.99997 1.9 6.99997 3ZM9.49997 15.5C9.78997 15.38 10.05 15.21 10.3 15.02L10.28 15.05L11.29 15.44C11.52 15.53 11.78 15.44 11.9 15.22L12.74 13.76C12.86 13.55 12.81 13.27 12.62 13.12L11.77 12.44L11.75 12.47C11.77 12.31 11.8 12.15 11.8 11.99C11.8 11.83 11.77 11.67 11.75 11.51L11.77 11.54L12.62 10.86C12.81 10.71 12.86 10.43 12.74 10.22L11.9 8.76C11.78 8.55 11.52 8.45 11.29 8.54L10.28 8.93L10.3 8.96C10.05 8.79 9.78997 8.62 9.49997 8.5L9.32997 7.42C9.29997 7.18 9.08997 7 8.83997 7H7.15997C6.90997 7 6.69997 7.18 6.66997 7.42L6.49997 8.5C6.20997 8.62 5.94997 8.79 5.69997 8.98L5.71997 8.95L4.69997 8.56C4.46997 8.47 4.20997 8.56 4.08997 8.78L3.24997 10.24C3.12997 10.45 3.17997 10.73 3.36997 10.88L4.21997 11.56L4.23997 11.53C4.21997 11.68 4.18997 11.84 4.18997 12C4.18997 12.16 4.21997 12.32 4.23997 12.48L4.21997 12.45L3.36997 13.13C3.17997 13.28 3.12997 13.56 3.24997 13.77L4.08997 15.23C4.20997 15.44 4.46997 15.54 4.69997 15.45L5.70997 15.06L5.69997 15.02C5.94997 15.21 6.20997 15.38 6.49997 15.5L6.66997 16.57C6.69997 16.82 6.90997 17 7.15997 17H8.83997C9.08997 17 9.29997 16.82 9.32997 16.58L9.49997 15.5V15.5ZM5.99997 12C5.99997 10.9 6.89997 10 7.99997 10C9.09997 10 9.99997 10.9 9.99997 12C9.99997 13.1 9.09997 14 7.99997 14C6.89997 14 5.99997 13.1 5.99997 12Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
