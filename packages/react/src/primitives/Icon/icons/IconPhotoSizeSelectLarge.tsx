import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconPhotoSizeSelectLarge } from '@aws-amplify/ui-react';` → `import { MdPhotoSizeSelectLarge } from 'react-icons/md';`
 */
export const IconPhotoSizeSelectLarge = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconPhotoSizeSelectLarge } from '@aws-amplify/ui-react'; → import { MdPhotoSizeSelectLarge } from 'react-icons/md';`,
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
          d="M21 15H23V17H21V15ZM21 11H23V13H21V11ZM23 19H21V21C22 21 23 20 23 19ZM13 3H15V5H13V3ZM21 7H23V9H21V7ZM21 3V5H23C23 4 22 3 21 3ZM1 7H3V9H1V7ZM17 3H19V5H17V3ZM17 19H19V21H17V19ZM3 3C2 3 1 4 1 5H3V3ZM9 3H11V5H9V3ZM5 3H7V5H5V3ZM1 11V19C1 20.1 1.9 21 3 21H15V11H1ZM3 19L5.5 15.79L7.29 17.94L9.79 14.72L13 19H3Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
