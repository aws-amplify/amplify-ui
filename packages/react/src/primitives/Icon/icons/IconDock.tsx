import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconDock } from '@aws-amplify/ui-react';` → `import { MdDock } from 'react-icons/md';`
 */
export const IconDock = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconDock } from '@aws-amplify/ui-react'; → import { MdDock } from 'react-icons/md';`,
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
          d="M8 23H16V21H8V23ZM16 1.01L8 1C6.9 1 6 1.9 6 3V17C6 18.1 6.9 19 8 19H16C17.1 19 18 18.1 18 17V3C18 1.9 17.1 1.01 16 1.01V1.01ZM16 15H8V5H16V15Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
