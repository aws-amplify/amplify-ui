import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconComment } from '@aws-amplify/ui-react';` → `import { MdComment } from 'react-icons/md';`
 */
export const IconComment = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconComment');
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
          d="M21.99 4C21.99 2.9 21.1 2 20 2H4C2.9 2 2 2.9 2 4V16C2 17.1 2.9 18 4 18H18L22 22L21.99 4ZM20 4V17.17L18.83 16H4V4H20ZM6 12H18V14H6V12ZM6 9H18V11H6V9ZM6 6H18V8H6V6Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
