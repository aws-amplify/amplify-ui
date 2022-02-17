import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconFreeBreakfast } from '@aws-amplify/ui-react';` → `import { MdFreeBreakfast } from 'react-icons/md';`
 */
export const IconFreeBreakfast = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconFreeBreakfast');
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
          d="M4 19H20V21H4V19ZM20 3H4V13C4 15.21 5.79 17 8 17H14C16.21 17 18 15.21 18 13V10H20C21.11 10 22 9.1 22 8V5C22 3.89 21.11 3 20 3ZM16 13C16 14.1 15.1 15 14 15H8C6.9 15 6 14.1 6 13V5H16V13ZM20 8H18V5H20V8Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
