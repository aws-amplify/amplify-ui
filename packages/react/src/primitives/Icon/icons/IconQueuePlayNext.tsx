import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconQueuePlayNext } from '@aws-amplify/ui-react';` → `import { MdQueuePlayNext } from 'react-icons/md';`
 */
export const IconQueuePlayNext = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconQueuePlayNext } from '@aws-amplify/ui-react'; → import { MdQueuePlayNext } from 'react-icons/md';`,
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
          d="M21 3H3C1.89 3 1 3.89 1 5V17C1 18.1 1.89 19 3 19H8V21H16V19H18V17H3V5H21V13H23V5C23 3.89 22.1 3 21 3ZM13 10V7H11V10H8V12H11V15H13V12H16V10H13ZM24 18L19.5 22.5L18 21L21 18L18 15L19.5 13.5L24 18Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
