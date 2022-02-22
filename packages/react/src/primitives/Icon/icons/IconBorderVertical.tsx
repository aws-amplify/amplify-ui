import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconBorderVertical } from '@aws-amplify/ui-react';` → `import { MdBorderVertical } from 'react-icons/md';`
 */
export const IconBorderVertical = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconBorderVertical } from '@aws-amplify/ui-react'; → import { MdBorderVertical } from 'react-icons/md';`,
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
          d="M3 9H5V7H3V9ZM3 5H5V3H3V5ZM7 21H9V19H7V21ZM7 13H9V11H7V13ZM3 13H5V11H3V13ZM3 21H5V19H3V21ZM3 17H5V15H3V17ZM7 5H9V3H7V5ZM19 17H21V15H19V17ZM11 21H13V3H11V21ZM19 21H21V19H19V21ZM19 13H21V11H19V13ZM19 3V5H21V3H19ZM19 9H21V7H19V9ZM15 5H17V3H15V5ZM15 21H17V19H15V21ZM15 13H17V11H15V13Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
