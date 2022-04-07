import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconFiberPin } from '@aws-amplify/ui-react';` → `import { MdFiberPin } from 'react-icons/md';`
 */
export const IconFiberPin = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconFiberPin } from '@aws-amplify/ui-react'; → import { MdFiberPin } from 'react-icons/md';`,
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
          d="M11 15H12.5V9H11V15ZM18.75 9V12.5L16.25 9H15V15H16.25V11.5L18.8 15H20V9H18.75ZM7.5 9H4V15H5.5V13H7.5C8.35 13 9 12.35 9 11.5V10.5C9 9.65 8.35 9 7.5 9ZM7.5 11.5H5.5V10.5H7.5V11.5Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
