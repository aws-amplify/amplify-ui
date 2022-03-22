import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconSignalWifiOff } from '@aws-amplify/ui-react';` → `import { MdSignalWifiOff } from 'react-icons/md';`
 */
export const IconSignalWifiOff = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconSignalWifiOff } from '@aws-amplify/ui-react'; → import { MdSignalWifiOff } from 'react-icons/md';`,
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
          d="M23.64 7.00006C23.19 6.66006 18.71 3.00006 12 3.00006C10.68 3.00006 9.44999 3.14006 8.30999 3.38006L18.43 13.5001L23.64 7.00006ZM3.40999 1.31006L1.99999 2.72006L4.04999 4.77006C1.90999 5.76006 0.589985 6.82006 0.359985 7.00006L12 21.5001L15.91 16.6301L19.23 19.9501L20.64 18.5401L3.40999 1.31006Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
