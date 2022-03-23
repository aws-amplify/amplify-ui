import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconAppSettingsAlt } from '@aws-amplify/ui-react';` → `import { MdAppSettingsAlt } from 'react-icons/md';`
 */
export const IconAppSettingsAlt = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconAppSettingsAlt } from '@aws-amplify/ui-react'; → import { MdAppSettingsAlt } from 'react-icons/md';`,
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
          d="M21.81 12.74L20.99 12.11C20.99 12.02 20.99 11.98 20.99 11.89L21.79 11.26C21.95 11.14 21.99 10.92 21.89 10.75L21.04 9.27C20.97 9.14 20.83 9.07 20.69 9.07C20.64 9.07 20.59 9.08 20.54 9.1L19.59 9.48C19.51 9.43 19.48 9.41 19.4 9.37L19.25 8.36C19.22 8.15 19.05 8 18.85 8H17.14C16.94 8 16.77 8.15 16.74 8.34L16.6 9.35C16.57 9.37 16.53 9.38 16.5 9.4C16.47 9.42 16.44 9.44 16.41 9.46L15.46 9.08C15.41 9.06 15.36 9.05 15.31 9.05C15.17 9.05 15.04 9.12 14.96 9.25L14.11 10.73C14.01 10.9 14.05 11.12 14.21 11.24L15.01 11.87C15.01 11.96 15.01 12 15.01 12.1L14.21 12.73C14.05 12.85 14.01 13.07 14.11 13.24L14.96 14.72C15.03 14.85 15.17 14.92 15.31 14.92C15.36 14.92 15.41 14.91 15.46 14.89L16.41 14.52C16.49 14.57 16.53 14.59 16.61 14.63L16.76 15.64C16.79 15.84 16.96 15.98 17.16 15.98H18.87C19.07 15.98 19.24 15.83 19.27 15.64L19.42 14.63C19.45 14.61 19.49 14.6 19.52 14.58C19.55 14.56 19.58 14.54 19.61 14.52L20.56 14.9C20.61 14.92 20.66 14.93 20.71 14.93C20.85 14.93 20.98 14.86 21.06 14.73L21.91 13.25C22.01 13.08 21.97 12.86 21.81 12.74ZM18 13.5C17.17 13.5 16.5 12.83 16.5 12C16.5 11.17 17.17 10.5 18 10.5C18.83 10.5 19.5 11.17 19.5 12C19.5 12.83 18.83 13.5 18 13.5ZM17 18H7V6H17V7H19V3C19 1.9 18.1 1 17 1H7C5.9 1 5 1.9 5 3V21C5 22.1 5.9 23 7 23H17C18.1 23 19 22.1 19 21V17H17V18ZM7 3H17V4H7V3ZM17 21H7V20H17V21Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
