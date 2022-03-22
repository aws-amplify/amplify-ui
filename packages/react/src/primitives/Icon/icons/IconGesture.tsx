import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconGesture } from '@aws-amplify/ui-react';` → `import { MdGesture } from 'react-icons/md';`
 */
export const IconGesture = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconGesture } from '@aws-amplify/ui-react'; → import { MdGesture } from 'react-icons/md';`,
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
          d="M4.58997 6.89C5.28997 6.18 5.98997 5.54 6.29997 5.67C6.79997 5.87 6.29997 6.7 5.99997 7.19C5.74997 7.61 3.13997 11.08 3.13997 13.5C3.13997 14.78 3.61997 15.84 4.47997 16.48C5.22997 17.04 6.21997 17.21 7.11997 16.94C8.18997 16.63 9.06997 15.54 10.18 14.17C11.39 12.68 13.01 10.73 14.26 10.73C15.89 10.73 15.91 11.74 16.02 12.52C12.24 13.16 10.64 16.19 10.64 17.89C10.64 19.59 12.08 20.98 13.85 20.98C15.48 20.98 18.14 19.65 18.54 14.88H21V12.38H18.53C18.38 10.73 17.44 8.18 14.5 8.18C12.25 8.18 10.32 10.09 9.55997 11.02C8.97997 11.75 7.49997 13.5 7.26997 13.74C7.01997 14.04 6.58997 14.58 6.15997 14.58C5.70997 14.58 5.43997 13.75 5.79997 12.66C6.14997 11.57 7.19997 9.8 7.64997 9.14C8.42997 8 8.94997 7.22 8.94997 5.86C8.94997 3.69 7.30997 3 6.43997 3C5.11997 3 3.96997 4 3.71997 4.25C3.35997 4.61 3.05997 4.91 2.83997 5.18L4.58997 6.89ZM13.88 18.55C13.57 18.55 13.14 18.29 13.14 17.83C13.14 17.23 13.87 15.63 16.01 15.07C15.71 17.76 14.58 18.55 13.88 18.55Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
