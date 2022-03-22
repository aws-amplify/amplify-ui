import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconFastForward } from '@aws-amplify/ui-react';` → `import { MdFastForward } from 'react-icons/md';`
 */
export const IconFastForward = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconFastForward } from '@aws-amplify/ui-react'; → import { MdFastForward } from 'react-icons/md';`,
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
          d="M15 9.86L18.03 12L15 14.14V9.86ZM6 9.86L9.03 12L6 14.14V9.86ZM13 6V18L21.5 12L13 6ZM4 6V18L12.5 12L4 6Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
