import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconLooks_6 } from '@aws-amplify/ui-react';` → `import { MdLooks_6 } from 'react-icons/md';`
 */
export const IconLooks_6 = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconLooks_6');
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
          d="M11 17H13C14.1 17 15 16.11 15 15V13C15 11.89 14.1 11 13 11H11V9H15V7H11C9.9 7 9 7.89 9 9V15C9 16.11 9.9 17 11 17ZM11 13H13V15H11V13ZM19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
