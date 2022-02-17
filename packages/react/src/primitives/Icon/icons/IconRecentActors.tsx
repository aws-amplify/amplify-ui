import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconRecentActors } from '@aws-amplify/ui-react';` → `import { MdRecentActors } from 'react-icons/md';`
 */
export const IconRecentActors = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconRecentActors');
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
          d="M21 5H23V19H21V5ZM17 5H19V19H17V5ZM14 5H2C1.45 5 1 5.45 1 6V18C1 18.55 1.45 19 2 19H14C14.55 19 15 18.55 15 18V6C15 5.45 14.55 5 14 5ZM13 17H3V7H13V17Z"
          fill="currentColor"
        />
        <path
          d="M8.00005 11.8902C9.077 11.8902 9.95005 11.0172 9.95005 9.94023C9.95005 8.86328 9.077 7.99023 8.00005 7.99023C6.92309 7.99023 6.05005 8.86328 6.05005 9.94023C6.05005 11.0172 6.92309 11.8902 8.00005 11.8902Z"
          fill="black"
        />
        <path
          d="M11.89 15.3499C11.89 14.0499 9.29999 13.3999 7.99999 13.3999C6.69999 13.3999 4.10999 14.0499 4.10999 15.3499V15.9999H11.89V15.3499Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
