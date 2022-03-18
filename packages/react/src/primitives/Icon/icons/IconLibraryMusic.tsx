import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconLibraryMusic } from '@aws-amplify/ui-react';` → `import { MdLibraryMusic } from 'react-icons/md';`
 */
export const IconLibraryMusic = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconLibraryMusic } from '@aws-amplify/ui-react'; → import { MdLibraryMusic } from 'react-icons/md';`,
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
          d="M20 2H8C6.9 2 6 2.9 6 4V16C6 17.1 6.9 18 8 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H8V4H20V16ZM12.5 15C13.88 15 15 13.88 15 12.5V7H18V5H14V10.51C13.58 10.19 13.07 10 12.5 10C11.12 10 10 11.12 10 12.5C10 13.88 11.12 15 12.5 15ZM4 6H2V20C2 21.1 2.9 22 4 22H18V20H4V6Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
