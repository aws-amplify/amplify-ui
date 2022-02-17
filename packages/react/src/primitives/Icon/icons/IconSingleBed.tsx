import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconSingleBed } from '@aws-amplify/ui-react';` → `import { MdSingleBed } from 'react-icons/md';`
 */
export const IconSingleBed = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconSingleBed');
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
          d="M20 12C20 10.9 19.1 10 18 10V7C18 5.9 17.1 5 16 5H8C6.9 5 6 5.9 6 7V10C4.9 10 4 10.9 4 12V17H5.33L6 19H7L7.67 17H16.34L17 19H18L18.67 17H20V12ZM16 10H13V7H16V10ZM8 7H11V10H8V7ZM6 12H18V15H6V12Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
