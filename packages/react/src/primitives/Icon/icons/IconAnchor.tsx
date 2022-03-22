import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconAnchor } from '@aws-amplify/ui-react';` → `import { MdAnchor } from 'react-icons/md';`
 */
export const IconAnchor = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconAnchor } from '@aws-amplify/ui-react'; → import { MdAnchor } from 'react-icons/md';`,
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
          d="M17 15L18.55 16.55C17.59 18.24 15.22 19.59 13 19.92V11H16V9H13V7.82C14.16 7.4 15 6.3 15 5C15 3.35 13.65 2 12 2C10.35 2 9 3.35 9 5C9 6.3 9.84 7.4 11 7.82V9H8V11H11V19.92C8.78 19.59 6.41 18.24 5.45 16.55L7 15L3 12V15C3 18.88 7.92 22 12 22C16.08 22 21 18.88 21 15V12L17 15ZM12 4C12.55 4 13 4.45 13 5C13 5.55 12.55 6 12 6C11.45 6 11 5.55 11 5C11 4.45 11.45 4 12 4Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
