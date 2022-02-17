import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconSend } from '@aws-amplify/ui-react';` → `import { MdSend } from 'react-icons/md';`
 */
export const IconSend = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconSend');
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
          d="M4.01 6.03L11.52 9.25L4 8.25L4.01 6.03V6.03ZM11.51 14.75L4 17.97V15.75L11.51 14.75V14.75ZM2.01 3L2 10L17 12L2 14L2.01 21L23 12L2.01 3Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
