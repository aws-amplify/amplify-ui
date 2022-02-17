import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconSensorDoor } from '@aws-amplify/ui-react';` → `import { MdSensorDoor } from 'react-icons/md';`
 */
export const IconSensorDoor = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconSensorDoor');
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
          d="M18 4V20H6V4H18ZM18 2H6C4.9 2 4 2.9 4 4V22H20V4C20 2.9 19.1 2 18 2ZM15.5 10.5C14.67 10.5 14 11.17 14 12C14 12.83 14.67 13.5 15.5 13.5C16.33 13.5 17 12.83 17 12C17 11.17 16.33 10.5 15.5 10.5Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
