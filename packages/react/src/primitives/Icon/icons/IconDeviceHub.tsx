import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconDeviceHub } from '@aws-amplify/ui-react';` → `import { MdDeviceHub } from 'react-icons/md';`
 */
export const IconDeviceHub = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconDeviceHub } from '@aws-amplify/ui-react'; → import { MdDeviceHub } from 'react-icons/md';`,
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
          d="M17 16L13 12V8.82C14.16 8.4 15 7.3 15 6C15 4.34 13.66 3 12 3C10.34 3 9 4.34 9 6C9 7.3 9.84 8.4 11 8.82V12L7 16H3V21H8V17.95L12 13.75L16 17.95V21H21V16H17Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
