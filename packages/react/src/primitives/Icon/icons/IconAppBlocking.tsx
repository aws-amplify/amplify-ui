import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconAppBlocking } from '@aws-amplify/ui-react';` → `import { MdAppBlocking } from 'react-icons/md';`
 */
export const IconAppBlocking = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconAppBlocking');
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
          d="M18 8C15.79 8 14 9.79 14 12C14 14.21 15.79 16 18 16C20.21 16 22 14.21 22 12C22 9.79 20.21 8 18 8ZM15.5 12C15.5 10.62 16.62 9.5 18 9.5C18.42 9.5 18.8 9.61 19.15 9.79L15.79 13.15C15.61 12.8 15.5 12.42 15.5 12ZM18 14.5C17.58 14.5 17.2 14.39 16.85 14.21L20.21 10.85C20.39 11.2 20.5 11.58 20.5 12C20.5 13.38 19.38 14.5 18 14.5Z"
          fill="currentColor"
        />
        <path
          d="M17 18H7V6H17V7H19V6V5V3C19 1.9 18.1 1 17 1H7C5.9 1 5 1.9 5 3V21C5 22.1 5.9 23 7 23H17C18.1 23 19 22.1 19 21V19V18V17H17V18ZM7 3H17V4H7V3ZM17 21H7V20H17V21Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
