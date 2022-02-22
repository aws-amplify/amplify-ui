import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconSports } from '@aws-amplify/ui-react';` → `import { MdSports } from 'react-icons/md';`
 */
export const IconSports = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconSports } from '@aws-amplify/ui-react'; → import { MdSports } from 'react-icons/md';`,
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
          d="M11.23 6C9.57 6 8.01 6.66 6.87 7.73C6.54 6.73 5.61 6 4.5 6C3.12 6 2 7.12 2 8.5C2 9.88 3.12 11 4.5 11C4.71 11 4.91 10.97 5.11 10.92C5.06 11.17 5.02 11.43 5.01 11.7C4.83 15.38 7.96 18.38 11.69 17.97C14.24 17.69 16.37 15.71 16.88 13.2C17.03 12.49 17.03 11.8 16.94 11.14C16.85 10.54 17.32 10.01 17.93 10.01H22V6H11.23ZM4.5 9C4.22 9 4 8.78 4 8.5C4 8.22 4.22 8 4.5 8C4.78 8 5 8.22 5 8.5C5 8.78 4.78 9 4.5 9ZM11 15C9.34 15 8 13.66 8 12C8 10.34 9.34 9 11 9C12.66 9 14 10.34 14 12C14 13.66 12.66 15 11 15Z"
          fill="currentColor"
        />
        <path
          d="M11 14C12.1046 14 13 13.1046 13 12C13 10.8954 12.1046 10 11 10C9.89543 10 9 10.8954 9 12C9 13.1046 9.89543 14 11 14Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
