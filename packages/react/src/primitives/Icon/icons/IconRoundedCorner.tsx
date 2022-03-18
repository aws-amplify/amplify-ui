import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconRoundedCorner } from '@aws-amplify/ui-react';` → `import { MdRoundedCorner } from 'react-icons/md';`
 */
export const IconRoundedCorner = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconRoundedCorner } from '@aws-amplify/ui-react'; → import { MdRoundedCorner } from 'react-icons/md';`,
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
          d="M19 19H21V21H19V19ZM19 17H21V15H19V17ZM3 13H5V11H3V13ZM3 17H5V15H3V17ZM3 9H5V7H3V9ZM3 5H5V3H3V5ZM7 5H9V3H7V5ZM15 21H17V19H15V21ZM11 21H13V19H11V21ZM15 21H17V19H15V21ZM7 21H9V19H7V21ZM3 21H5V19H3V21ZM21 8C21 5.24 18.76 3 16 3H11V5H16C17.65 5 19 6.35 19 8V13H21V8Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
