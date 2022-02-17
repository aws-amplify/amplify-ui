import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconRestaurant } from '@aws-amplify/ui-react';` → `import { MdRestaurant } from 'react-icons/md';`
 */
export const IconRestaurant = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconRestaurant');
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
          d="M16 6V14H19V22H21V2C18.24 2 16 4.24 16 6ZM11 9H9V2H7V9H5V2H3V9C3 11.21 4.79 13 7 13V22H9V13C11.21 13 13 11.21 13 9V2H11V9Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
