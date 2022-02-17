import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconViewWeek } from '@aws-amplify/ui-react';` → `import { MdViewWeek } from 'react-icons/md';`
 */
export const IconViewWeek = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconViewWeek');
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
          d="M21 4H3C2.45 4 2 4.45 2 5V19C2 19.55 2.45 20 3 20H21C21.55 20 22 19.55 22 19V5C22 4.45 21.55 4 21 4ZM8 18H4V6H8V18ZM14 18H10V6H14V18ZM20 18H16V6H20V18Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
