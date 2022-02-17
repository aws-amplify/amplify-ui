import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconHouseSiding } from '@aws-amplify/ui-react';` → `import { MdHouseSiding } from 'react-icons/md';`
 */
export const IconHouseSiding = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconHouseSiding');
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
          d="M19 12H22L12 3L2 12H5V20H7V18H17V20H19V12ZM7.21 10H16.79L17 10.19V12H7V10.19L7.21 10ZM14.57 8H9.43L12 5.69L14.57 8ZM7 16V14H17V16H7Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
