import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconEventSeat } from '@aws-amplify/ui-react';` → `import { MdEventSeat } from 'react-icons/md';`
 */
export const IconEventSeat = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconEventSeat');
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
          d="M15 5V12H9V5H15ZM15 3H9C7.9 3 7 3.9 7 5V14H17V5C17 3.9 16.1 3 15 3ZM22 10H19V13H22V10ZM5 10H2V13H5V10ZM20 15H4V21H6V17H18V21H20V15Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
