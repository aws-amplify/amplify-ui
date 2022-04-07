import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconCoronavirus } from '@aws-amplify/ui-react';` → `import { MdCoronavirus } from 'react-icons/md';`
 */
export const IconCoronavirus = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconCoronavirus } from '@aws-amplify/ui-react'; → import { MdCoronavirus } from 'react-icons/md';`,
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
          d="M9.5 12C9.5 12.55 9.05 13 8.5 13C7.95 13 7.5 12.55 7.5 12C7.5 11.45 7.95 11 8.5 11C9.05 11 9.5 11.45 9.5 12ZM13.75 10C14.3 10 14.75 9.55 14.75 9C14.75 8.45 14.3 8 13.75 8C13.2 8 12.75 8.45 12.75 9C12.75 9.55 13.2 10 13.75 10ZM10.25 10C10.8 10 11.25 9.55 11.25 9C11.25 8.45 10.8 8 10.25 8C9.7 8 9.25 8.45 9.25 9C9.25 9.55 9.7 10 10.25 10ZM10.25 14C9.7 14 9.25 14.45 9.25 15C9.25 15.55 9.7 16 10.25 16C10.8 16 11.25 15.55 11.25 15C11.25 14.45 10.8 14 10.25 14ZM22 11.25V12.75C22 13.16 21.66 13.5 21.25 13.5C20.84 13.5 20.5 13.16 20.5 12.75H18.96C18.81 14.12 18.27 15.38 17.44 16.4L18.53 17.49L18.54 17.48C18.83 17.19 19.31 17.19 19.6 17.48C19.89 17.77 19.89 18.25 19.6 18.54L18.54 19.6C18.25 19.89 17.77 19.89 17.48 19.6C17.19 19.31 17.19 18.84 17.47 18.55L16.38 17.46C15.36 18.28 14.11 18.82 12.74 18.97V20.51H12.75C13.16 20.51 13.5 20.85 13.5 21.26C13.5 21.67 13.16 22.01 12.75 22.01H11.25C10.84 22.01 10.5 21.67 10.5 21.26C10.5 20.85 10.83 20.52 11.24 20.51V18.96C9.87 18.81 8.62 18.27 7.61 17.45L6.52 18.54L6.53 18.55C6.82 18.84 6.82 19.32 6.53 19.61C6.24 19.9 5.76 19.9 5.47 19.61L4.4 18.54C4.11 18.25 4.11 17.77 4.4 17.48C4.69 17.19 5.16 17.19 5.45 17.47L6.54 16.38C5.72 15.36 5.18 14.12 5.04 12.75H3.5C3.5 13.16 3.16 13.5 2.75 13.5C2.34 13.5 2 13.16 2 12.75V11.25C2 10.84 2.34 10.5 2.75 10.5C3.16 10.5 3.5 10.84 3.5 11.25H5.04C5.19 9.88 5.73 8.64 6.54 7.62L5.45 6.53C5.16 6.81 4.69 6.81 4.4 6.52C4.11 6.23 4.11 5.75 4.4 5.46L5.46 4.4C5.75 4.11 6.23 4.11 6.52 4.4C6.81 4.69 6.81 5.17 6.52 5.46L6.51 5.47L7.6 6.56C8.62 5.74 9.86 5.2 11.23 5.05V3.5C10.82 3.49 10.49 3.16 10.49 2.75C10.5 2.34 10.84 2 11.25 2H12.75C13.16 2 13.5 2.34 13.5 2.75C13.5 3.16 13.16 3.5 12.75 3.5H12.74V5.04C14.11 5.18 15.36 5.73 16.38 6.55L17.47 5.46C17.18 5.17 17.19 4.7 17.48 4.41C17.77 4.12 18.25 4.12 18.54 4.41L19.6 5.47C19.89 5.76 19.89 6.24 19.6 6.53C19.31 6.82 18.83 6.82 18.54 6.53L18.53 6.52L17.44 7.6C18.26 8.62 18.81 9.87 18.96 11.25H20.5C20.5 10.84 20.84 10.5 21.25 10.5C21.66 10.5 22 10.84 22 11.25ZM17 12C17 9.24 14.76 7 12 7C9.24 7 7 9.24 7 12C7 14.76 9.24 17 12 17C14.76 17 17 14.76 17 12ZM12 11C11.45 11 11 11.45 11 12C11 12.55 11.45 13 12 13C12.55 13 13 12.55 13 12C13 11.45 12.55 11 12 11ZM15.5 11C14.95 11 14.5 11.45 14.5 12C14.5 12.55 14.95 13 15.5 13C16.05 13 16.5 12.55 16.5 12C16.5 11.45 16.05 11 15.5 11ZM13.75 14C13.2 14 12.75 14.45 12.75 15C12.75 15.55 13.2 16 13.75 16C14.3 16 14.75 15.55 14.75 15C14.75 14.45 14.3 14 13.75 14Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
