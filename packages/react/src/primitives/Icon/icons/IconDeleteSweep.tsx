import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconDeleteSweep } from '@aws-amplify/ui-react';` → `import { MdDeleteSweep } from 'react-icons/md';`
 */
export const IconDeleteSweep = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconDeleteSweep');
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
          d="M15 16H19V18H15V16ZM15 8H22V10H15V8ZM15 12H21V14H15V12ZM3 18C3 19.1 3.9 20 5 20H11C12.1 20 13 19.1 13 18V8H3V18ZM5 10H11V18H5V10ZM10 4H6L5 5H2V7H14V5H11L10 4Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
