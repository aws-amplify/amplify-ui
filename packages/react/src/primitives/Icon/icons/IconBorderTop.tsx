import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconBorderTop } from '@aws-amplify/ui-react';` → `import { MdBorderTop } from 'react-icons/md';`
 */
export const IconBorderTop = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconBorderTop');
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
          d="M7 21H9V19H7V21ZM7 13H9V11H7V13ZM11 13H13V11H11V13ZM11 21H13V19H11V21ZM3 17H5V15H3V17ZM3 21H5V19H3V21ZM3 13H5V11H3V13ZM3 9H5V7H3V9ZM11 17H13V15H11V17ZM19 9H21V7H19V9ZM19 13H21V11H19V13ZM3 3V5H21V3H3ZM19 17H21V15H19V17ZM15 21H17V19H15V21ZM11 9H13V7H11V9ZM19 21H21V19H19V21ZM15 13H17V11H15V13Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
