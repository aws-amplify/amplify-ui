import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconTimerOff } from '@aws-amplify/ui-react';` → `import { MdTimerOff } from 'react-icons/md';`
 */
export const IconTimerOff = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconTimerOff } from '@aws-amplify/ui-react'; → import { MdTimerOff } from 'react-icons/md';`,
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
          d="M11 8V8.86L13 10.86V8H11ZM9 1H15V3H9V1ZM12 6C15.87 6 19 9.13 19 13C19 14.12 18.73 15.18 18.26 16.12L19.73 17.59C20.53 16.25 21 14.68 21 13C21 10.88 20.26 8.93 19.03 7.39L20.45 5.97C20.02 5.46 19.55 4.98 19.04 4.56L17.62 5.98C16.07 4.74 14.12 4 12 4C10.32 4 8.75 4.47 7.41 5.27L8.88 6.74C9.82 6.27 10.88 6 12 6V6ZM3.16 3.86L1.75 5.27L4.5 8.02C3.56 9.45 3 11.16 3 13C3 17.97 7.02 22 12 22C13.84 22 15.55 21.45 16.98 20.5L19.48 23L20.89 21.59L3.16 3.86ZM12 20C8.13 20 5 16.87 5 13C5 11.71 5.35 10.51 5.96 9.48L15.53 19.05C14.49 19.65 13.29 20 12 20V20Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
