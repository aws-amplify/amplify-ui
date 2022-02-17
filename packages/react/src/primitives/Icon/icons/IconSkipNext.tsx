import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconSkipNext } from '@aws-amplify/ui-react';` → `import { MdSkipNext } from 'react-icons/md';`
 */
export const IconSkipNext = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconSkipNext');
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
          d="M6 18L14.5 12L6 6V18ZM8 9.86L11.03 12L8 14.14V9.86ZM16 6H18V18H16V6Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
