import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconShop } from '@aws-amplify/ui-react';` → `import { MdShop } from 'react-icons/md';`
 */
export const IconShop = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconShop } from '@aws-amplify/ui-react'; → import { MdShop } from 'react-icons/md';`,
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
          d="M16 6V4C16 2.89 15.11 2 14 2H10C8.89 2 8 2.89 8 4V6H2V19C2 20.11 2.89 21 4 21H20C21.11 21 22 20.11 22 19V6H16ZM10 4H14V6H10V4ZM20 19H4V8H20V19ZM9 18L16.5 13L9 9V18Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
