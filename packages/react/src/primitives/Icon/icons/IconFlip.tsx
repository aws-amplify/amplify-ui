import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconFlip } from '@aws-amplify/ui-react';` → `import { MdFlip } from 'react-icons/md';`
 */
export const IconFlip = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconFlip } from '@aws-amplify/ui-react'; → import { MdFlip } from 'react-icons/md';`,
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
          d="M15 21H17V19H15V21ZM19 9H21V7H19V9ZM3 5V19C3 20.1 3.9 21 5 21H9V19H5V5H9V3H5C3.9 3 3 3.9 3 5ZM19 3V5H21C21 3.9 20.1 3 19 3ZM11 23H13V1H11V23ZM19 17H21V15H19V17ZM15 5H17V3H15V5ZM19 13H21V11H19V13ZM19 21C20.1 21 21 20.1 21 19H19V21Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
