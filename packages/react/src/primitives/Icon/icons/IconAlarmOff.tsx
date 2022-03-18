import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconAlarmOff } from '@aws-amplify/ui-react';` → `import { MdAlarmOff } from 'react-icons/md';`
 */
export const IconAlarmOff = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconAlarmOff } from '@aws-amplify/ui-react'; → import { MdAlarmOff } from 'react-icons/md';`,
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
          d="M10.04 6.29006C10.66 6.11006 11.32 6.00006 12 6.00006C15.86 6.00006 19 9.14006 19 13.0001C19 13.6801 18.89 14.3401 18.71 14.9601L20.27 16.5201C20.74 15.4401 21 14.2501 21 13.0001C21 8.03006 16.97 4.00006 12 4.00006C10.75 4.00006 9.55999 4.26006 8.46999 4.72006L10.04 6.29006V6.29006ZM17.337 1.81006L21.944 5.65506L20.664 7.19006L16.054 3.34706L17.337 1.81006ZM3.01999 2.10006L1.60999 3.51006L2.97999 4.88006L2.05999 5.65006L3.33999 7.19006L4.39999 6.31006L5.19999 7.11006C3.82999 8.69006 2.99999 10.7501 2.99999 13.0001C2.99999 17.9701 7.02999 22.0001 12 22.0001C14.25 22.0001 16.31 21.1701 17.89 19.8001L19.99 21.9001L21.4 20.4901L3.01999 2.10006ZM12 20.0001C8.13999 20.0001 4.99999 16.8601 4.99999 13.0001C4.99999 11.3001 5.60999 9.74006 6.61999 8.53006L16.47 18.3801C15.26 19.3901 13.7 20.0001 12 20.0001ZM7.47999 3.73006L7.93999 3.35006L6.65999 1.81006L6.05999 2.31006L7.47999 3.73006Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
