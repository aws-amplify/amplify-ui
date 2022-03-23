import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconVideoSettings } from '@aws-amplify/ui-react';` → `import { MdVideoSettings } from 'react-icons/md';`
 */
export const IconVideoSettings = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconVideoSettings } from '@aws-amplify/ui-react'; → import { MdVideoSettings } from 'react-icons/md';`,
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
          d="M3 6H21V11H23V6C23 4.9 22.1 4 21 4H3C1.9 4 1 4.9 1 6V18C1 19.1 1.9 20 3 20H12V18H3V6Z"
          fill="currentColor"
        />
        <path d="M15 12L9 8V16L15 12Z" fill="black" />
        <path
          d="M22.71 18.43C22.74 18.14 22.75 17.85 22.72 17.57L23.79 16.72C23.89 16.64 23.91 16.51 23.85 16.4L22.82 14.61C22.76 14.5 22.63 14.46 22.51 14.5L21.23 15C21 14.83 20.75 14.69 20.48 14.58L20.28 13.22C20.26 13.09 20.16 13 20.03 13H17.96C17.84 13 17.73 13.09 17.71 13.21L17.51 14.57C17.25 14.68 17 14.83 16.77 14.99L15.49 14.49C15.37 14.44 15.24 14.49 15.18 14.6L14.15 16.39C14.09 16.5 14.11 16.63 14.21 16.71L15.28 17.57C15.25 17.86 15.24 18.15 15.27 18.43L14.2 19.28C14.1 19.36 14.08 19.49 14.14 19.6L15.17 21.39C15.23 21.5 15.36 21.54 15.48 21.5L16.75 21C16.98 21.17 17.23 21.31 17.5 21.42L17.7 22.78C17.72 22.9 17.82 22.99 17.95 22.99H20.02C20.14 22.99 20.25 22.9 20.27 22.78L20.47 21.42C20.73 21.31 20.98 21.16 21.21 21L22.49 21.5C22.61 21.55 22.74 21.5 22.8 21.39L23.83 19.6C23.89 19.49 23.87 19.36 23.77 19.28L22.71 18.43ZM19 19.5C18.17 19.5 17.5 18.83 17.5 18C17.5 17.17 18.17 16.5 19 16.5C19.83 16.5 20.5 17.17 20.5 18C20.5 18.83 19.83 19.5 19 19.5Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
