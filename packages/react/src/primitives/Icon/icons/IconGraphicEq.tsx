import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconGraphicEq } from '@aws-amplify/ui-react';` → `import { MdGraphicEq } from 'react-icons/md';`
 */
export const IconGraphicEq = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconGraphicEq');
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
          d="M7 18H9V6H7V18ZM11 22H13V2H11V22ZM3 14H5V10H3V14ZM15 18H17V6H15V18ZM19 10V14H21V10H19Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
