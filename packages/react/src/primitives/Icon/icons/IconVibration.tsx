import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconVibration } from '@aws-amplify/ui-react';` → `import { MdVibration } from 'react-icons/md';`
 */
export const IconVibration = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconVibration');
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
          d="M0 15H2V9H0V15ZM3 17H5V7H3V17ZM22 9V15H24V9H22ZM19 17H21V7H19V17ZM16.5 3H7.5C6.67 3 6 3.67 6 4.5V19.5C6 20.33 6.67 21 7.5 21H16.5C17.33 21 18 20.33 18 19.5V4.5C18 3.67 17.33 3 16.5 3ZM16 19H8V5H16V19Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
