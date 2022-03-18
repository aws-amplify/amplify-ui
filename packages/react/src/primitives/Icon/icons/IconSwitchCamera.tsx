import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconSwitchCamera } from '@aws-amplify/ui-react';` → `import { MdSwitchCamera } from 'react-icons/md';`
 */
export const IconSwitchCamera = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconSwitchCamera } from '@aws-amplify/ui-react'; → import { MdSwitchCamera } from 'react-icons/md';`,
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
          d="M20 4H16.83L15 2H9L7.17 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM9.88 4H14.12L15.95 6H20V18H4V6H8.05"
          fill="currentColor"
        />
        <path
          d="M15 11H9V8.5L5.5 12L9 15.5V13H15V15.5L18.5 12L15 8.5V11Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
