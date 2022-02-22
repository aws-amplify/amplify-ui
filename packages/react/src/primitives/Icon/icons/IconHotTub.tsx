import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconHotTub } from '@aws-amplify/ui-react';` → `import { MdHotTub } from 'react-icons/md';`
 */
export const IconHotTub = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconHotTub } from '@aws-amplify/ui-react'; → import { MdHotTub } from 'react-icons/md';`,
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
          d="M7 8C8.10457 8 9 7.10457 9 6C9 4.89543 8.10457 4 7 4C5.89543 4 5 4.89543 5 6C5 7.10457 5.89543 8 7 8Z"
          fill="currentColor"
        />
        <path
          d="M11.15 12C10.84 11.78 10.56 11.54 10.33 11.28L8.93 9.73C8.74 9.52 8.5 9.35 8.24 9.23C7.95 9.09 7.62 9 7.28 9H7.25C6.01 9 5 10.01 5 11.25V12H2V20C2 21.1 2.9 22 4 22H20C21.1 22 22 21.1 22 20V12H11.15ZM7 20H5V14H7V20ZM11 20H9V14H11V20ZM15 20H13V14H15V20ZM19 20H17V14H19V20ZM17.42 7.21C17.99 7.83 18.24 8.62 18.09 9.41L17.98 10H19.89L19.95 9.57C20.16 8.21 19.68 6.86 18.65 5.86L18.58 5.79C18.01 5.17 17.76 4.38 17.91 3.59L18 3H16.11L16.05 3.43C15.85 4.79 16.32 6.14 17.35 7.15L17.42 7.21ZM13.42 7.21C13.99 7.83 14.24 8.62 14.09 9.41L13.98 10H15.89L15.95 9.57C16.16 8.21 15.68 6.86 14.65 5.86L14.58 5.79C14.01 5.17 13.76 4.38 13.91 3.59L14 3H12.11L12.05 3.43C11.85 4.79 12.32 6.14 13.35 7.15L13.42 7.21V7.21Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
