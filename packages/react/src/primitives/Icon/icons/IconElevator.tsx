import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconElevator } from '@aws-amplify/ui-react';` → `import { MdElevator } from 'react-icons/md';`
 */
export const IconElevator = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconElevator } from '@aws-amplify/ui-react'; → import { MdElevator } from 'react-icons/md';`,
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
          d="M19 5V19H5V5H19ZM19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM10 18V14H11V11.5C11 10.4 10.1 9.5 9 9.5H8C6.9 9.5 6 10.4 6 11.5V14H7V18H10ZM8.5 8.5C9.19 8.5 9.75 7.94 9.75 7.25C9.75 6.56 9.19 6 8.5 6C7.81 6 7.25 6.56 7.25 7.25C7.25 7.94 7.81 8.5 8.5 8.5ZM18 11L15.5 7L13 11H18ZM13 13L15.5 17L18 13H13Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
