import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconLaptopMac } from '@aws-amplify/ui-react';` → `import { MdLaptopMac } from 'react-icons/md';`
 */
export const IconLaptopMac = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconLaptopMac } from '@aws-amplify/ui-react'; → import { MdLaptopMac } from 'react-icons/md';`,
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
          d="M20 18C21.1 18 21.99 17.1 21.99 16L22 5C22 3.9 21.1 3 20 3H4C2.9 3 2 3.9 2 5V16C2 17.1 2.9 18 4 18H0C0 19.1 0.9 20 2 20H22C23.1 20 24 19.1 24 18H20ZM4 5H20V16H4V5ZM12 19C11.45 19 11 18.55 11 18C11 17.45 11.45 17 12 17C12.55 17 13 17.45 13 18C13 18.55 12.55 19 12 19Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
