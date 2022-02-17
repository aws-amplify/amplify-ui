import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconSensorWindow } from '@aws-amplify/ui-react';` → `import { MdSensorWindow } from 'react-icons/md';`
 */
export const IconSensorWindow = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconSensorWindow');
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
          d="M18 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V4C20 2.9 19.1 2 18 2ZM18 4V11H14V10H10V11H6V4H18ZM6 20V13H18V20H6Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
