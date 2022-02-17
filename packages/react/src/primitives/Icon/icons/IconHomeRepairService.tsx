import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconHomeRepairService } from '@aws-amplify/ui-react';` → `import { MdHomeRepairService } from 'react-icons/md';`
 */
export const IconHomeRepairService = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconHomeRepairService');
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
          d="M20 8H17V6C17 4.9 16.1 4 15 4H9C7.9 4 7 4.9 7 6V8H4C2.9 8 2 8.9 2 10V20H22V10C22 8.9 21.1 8 20 8ZM9 6H15V8H9V6ZM20 18H4V15H6V16H8V15H16V16H18V15H20V18ZM18 13V12H16V13H8V12H6V13H4V10H7H17H20V13H18Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
