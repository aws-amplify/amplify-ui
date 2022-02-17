import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconScanner } from '@aws-amplify/ui-react';` → `import { MdScanner } from 'react-icons/md';`
 */
export const IconScanner = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconScanner');
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
          d="M19.8 10.7L4.2 5L3.5 6.9L17.6 12H5C3.9 12 3 12.9 3 14V18C3 19.1 3.9 20 5 20H19C20.1 20 21 19.1 21 18V12.5C21 11.7 20.5 10.9 19.8 10.7ZM19 18H5V14H19V18ZM6 15H8V17H6V15ZM10 15H18V17H10V15Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
