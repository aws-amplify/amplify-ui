import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconMobileOff } from '@aws-amplify/ui-react';` → `import { MdMobileOff } from 'react-icons/md';`
 */
export const IconMobileOff = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconMobileOff');
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
          d="M17 5V13.61L19 15.61V3C19 1.9 18.1 1 17 1H6.99999C6.28999 1 5.66999 1.37 5.31999 1.93L8.38999 5H17ZM1.48999 3.76L4.99999 7.27V21C4.99999 22.1 5.89999 23 6.99999 23H17C18.02 23 18.85 22.23 18.98 21.25L20.7 22.97L22.11 21.56L2.89999 2.35L1.48999 3.76ZM6.99999 9.27L16.73 19H6.99999V9.27Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
