import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconMasks } from '@aws-amplify/ui-react';` → `import { MdMasks } from 'react-icons/md';`
 */
export const IconMasks = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconMasks } from '@aws-amplify/ui-react'; → import { MdMasks } from 'react-icons/md';`,
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
          d="M19.5 6C18.19 6 17.13 7.01 17.02 8.3C15.14 7.8 14.18 6.5 12 6.5C9.81 6.5 8.86 7.8 6.98 8.3C6.87 7.02 5.81 6 4.5 6C3.12 6 2 7.12 2 8.5V9C2 15 5.6 16.81 8.52 16.98C9.53 17.62 10.72 18 12 18C13.28 18 14.47 17.62 15.48 16.98C18.4 16.81 22 15 22 9V8.5C22 7.12 20.88 6 19.5 6ZM3.5 9V8.5C3.5 7.95 3.95 7.5 4.5 7.5C5.05 7.5 5.5 7.95 5.5 8.5V11.5C5.5 12.78 5.88 13.97 6.51 14.98C4.99 14.27 3.5 12.65 3.5 9ZM7 11.5V9.85C8.12 9.62 8.95 9.16 9.66 8.77C10.48 8.33 11.07 8 12 8C12.93 8 13.52 8.33 14.34 8.78C15.05 9.17 15.88 9.62 17 9.86V11.51C17 14.27 14.76 16.51 12 16.51C9.24 16.51 7 14.26 7 11.5ZM20.5 9C20.5 12.65 19.01 14.27 17.49 14.98C18.13 13.97 18.5 12.78 18.5 11.5V8.5C18.5 7.95 18.95 7.5 19.5 7.5C20.05 7.5 20.5 7.95 20.5 8.5V9V9ZM10.69 10.48C10.25 10.74 9.73 11.04 9 11.24V10.2C9.48 10.03 9.84 9.82 10.18 9.62C10.72 9.3 11.23 9 12 9C12.77 9 13.27 9.3 13.8 9.62C14.14 9.82 14.51 10.04 15 10.21V11.25C14.25 11.04 13.74 10.74 13.29 10.47C12.83 10.2 12.49 10 12 10C11.51 10 11.16 10.2 10.69 10.48Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
