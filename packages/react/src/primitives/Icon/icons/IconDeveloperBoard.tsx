import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconDeveloperBoard } from '@aws-amplify/ui-react';` → `import { MdDeveloperBoard } from 'react-icons/md';`
 */
export const IconDeveloperBoard = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconDeveloperBoard } from '@aws-amplify/ui-react'; → import { MdDeveloperBoard } from 'react-icons/md';`,
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
          d="M22 9V7H20V5C20 3.9 19.1 3 18 3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H18C19.1 21 20 20.1 20 19V17H22V15H20V13H22V11H20V9H22ZM18 19H4V5H18V19ZM6 13H11V17H6V13ZM12 7H16V10H12V7ZM6 7H11V12H6V7ZM12 11H16V17H12V11Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
