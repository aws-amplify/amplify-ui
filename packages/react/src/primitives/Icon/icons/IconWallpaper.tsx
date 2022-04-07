import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconWallpaper } from '@aws-amplify/ui-react';` → `import { MdWallpaper } from 'react-icons/md';`
 */
export const IconWallpaper = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconWallpaper } from '@aws-amplify/ui-react'; → import { MdWallpaper } from 'react-icons/md';`,
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
          d="M4 4H11V2H4C2.9 2 2 2.9 2 4V11H4V4ZM10 13L6 18H18L15 14L12.97 16.71L10 13ZM17 8.5C17 7.67 16.33 7 15.5 7C14.67 7 14 7.67 14 8.5C14 9.33 14.67 10 15.5 10C16.33 10 17 9.33 17 8.5ZM20 2H13V4H20V11H22V4C22 2.9 21.1 2 20 2ZM20 20H13V22H20C21.1 22 22 21.1 22 20V13H20V20ZM4 13H2V20C2 21.1 2.9 22 4 22H11V20H4V13Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
