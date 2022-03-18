import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconScreenLockLandscape } from '@aws-amplify/ui-react';` → `import { MdScreenLockLandscape } from 'react-icons/md';`
 */
export const IconScreenLockLandscape = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconScreenLockLandscape } from '@aws-amplify/ui-react'; → import { MdScreenLockLandscape } from 'react-icons/md';`,
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
          d="M21 5H3C1.9 5 1 5.9 1 7V17C1 18.1 1.9 19 3 19H21C22.1 19 23 18.1 23 17V7C23 5.9 22.1 5 21 5ZM19 17H5V7H19V17ZM10 16H14C14.55 16 15 15.55 15 15V12C15 11.45 14.55 11 14 11V10C14 8.89 13.1 8 12 8C10.89 8 10 8.9 10 10V11C9.45 11 9 11.45 9 12V15C9 15.55 9.45 16 10 16ZM10.8 10C10.8 9.34 11.34 8.8 12 8.8C12.66 8.8 13.2 9.34 13.2 10V11H10.8V10V10Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
