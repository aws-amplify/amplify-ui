import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconSoap } from '@aws-amplify/ui-react';` → `import { MdSoap } from 'react-icons/md';`
 */
export const IconSoap = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconSoap } from '@aws-amplify/ui-react'; → import { MdSoap } from 'react-icons/md';`,
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
          d="M14.25 6C14.66 6 15 6.34 15 6.75C15 7.16 14.66 7.5 14.25 7.5C13.84 7.5 13.5 7.16 13.5 6.75C13.5 6.34 13.84 6 14.25 6ZM14.25 4.5C13.01 4.5 12 5.51 12 6.75C12 7.99 13.01 9 14.25 9C15.49 9 16.5 7.99 16.5 6.75C16.5 5.51 15.49 4.5 14.25 4.5ZM20 5.5C20.28 5.5 20.5 5.72 20.5 6C20.5 6.28 20.28 6.5 20 6.5C19.72 6.5 19.5 6.28 19.5 6C19.5 5.72 19.72 5.5 20 5.5ZM20 4C18.9 4 18 4.9 18 6C18 7.1 18.9 8 20 8C21.1 8 22 7.1 22 6C22 4.9 21.1 4 20 4ZM16.5 1C15.67 1 15 1.67 15 2.5C15 3.33 15.67 4 16.5 4C17.33 4 18 3.33 18 2.5C18 1.67 17.33 1 16.5 1ZM20.75 16C21.44 16 22 15.44 22 14.75C22 14.06 21.44 13.5 20.75 13.5H12V12.5H18.75C19.44 12.5 20 11.94 20 11.25C20 10.58 19.47 10.05 18.82 10.01L8.87 10L10.35 7.4C10.44 7.23 10.49 7.06 10.49 6.86C10.49 6.6 10.4 6.36 10.23 6.16L9.12 5L1.94 11.8C1.34 12.36 1 13.15 1 13.97V20C1 21.66 2.34 23 4 23H17.75C18.44 23 19 22.44 19 21.75C19 21.06 18.44 20.5 17.75 20.5H12V19.5H19.75C20.44 19.5 21 18.94 21 18.25C21 17.56 20.44 17 19.75 17H12V16H20.75ZM10 21H4C3.45 21 3 20.55 3 20V14C3 13.61 3.23 13.36 3.36 13.25L7 9.87V12H10V21Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
