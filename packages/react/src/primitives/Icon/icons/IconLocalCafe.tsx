import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconLocalCafe } from '@aws-amplify/ui-react';` → `import { MdLocalCafe } from 'react-icons/md';`
 */
export const IconLocalCafe = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconLocalCafe } from '@aws-amplify/ui-react'; → import { MdLocalCafe } from 'react-icons/md';`,
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
          d="M16 5V13C16 14.1 15.1 15 14 15H8C6.9 15 6 14.1 6 13V5H16ZM20 3H4V13C4 15.21 5.79 17 8 17H14C16.21 17 18 15.21 18 13V10H20C21.11 10 22 9.11 22 8V5C22 3.89 21.11 3 20 3ZM18 8V5H20V8H18ZM20 19H2V21H20V19Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
