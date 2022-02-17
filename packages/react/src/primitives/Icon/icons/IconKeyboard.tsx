import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconKeyboard } from '@aws-amplify/ui-react';` → `import { MdKeyboard } from 'react-icons/md';`
 */
export const IconKeyboard = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconKeyboard');
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
          d="M20 7V17H4V7H20ZM20 5H4C2.9 5 2.01 5.9 2.01 7L2 17C2 18.1 2.9 19 4 19H20C21.1 19 22 18.1 22 17V7C22 5.9 21.1 5 20 5ZM11 8H13V10H11V8ZM11 11H13V13H11V11ZM8 8H10V10H8V8ZM8 11H10V13H8V11ZM5 11H7V13H5V11ZM5 8H7V10H5V8ZM8 14H16V16H8V14ZM14 11H16V13H14V11ZM14 8H16V10H14V8ZM17 11H19V13H17V11ZM17 8H19V10H17V8Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
