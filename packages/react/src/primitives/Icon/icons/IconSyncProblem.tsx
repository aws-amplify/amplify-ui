import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconSyncProblem } from '@aws-amplify/ui-react';` → `import { MdSyncProblem } from 'react-icons/md';`
 */
export const IconSyncProblem = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconSyncProblem } from '@aws-amplify/ui-react'; → import { MdSyncProblem } from 'react-icons/md';`,
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
          d="M3 12C3 14.21 3.91 16.2 5.36 17.64L3 20H9V14L6.76 16.24C5.68 15.15 5 13.66 5 12C5 9.39 6.67 7.17 9 6.35V4.26C5.55 5.15 3 8.27 3 12ZM11 17H13V15H11V17ZM21 4H15V10L17.24 7.76C18.32 8.85 19 10.34 19 12C19 14.61 17.33 16.83 15 17.65V19.74C18.45 18.85 21 15.73 21 12C21 9.79 20.09 7.8 18.64 6.36L21 4ZM11 13H13V7H11V13Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
