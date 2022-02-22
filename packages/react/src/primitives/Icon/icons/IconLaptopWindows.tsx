import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconLaptopWindows } from '@aws-amplify/ui-react';` → `import { MdLaptopWindows } from 'react-icons/md';`
 */
export const IconLaptopWindows = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconLaptopWindows } from '@aws-amplify/ui-react'; → import { MdLaptopWindows } from 'react-icons/md';`,
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
          d="M20 18V17C21.1 17 21.99 16.1 21.99 15L22 5C22 3.9 21.1 3 20 3H4C2.9 3 2 3.9 2 5V15C2 16.1 2.9 17 4 17V18H0V20H24V18H20ZM4 5H20V15H4V5Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
