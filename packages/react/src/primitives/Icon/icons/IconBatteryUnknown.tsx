import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconBatteryUnknown } from '@aws-amplify/ui-react';` → `import { MdBatteryUnknown } from 'react-icons/md';`
 */
export const IconBatteryUnknown = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconBatteryUnknown } from '@aws-amplify/ui-react'; → import { MdBatteryUnknown } from 'react-icons/md';`,
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
          d="M15.67 4H14V2H10V4H8.33C7.6 4 7 4.6 7 5.33V20.66C7 21.4 7.6 22 8.33 22H15.66C16.4 22 17 21.4 17 20.67V5.33C17 4.6 16.4 4 15.67 4ZM13 18H11V16H13V18ZM14.3 12.69C14.3 12.69 13.92 13.11 13.63 13.4C13.15 13.88 12.8 14.55 12.8 15H11.2C11.2 14.17 11.66 13.48 12.13 13L13.06 12.06C13.33 11.79 13.5 11.41 13.5 11C13.5 10.17 12.83 9.5 12 9.5C11.17 9.5 10.5 10.17 10.5 11H9C9 9.34 10.34 8 12 8C13.66 8 15 9.34 15 11C15 11.66 14.73 12.26 14.3 12.69Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
