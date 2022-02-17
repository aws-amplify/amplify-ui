import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconOpenInBrowser } from '@aws-amplify/ui-react';` → `import { MdOpenInBrowser } from 'react-icons/md';`
 */
export const IconOpenInBrowser = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconOpenInBrowser');
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
          d="M19 4H5C3.89 4 3 4.9 3 6V18C3 19.1 3.89 20 5 20H9V18H5V8H19V18H15V20H19C20.1 20 21 19.1 21 18V6C21 4.9 20.11 4 19 4ZM12 10L8 14H11V20H13V14H16L12 10Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
