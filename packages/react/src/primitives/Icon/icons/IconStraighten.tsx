import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconStraighten } from '@aws-amplify/ui-react';` → `import { MdStraighten } from 'react-icons/md';`
 */
export const IconStraighten = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconStraighten');
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
          d="M21 6H3C1.9 6 1 6.9 1 8V16C1 17.1 1.9 18 3 18H21C22.1 18 23 17.1 23 16V8C23 6.9 22.1 6 21 6ZM21 16H3V8H5V12H7V8H9V12H11V8H13V12H15V8H17V12H19V8H21V16Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
