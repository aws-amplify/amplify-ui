import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconSettingsSystemDaydream } from '@aws-amplify/ui-react';` → `import { MdSettingsSystemDaydream } from 'react-icons/md';`
 */
export const IconSettingsSystemDaydream = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconSettingsSystemDaydream } from '@aws-amplify/ui-react'; → import { MdSettingsSystemDaydream } from 'react-icons/md';`,
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
          d="M15.5 17H9C6.79 17 5 15.21 5 13C5 11.07 6.36 9.44 8.22 9.08C9.04 7.8 10.47 7 12 7C13.95 7 15.66 8.28 16.26 10.09C17.84 10.45 19 11.84 19 13.5C19 15.43 17.43 17 15.5 17ZM8.74 11.02C7.74 11.15 7 11.99 7 13C7 14.1 7.9 15 9 15H15.5C16.33 15 17 14.33 17 13.5C17 12.67 16.33 12 15.5 12H14.63L14.46 11.14C14.29 9.92 13.23 9 12 9C11.04 9 10.16 9.57 9.74 10.45L9.47 11.02H8.74ZM21 3H3C1.9 3 1 3.9 1 5V19C1 20.1 1.9 21 3 21H21C22.1 21 23 20.1 23 19V5C23 3.9 22.1 3 21 3ZM21 19.01H3V4.99H21V19.01V19.01Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
