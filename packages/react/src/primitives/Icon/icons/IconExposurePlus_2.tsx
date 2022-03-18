import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconExposurePlus_2 } from '@aws-amplify/ui-react';` → `import { MdExposurePlus_2 } from 'react-icons/md';`
 */
export const IconExposurePlus_2 = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconExposurePlus_2 } from '@aws-amplify/ui-react'; → import { MdExposurePlus_2 } from 'react-icons/md';`,
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
          d="M16.05 16.29L18.91 13.22C19.29 12.83 19.63 12.43 19.95 12.04C20.27 11.65 20.54 11.26 20.77 10.87C21 10.48 21.18 10.09 21.31 9.7C21.44 9.31 21.5 8.91 21.5 8.52C21.5 7.99 21.41 7.5 21.23 7.06C21.05 6.62 20.79 6.25 20.45 5.95C20.11 5.64 19.68 5.41 19.19 5.24C18.68 5.08 18.11 5 17.47 5C16.78 5 16.16 5.11 15.62 5.32C15.08 5.53 14.62 5.83 14.26 6.2C13.89 6.57 13.61 7 13.42 7.5C13.24 7.97 13.15 8.47 13.14 9H15.28C15.29 8.69 15.33 8.4 15.41 8.13C15.5 7.84 15.64 7.59 15.81 7.38C15.99 7.17 16.22 7.01 16.49 6.89C16.76 6.77 17.09 6.71 17.45 6.71C17.76 6.71 18.03 6.76 18.26 6.86C18.49 6.96 18.69 7.11 18.85 7.29C19.01 7.47 19.13 7.69 19.22 7.94C19.3 8.19 19.35 8.46 19.35 8.75C19.35 8.97 19.32 9.18 19.27 9.4C19.21 9.62 19.12 9.85 18.98 10.1C18.84 10.35 18.66 10.63 18.42 10.93C18.19 11.23 17.9 11.58 17.54 11.96L13.37 16.51V18H22V16.29H16.05ZM8 7H6V11H2V13H6V17H8V13H12V11H8V7Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
