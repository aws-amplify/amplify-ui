import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconBookmarks } from '@aws-amplify/ui-react';` → `import { MdBookmarks } from 'react-icons/md';`
 */
export const IconBookmarks = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconBookmarks } from '@aws-amplify/ui-react'; → import { MdBookmarks } from 'react-icons/md';`,
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
          d="M15 7V19.97L10.79 18.16L10 17.82L9.21 18.16L5 19.97V7H15ZM19 1H8.99C7.89 1 7 1.9 7 3H17C18.1 3 19 3.9 19 5V18L21 19V3C21 1.9 20.1 1 19 1ZM15 5H5C3.9 5 3 5.9 3 7V23L10 20L17 23V7C17 5.9 16.1 5 15 5Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
