import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconThermostat } from '@aws-amplify/ui-react';` → `import { MdThermostat } from 'react-icons/md';`
 */
export const IconThermostat = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconThermostat } from '@aws-amplify/ui-react'; → import { MdThermostat } from 'react-icons/md';`,
  });
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
          d="M15 13V5C15 3.34 13.66 2 12 2C10.34 2 9 3.34 9 5V13C7.79 13.91 7 15.37 7 17C7 19.76 9.24 22 12 22C14.76 22 17 19.76 17 17C17 15.37 16.21 13.91 15 13ZM11 5C11 4.45 11.45 4 12 4C12.55 4 13 4.45 13 5H12V6H13V8H12V9H13V11H11V5Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
