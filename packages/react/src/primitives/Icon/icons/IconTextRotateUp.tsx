import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconTextRotateUp } from '@aws-amplify/ui-react';` → `import { MdTextRotateUp } from 'react-icons/md';`
 */
export const IconTextRotateUp = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconTextRotateUp } from '@aws-amplify/ui-react'; → import { MdTextRotateUp } from 'react-icons/md';`,
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
          d="M18 4L15 7H17V20H19V7H21L18 4ZM11.8 15.5V10.5L14 9.6V7.5L3 12.25V13.75L14 18.5V16.4L11.8 15.5V15.5ZM4.98 13L10 11.13V14.87L4.98 13Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
