import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconSignalCellularNoSim } from '@aws-amplify/ui-react';` → `import { MdSignalCellularNoSim } from 'react-icons/md';`
 */
export const IconSignalCellularNoSim = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconSignalCellularNoSim');
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
          d="M10.83 5H17V14.11L19 16.11V5C19 3.9 18.1 3 17 3H10L7.94 5.06L9.36 6.48L10.83 5ZM21.26 21.21L3.79 3.74L2.38 5.15L5 7.77V19C5 20.11 5.9 21 7 21H18.23L19.85 22.62L21.26 21.21V21.21ZM7 19V9.79L16.23 19H7Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
