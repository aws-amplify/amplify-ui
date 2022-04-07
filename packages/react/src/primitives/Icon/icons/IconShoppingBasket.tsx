import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconShoppingBasket } from '@aws-amplify/ui-react';` → `import { MdShoppingBasket } from 'react-icons/md';`
 */
export const IconShoppingBasket = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconShoppingBasket } from '@aws-amplify/ui-react'; → import { MdShoppingBasket } from 'react-icons/md';`,
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
          d="M22 9.00002H17.21L12.83 2.44002C12.64 2.16002 12.32 2.02002 12 2.02002C11.68 2.02002 11.36 2.16002 11.17 2.45002L6.79 9.00002H2C1.45 9.00002 1 9.45002 1 10C1 10.09 1.01 10.18 1.04 10.27L3.58 19.54C3.81 20.38 4.58 21 5.5 21H18.5C19.42 21 20.19 20.38 20.43 19.54L22.97 10.27L23 10C23 9.45002 22.55 9.00002 22 9.00002ZM12 4.80002L14.8 9.00002H9.2L12 4.80002ZM18.5 19L5.51 19.01L3.31 11H20.7L18.5 19ZM12 13C10.9 13 10 13.9 10 15C10 16.1 10.9 17 12 17C13.1 17 14 16.1 14 15C14 13.9 13.1 13 12 13Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
