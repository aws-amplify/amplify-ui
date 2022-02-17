import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconWeb } from '@aws-amplify/ui-react';` → `import { MdWeb } from 'react-icons/md';`
 */
export const IconWeb = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconWeb');
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
          d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM4 9H14.5V12.5H4V9ZM4 14.5H14.5V18H4V14.5ZM20 18H16.5V9H20V18Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
