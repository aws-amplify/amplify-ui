import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconNightShelter } from '@aws-amplify/ui-react';` → `import { MdNightShelter } from 'react-icons/md';`
 */
export const IconNightShelter = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconNightShelter } from '@aws-amplify/ui-react'; → import { MdNightShelter } from 'react-icons/md';`,
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
          d="M12 5.5L18 10V19H6V10L12 5.5ZM12 3L4 9V21H20V9L12 3ZM15 12H11.5V15.5H8V11H7V18H8V16.5H16V18H17V14C17 12.9 16.1 12 15 12ZM9.75 12.5C9.06 12.5 8.5 13.06 8.5 13.75C8.5 14.44 9.06 15 9.75 15C10.44 15 11 14.44 11 13.75C11 13.06 10.44 12.5 9.75 12.5Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
