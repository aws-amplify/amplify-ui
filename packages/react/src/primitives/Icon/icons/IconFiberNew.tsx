import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconFiberNew } from '@aws-amplify/ui-react';` → `import { MdFiberNew } from 'react-icons/md';`
 */
export const IconFiberNew = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconFiberNew } from '@aws-amplify/ui-react'; → import { MdFiberNew } from 'react-icons/md';`,
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
          d="M7.25 12.5L4.75 9H3.5V15H4.75V11.5L7.3 15H8.5V9H7.25V12.5ZM9.5 15H13.5V13.75H11V12.64H13.5V11.38H11V10.26H13.5V9H9.5V15ZM19.25 9V13.5H18.13V9.99H16.88V13.51H15.75V9H14.5V14C14.5 14.55 14.95 15 15.5 15H19.5C20.05 15 20.5 14.55 20.5 14V9H19.25Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
