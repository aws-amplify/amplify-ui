import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconHdrWeak } from '@aws-amplify/ui-react';` → `import { MdHdrWeak } from 'react-icons/md';`
 */
export const IconHdrWeak = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconHdrWeak } from '@aws-amplify/ui-react'; → import { MdHdrWeak } from 'react-icons/md';`,
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
          d="M5 8C2.79 8 1 9.79 1 12C1 14.21 2.79 16 5 16C7.21 16 9 14.21 9 12C9 9.79 7.21 8 5 8ZM17 6C13.69 6 11 8.69 11 12C11 15.31 13.69 18 17 18C20.31 18 23 15.31 23 12C23 8.69 20.31 6 17 6ZM17 16C14.79 16 13 14.21 13 12C13 9.79 14.79 8 17 8C19.21 8 21 9.79 21 12C21 14.21 19.21 16 17 16Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
