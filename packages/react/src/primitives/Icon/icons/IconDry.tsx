import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconDry } from '@aws-amplify/ui-react';` → `import { MdDry } from 'react-icons/md';`
 */
export const IconDry = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconDry');
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
          d="M20.75 16C21.44 16 22 15.44 22 14.75C22 14.06 21.44 13.5 20.75 13.5H12V12.5H18.75C19.44 12.5 20 11.94 20 11.25C20 10.58 19.47 10.05 18.82 10.01L8.87 10L10.35 7.4C10.44 7.23 10.49 7.06 10.49 6.86C10.49 6.6 10.4 6.36 10.23 6.16L9.12 5L1.94 11.8C1.34 12.36 1 13.15 1 13.97V20C1 21.66 2.34 23 4 23H17.75C18.44 23 19 22.44 19 21.75C19 21.06 18.44 20.5 17.75 20.5H12V19.5H19.75C20.44 19.5 21 18.94 21 18.25C21 17.56 20.44 17 19.75 17H12V16H20.75ZM10 21H4C3.45 21 3 20.55 3 20V14C3 13.61 3.23 13.36 3.36 13.25L7 9.87V12H10V21ZM15.65 4.86L15.58 4.79C15.01 4.17 14.76 3.38 14.91 2.59L15 2H13.11L13.05 2.43C12.85 3.79 13.32 5.14 14.35 6.15L14.42 6.21C14.99 6.83 15.24 7.62 15.09 8.41L14.98 9H16.89L16.95 8.57C17.16 7.21 16.68 5.86 15.65 4.86ZM19.65 4.86L19.58 4.79C19.01 4.17 18.76 3.38 18.91 2.59L19 2H17.11L17.05 2.43C16.85 3.79 17.32 5.14 18.35 6.15L18.42 6.21C18.99 6.83 19.24 7.62 19.09 8.41L18.98 9H20.89L20.95 8.57C21.16 7.21 20.68 5.86 19.65 4.86Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
