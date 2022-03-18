import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconStroller } from '@aws-amplify/ui-react';` → `import { MdStroller } from 'react-icons/md';`
 */
export const IconStroller = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconStroller } from '@aws-amplify/ui-react'; → import { MdStroller } from 'react-icons/md';`,
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
          d="M18 20C18 21.1 17.1 22 16 22C14.9 22 14 21.1 14 20C14 18.9 14.9 18 16 18C17.1 18 18 18.9 18 20ZM6 18C4.9 18 4 18.9 4 20C4 21.1 4.9 22 6 22C7.1 22 8 21.1 8 20C8 18.9 7.1 18 6 18ZM15 8.66L9.6 15H15V8.66ZM18.65 3C20.52 3 22 4.56 22 6.48V7H20V6.48C20 5.66 19.42 5 18.65 5C17.97 5 17.58 5.59 17 6.27V15C17 16.1 16.1 17 15 17H7.43C6.58 17 6.12 16 6.67 15.35L15.47 5.03C16.11 4.27 16.99 3 18.65 3ZM10 5C9.35 5 8.71 5.09 8.09 5.27L9.49 6.67L10.86 5.06C10.58 5.02 10.29 5 10 5ZM10 3C11.56 3 13.03 3.4 14.3 4.1L9.6 9.61L4.72 4.72C6.21 3.64 8.03 3 10 3Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
