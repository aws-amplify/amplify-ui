import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconFormatTextdirectionRToL } from '@aws-amplify/ui-react';` → `import { MdFormatTextdirectionRToL } from 'react-icons/md';`
 */
export const IconFormatTextdirectionRToL = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconFormatTextdirectionRToL');
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
          d="M10 4V8C8.9 8 8 7.1 8 6C8 4.9 8.9 4 10 4ZM18 2H10C7.79 2 6 3.79 6 6C6 8.21 7.79 10 10 10V15H12V4H14V15H16V4H18V2ZM8 14L4 18L8 22V19H20V17H8V14Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
