import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconBackupTable } from '@aws-amplify/ui-react';` → `import { MdBackupTable } from 'react-icons/md';`
 */
export const IconBackupTable = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconBackupTable');
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
          d="M20 6V20H6V22H20C21.1 22 22 21.1 22 20V6H20Z"
          fill="currentColor"
        />
        <path
          d="M16 2H4C2.9 2 2 2.9 2 4V16C2 17.1 2.9 18 4 18H16C17.1 18 18 17.1 18 16V4C18 2.9 17.1 2 16 2ZM9 16H4V11H9V16ZM16 16H11V11H16V16ZM16 9H4V4H16V9Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
