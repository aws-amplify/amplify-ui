import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconChromeReaderMode } from '@aws-amplify/ui-react';` → `import { MdChromeReaderMode } from 'react-icons/md';`
 */
export const IconChromeReaderMode = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconChromeReaderMode } from '@aws-amplify/ui-react'; → import { MdChromeReaderMode } from 'react-icons/md';`,
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
          d="M21 4H3C1.9 4 1 4.9 1 6V19C1 20.1 1.9 21 3 21H21C22.1 21 23 20.1 23 19V6C23 4.9 22.1 4 21 4ZM3 19V6H11V19H3ZM21 19H13V6H21V19ZM14 9.5H20V11H14V9.5ZM14 12H20V13.5H14V12ZM14 14.5H20V16H14V14.5Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
