import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconExposureNeg_2 } from '@aws-amplify/ui-react';` → `import { MdExposureNeg_2 } from 'react-icons/md';`
 */
export const IconExposureNeg_2 = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconExposureNeg_2 } from '@aws-amplify/ui-react'; → import { MdExposureNeg_2 } from 'react-icons/md';`,
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
          d="M15.05 16.29L17.91 13.22C18.29 12.83 18.63 12.43 18.95 12.04C19.27 11.65 19.54 11.26 19.77 10.87C20 10.48 20.18 10.09 20.31 9.7C20.44 9.31 20.5 8.91 20.5 8.52C20.5 7.99 20.41 7.5 20.23 7.06C20.05 6.62 19.79 6.25 19.45 5.95C19.11 5.64 18.68 5.41 18.19 5.24C17.68 5.08 17.11 5 16.47 5C15.78 5 15.16 5.11 14.62 5.32C14.08 5.53 13.62 5.83 13.26 6.2C12.89 6.57 12.61 7 12.42 7.5C12.24 7.97 12.15 8.47 12.14 9H14.28C14.29 8.69 14.33 8.4 14.41 8.13C14.5 7.84 14.64 7.59 14.81 7.38C14.99 7.17 15.22 7.01 15.49 6.89C15.76 6.77 16.09 6.71 16.45 6.71C16.76 6.71 17.03 6.76 17.26 6.86C17.49 6.96 17.69 7.11 17.85 7.29C18.01 7.47 18.13 7.69 18.22 7.94C18.3 8.19 18.35 8.46 18.35 8.75C18.35 8.97 18.32 9.18 18.27 9.4C18.21 9.62 18.12 9.85 17.98 10.1C17.84 10.35 17.66 10.63 17.42 10.93C17.19 11.23 16.9 11.58 16.54 11.96L12.37 16.51V18H21V16.29H15.05ZM2 11V13H10V11H2Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
