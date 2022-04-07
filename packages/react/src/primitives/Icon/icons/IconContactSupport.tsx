import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconContactSupport } from '@aws-amplify/ui-react';` → `import { MdContactSupport } from 'react-icons/md';`
 */
export const IconContactSupport = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconContactSupport } from '@aws-amplify/ui-react'; → import { MdContactSupport } from 'react-icons/md';`,
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
          d="M11 23.59V19.99C5.99 19.73 2 15.57 2 10.5C2 5.26 6.26 1 11.5 1C16.74 1 21 5.26 21 10.5C21 15.45 17.56 20.43 12.43 22.9L11 23.59ZM11.5 3C7.36 3 4 6.36 4 10.5C4 14.64 7.36 18 11.5 18H13V20.3C16.64 18 19 14.22 19 10.5C19 6.36 15.64 3 11.5 3ZM10.5 14.5H12.5V16.5H10.5V14.5ZM12.5 13H10.5C10.5 9.75 13.5 10 13.5 8C13.5 6.9 12.6 6 11.5 6C10.4 6 9.5 6.9 9.5 8H7.5C7.5 5.79 9.29 4 11.5 4C13.71 4 15.5 5.79 15.5 8C15.5 10.5 12.5 10.75 12.5 13Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
