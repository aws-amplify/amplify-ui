import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconDesktopMac } from '@aws-amplify/ui-react';` → `import { MdDesktopMac } from 'react-icons/md';`
 */
export const IconDesktopMac = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconDesktopMac');
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
          d="M21 2H3C1.9 2 1 2.9 1 4V16C1 17.1 1.9 18 3 18H10L8 21V22H16V21L14 18H21C22.1 18 23 17.1 23 16V4C23 2.9 22.1 2 21 2ZM21 14H3V4H21V14Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
