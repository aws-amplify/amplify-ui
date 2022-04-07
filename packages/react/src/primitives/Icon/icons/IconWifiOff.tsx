import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconWifiOff } from '@aws-amplify/ui-react';` → `import { MdWifiOff } from 'react-icons/md';`
 */
export const IconWifiOff = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconWifiOff } from '@aws-amplify/ui-react'; → import { MdWifiOff } from 'react-icons/md';`,
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
          d="M21 11.0001L23 9.00014C19.27 5.27014 14.13 3.85014 9.3 4.69014L11.88 7.27014C15.18 7.25014 18.49 8.49014 21 11.0001ZM19 13.0001C17.92 11.9201 16.64 11.1501 15.28 10.6701L18.3 13.6901L19 13.0001ZM9 17.0001L12 20.0001L15 17.0001C13.35 15.3401 10.66 15.3401 9 17.0001ZM3.41 1.64014L2 3.05014L5.05 6.10014C3.59 6.83014 2.22 7.79014 1 9.00014L3 11.0001C4.23 9.77014 5.65 8.84014 7.17 8.22014L9.41 10.4601C7.79 10.8901 6.27 11.7401 5 13.0001L7 15.0001C8.35 13.6501 10.11 12.9601 11.89 12.9401L18.97 20.0201L20.38 18.6101L3.41 1.64014Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
