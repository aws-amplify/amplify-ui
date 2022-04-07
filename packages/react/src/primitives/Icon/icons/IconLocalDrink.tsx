import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconLocalDrink } from '@aws-amplify/ui-react';` → `import { MdLocalDrink } from 'react-icons/md';`
 */
export const IconLocalDrink = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconLocalDrink } from '@aws-amplify/ui-react'; → import { MdLocalDrink } from 'react-icons/md';`,
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
          d="M3 2L5.01 20.23C5.13 21.23 5.97 22 7 22H17C18.03 22 18.87 21.23 18.99 20.23L21 2H3ZM17 20L7 20.01L5.89 10H18.1L17 20ZM18.33 8H5.67L5.23 4H18.76L18.33 8ZM12 19C13.66 19 15 17.66 15 16C15 14 12 10.6 12 10.6C12 10.6 9 14 9 16C9 17.66 10.34 19 12 19ZM12 13.91C12.59 14.82 13 15.64 13 16C13 16.55 12.55 17 12 17C11.45 17 11 16.55 11 16C11 15.63 11.41 14.81 12 13.91Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
