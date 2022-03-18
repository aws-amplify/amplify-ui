import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconSelectAll } from '@aws-amplify/ui-react';` → `import { MdSelectAll } from 'react-icons/md';`
 */
export const IconSelectAll = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconSelectAll } from '@aws-amplify/ui-react'; → import { MdSelectAll } from 'react-icons/md';`,
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
          d="M3 5H5V3C3.9 3 3 3.9 3 5ZM3 13H5V11H3V13ZM7 21H9V19H7V21ZM3 9H5V7H3V9ZM13 3H11V5H13V3ZM19 3V5H21C21 3.9 20.1 3 19 3ZM5 21V19H3C3 20.1 3.9 21 5 21ZM3 17H5V15H3V17ZM9 3H7V5H9V3ZM11 21H13V19H11V21ZM19 13H21V11H19V13ZM19 21C20.1 21 21 20.1 21 19H19V21ZM19 9H21V7H19V9ZM19 17H21V15H19V17ZM15 21H17V19H15V21ZM15 5H17V3H15V5ZM7 17H17V7H7V17ZM9 9H15V15H9V9Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
