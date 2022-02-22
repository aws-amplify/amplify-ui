import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconAddToQueue } from '@aws-amplify/ui-react';` → `import { MdAddToQueue } from 'react-icons/md';`
 */
export const IconAddToQueue = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconAddToQueue } from '@aws-amplify/ui-react'; → import { MdAddToQueue } from 'react-icons/md';`,
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
          d="M11 15H13V12H16V10H13V7H11V10H8V12H11V15ZM21 3H3C1.89 3 1 3.89 1 5V17C1 18.1 1.89 19 3 19H8V21H16V19H21C22.1 19 23 18.1 23 17V5C23 3.89 22.1 3 21 3ZM21 17H3V5H21V17Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
