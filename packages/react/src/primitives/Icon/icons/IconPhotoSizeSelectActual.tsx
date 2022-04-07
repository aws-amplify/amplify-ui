import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconPhotoSizeSelectActual } from '@aws-amplify/ui-react';` → `import { MdPhotoSizeSelectActual } from 'react-icons/md';`
 */
export const IconPhotoSizeSelectActual = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconPhotoSizeSelectActual } from '@aws-amplify/ui-react'; → import { MdPhotoSizeSelectActual } from 'react-icons/md';`,
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
          d="M21 3H3C2 3 1 4 1 5V19C1 20.1 1.9 21 3 21H21C22 21 23 20 23 19V5C23 4 22 3 21 3ZM21 18.92C20.98 18.95 20.94 18.98 20.92 19H3V5.08L3.08 5H20.91C20.94 5.02 20.97 5.06 20.99 5.08V18.92H21ZM11 15.51L8.5 12.5L5 17H19L14.5 11L11 15.51Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
