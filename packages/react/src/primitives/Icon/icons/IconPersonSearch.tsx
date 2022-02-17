import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconPersonSearch } from '@aws-amplify/ui-react';` → `import { MdPersonSearch } from 'react-icons/md';`
 */
export const IconPersonSearch = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconPersonSearch');
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
          d="M10 12C12.21 12 14 10.21 14 8C14 5.79 12.21 4 10 4C7.79 4 6 5.79 6 8C6 10.21 7.79 12 10 12ZM10 6C11.1 6 12 6.9 12 8C12 9.1 11.1 10 10 10C8.9 10 8 9.1 8 8C8 6.9 8.9 6 10 6Z"
          fill="currentColor"
        />
        <path
          d="M4 18C4.22 17.28 7.31 16 10 16C10 15.3 10.13 14.63 10.35 14.01C7.62 13.91 2 15.27 2 18V20H11.54C11.02 19.42 10.61 18.75 10.35 18H4Z"
          fill="black"
        />
        <path
          d="M19.43 18.02C19.79 17.43 20 16.74 20 16C20 13.79 18.21 12 16 12C13.79 12 12 13.79 12 16C12 18.21 13.79 20 16 20C16.74 20 17.43 19.78 18.02 19.43C18.95 20.36 19.64 21.05 20.59 22L22 20.59C20.5 19.09 21.21 19.79 19.43 18.02ZM16 18C14.9 18 14 17.1 14 16C14 14.9 14.9 14 16 14C17.1 14 18 14.9 18 16C18 17.1 17.1 18 16 18Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
