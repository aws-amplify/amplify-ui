import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconAttachEmail } from '@aws-amplify/ui-react';` → `import { MdAttachEmail } from 'react-icons/md';`
 */
export const IconAttachEmail = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconAttachEmail } from '@aws-amplify/ui-react'; → import { MdAttachEmail } from 'react-icons/md';`,
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
          d="M3 6L11 11L19 6V9H21V4C21 2.9 20.1 2 19 2H3C1.9 2 1.01 2.9 1.01 4L1 16C1 17.1 1.9 18 3 18H13V16H3V6ZM19 4L11 9L3 4H19Z"
          fill="currentColor"
        />
        <path
          d="M21 14V18C21 19.1 20.1 20 19 20C17.9 20 17 19.1 17 18V13.5C17 13.22 17.22 13 17.5 13C17.78 13 18 13.22 18 13.5V18H20V13.5C20 12.12 18.88 11 17.5 11C16.12 11 15 12.12 15 13.5V18C15 20.21 16.79 22 19 22C21.21 22 23 20.21 23 18V14H21Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
