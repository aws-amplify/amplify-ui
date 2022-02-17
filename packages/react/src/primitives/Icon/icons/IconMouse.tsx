import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconMouse } from '@aws-amplify/ui-react';` → `import { MdMouse } from 'react-icons/md';`
 */
export const IconMouse = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconMouse');
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
          d="M20 8.99982C19.96 4.60982 16.4 1.06982 12 1.06982C7.6 1.06982 4.04 4.60982 4 8.99982V14.9998C4 19.4198 7.58 22.9998 12 22.9998C16.42 22.9998 20 19.4198 20 14.9998V8.99982ZM18 8.99982H13V3.15982C15.81 3.62982 17.96 6.05982 18 8.99982ZM11 3.15982V8.99982H6C6.04 6.05982 8.19 3.62982 11 3.15982ZM18 14.9998C18 18.3098 15.31 20.9998 12 20.9998C8.69 20.9998 6 18.3098 6 14.9998V10.9998H18V14.9998Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
