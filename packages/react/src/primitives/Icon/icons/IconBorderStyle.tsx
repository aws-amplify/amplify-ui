import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconBorderStyle } from '@aws-amplify/ui-react';` → `import { MdBorderStyle } from 'react-icons/md';`
 */
export const IconBorderStyle = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconBorderStyle');
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
          d="M15 21H17V19H15V21ZM19 21H21V19H19V21ZM7 21H9V19H7V21ZM11 21H13V19H11V21ZM19 17H21V15H19V17ZM19 13H21V11H19V13ZM3 3V21H5V5H21V3H3ZM19 9H21V7H19V9Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
