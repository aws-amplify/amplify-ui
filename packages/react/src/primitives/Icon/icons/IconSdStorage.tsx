import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconSdStorage } from '@aws-amplify/ui-react';` → `import { MdSdStorage } from 'react-icons/md';`
 */
export const IconSdStorage = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconSdStorage');
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
          d="M18 4V20H6V8.83L10.83 4H18ZM18 2H10L4 8V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V4C20 2.9 19.1 2 18 2ZM9 7H11V11H9V7ZM12 7H14V11H12V7ZM15 7H17V11H15V7Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
