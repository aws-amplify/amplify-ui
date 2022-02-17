import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconLineStyle } from '@aws-amplify/ui-react';` → `import { MdLineStyle } from 'react-icons/md';`
 */
export const IconLineStyle = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconLineStyle');
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
          d="M3 16H8V14H3V16ZM9.5 16H14.5V14H9.5V16ZM16 16H21V14H16V16ZM3 20H5V18H3V20ZM7 20H9V18H7V20ZM11 20H13V18H11V20ZM15 20H17V18H15V20ZM19 20H21V18H19V20ZM3 12H11V10H3V12ZM13 12H21V10H13V12ZM3 4V8H21V4H3Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
