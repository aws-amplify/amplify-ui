import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconFlightLand } from '@aws-amplify/ui-react';` → `import { MdFlightLand } from 'react-icons/md';`
 */
export const IconFlightLand = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconFlightLand');
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
          d="M2.5 19H21.5V21H2.5V19ZM19.34 15.85C20.14 16.06 20.96 15.59 21.18 14.79C21.39 13.99 20.92 13.17 20.12 12.95L14.81 11.53L12.05 2.51L10.12 2V10.28L5.15 8.95L4.22 6.63L2.77 6.24V11.41L19.34 15.85V15.85Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
