import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconRestoreFromTrash } from '@aws-amplify/ui-react';` → `import { MdRestoreFromTrash } from 'react-icons/md';`
 */
export const IconRestoreFromTrash = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconRestoreFromTrash');
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
          d="M15.5 4L14.5 3H9.5L8.5 4H5V6H19V4H15.5ZM6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM8 14V9H16V19H8V14ZM10 18H14V14H16L12 10L8 14H10V18Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
