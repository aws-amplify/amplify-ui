import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconFoundation } from '@aws-amplify/ui-react';` → `import { MdFoundation } from 'react-icons/md';`
 */
export const IconFoundation = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconFoundation } from '@aws-amplify/ui-react'; → import { MdFoundation } from 'react-icons/md';`,
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
          d="M19 12H22L12 3L2 12H5V15H3V17H5V20H7V17H11V20H13V17H17V20H19V17H21V15H19V12ZM7 15V10.19L11 6.59V15H7ZM13 15V6.59L17 10.19V15H13Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
