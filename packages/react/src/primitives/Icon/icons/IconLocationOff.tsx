import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconLocationOff } from '@aws-amplify/ui-react';` → `import { MdLocationOff } from 'react-icons/md';`
 */
export const IconLocationOff = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconLocationOff');
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
          d="M12 4C14.76 4 17 6.24 17 9C17 10.06 16.61 11.32 16 12.62L17.49 14.11C18.37 12.36 19 10.57 19 9C19 5.13 15.87 2 12 2C10.16 2 8.5 2.71 7.25 3.86L8.68 5.29C9.56 4.5 10.72 4 12 4ZM12 6.5C11.41 6.5 10.87 6.71 10.44 7.06L13.94 10.56C14.29 10.13 14.5 9.59 14.5 9C14.5 7.62 13.38 6.5 12 6.5ZM3.41 2.86L2 4.27L5.18 7.45C5.07 7.95 5 8.47 5 9C5 14.25 12 22 12 22C12 22 13.67 20.15 15.38 17.65L18.73 21L20.14 19.59L3.41 2.86ZM12 18.88C9.99 16.3 7.2 12.14 7.02 9.29L13.94 16.21C13.29 17.19 12.61 18.1 12 18.88V18.88Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
