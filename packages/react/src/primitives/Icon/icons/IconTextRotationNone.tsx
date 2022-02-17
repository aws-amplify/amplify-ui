import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconTextRotationNone } from '@aws-amplify/ui-react';` → `import { MdTextRotationNone } from 'react-icons/md';`
 */
export const IconTextRotationNone = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconTextRotationNone');
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
          d="M21 18L18 15V17H5V19H18V21L21 18ZM9.5 11.8H14.5L15.4 14H17.5L12.75 3H11.25L6.5 14H8.6L9.5 11.8ZM12 4.98L13.87 10H10.13L12 4.98Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
