import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconReplay_5 } from '@aws-amplify/ui-react';` → `import { MdReplay_5 } from 'react-icons/md';`
 */
export const IconReplay_5 = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconReplay_5 } from '@aws-amplify/ui-react'; → import { MdReplay_5 } from 'react-icons/md';`,
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
          d="M12 5V1L7 6L12 11V7C15.31 7 18 9.69 18 13C18 16.31 15.31 19 12 19C8.69 19 6 16.31 6 13H4C4 17.42 7.58 21 12 21C16.42 21 20 17.42 20 13C20 8.58 16.42 5 12 5ZM10.69 13.9L10.94 11.73H13.33V12.44H11.63L11.52 13.36C11.55 13.34 11.59 13.33 11.63 13.31C11.67 13.29 11.72 13.27 11.78 13.26C11.84 13.25 11.9 13.23 11.96 13.22C12.02 13.21 12.09 13.2 12.16 13.2C12.37 13.2 12.55 13.23 12.71 13.3C12.87 13.37 13.01 13.46 13.12 13.58C13.23 13.7 13.32 13.85 13.37 14.03C13.42 14.21 13.46 14.41 13.46 14.63C13.46 14.82 13.43 15 13.37 15.17C13.31 15.34 13.22 15.49 13.1 15.62C12.98 15.75 12.83 15.86 12.65 15.93C12.47 16 12.26 16.05 12.01 16.05C11.83 16.05 11.65 16.02 11.48 15.97C11.31 15.92 11.16 15.83 11.02 15.73C10.88 15.63 10.78 15.49 10.7 15.34C10.62 15.19 10.57 15.01 10.57 14.81H11.41C11.43 14.99 11.49 15.13 11.6 15.22C11.71 15.31 11.85 15.37 12.02 15.37C12.13 15.37 12.22 15.35 12.29 15.31C12.36 15.27 12.43 15.21 12.47 15.14C12.51 15.07 12.55 14.99 12.58 14.89C12.61 14.79 12.61 14.69 12.61 14.58C12.61 14.47 12.6 14.37 12.57 14.27C12.54 14.17 12.5 14.1 12.44 14.03C12.38 13.96 12.31 13.91 12.23 13.88C12.15 13.85 12.04 13.83 11.93 13.83C11.85 13.83 11.78 13.84 11.73 13.85C11.68 13.86 11.62 13.88 11.58 13.9C11.54 13.92 11.5 13.95 11.46 13.97C11.42 13.99 11.39 14.03 11.36 14.06L10.69 13.9V13.9Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
