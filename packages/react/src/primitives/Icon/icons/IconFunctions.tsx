import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconFunctions } from '@aws-amplify/ui-react';` → `import { MdFunctions } from 'react-icons/md';`
 */
export const IconFunctions = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconFunctions');
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
          d="M18 4H6V6L12.5 12L6 18V20H18V17H11L16 12L11 7H18V4Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
