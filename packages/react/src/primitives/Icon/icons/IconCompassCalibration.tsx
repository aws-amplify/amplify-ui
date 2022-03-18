import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconCompassCalibration } from '@aws-amplify/ui-react';` → `import { MdCompassCalibration } from 'react-icons/md';`
 */
export const IconCompassCalibration = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconCompassCalibration } from '@aws-amplify/ui-react'; → import { MdCompassCalibration } from 'react-icons/md';`,
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
          d="M12 12C9.24 12 7 14.24 7 17C7 19.76 9.24 22 12 22C14.76 22 17 19.76 17 17C17 14.24 14.76 12 12 12ZM12 20C10.35 20 9 18.65 9 17C9 15.35 10.35 14 12 14C13.65 14 15 15.35 15 17C15 18.65 13.65 20 12 20ZM12 3C8.1 3 4.56 4.59 2 7.15L7 12.15C8.28 10.87 10.05 10.07 12 10.07C13.95 10.07 15.72 10.86 17 12.14L22 7.14C19.44 4.59 15.9 3 12 3ZM16.84 9.47C15.4 8.56 13.74 8.07 12 8.07C10.26 8.07 8.59 8.56 7.15 9.48L4.94 7.26C6.99 5.79 9.44 5 12 5C14.56 5 17 5.79 19.05 7.26L16.84 9.47Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
