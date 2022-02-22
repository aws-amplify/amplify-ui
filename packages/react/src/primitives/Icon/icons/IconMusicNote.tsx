import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconMusicNote } from '@aws-amplify/ui-react';` → `import { MdMusicNote } from 'react-icons/md';`
 */
export const IconMusicNote = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconMusicNote } from '@aws-amplify/ui-react'; → import { MdMusicNote } from 'react-icons/md';`,
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
          d="M12 3L12.01 13.55C11.42 13.21 10.74 13 10.01 13C7.79 13 6 14.79 6 17C6 19.21 7.79 21 10.01 21C12.23 21 14 19.21 14 17V7H18V3H12ZM10.01 19C8.91 19 8.01 18.1 8.01 17C8.01 15.9 8.91 15 10.01 15C11.11 15 12.01 15.9 12.01 17C12.01 18.1 11.11 19 10.01 19Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
