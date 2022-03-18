import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconMotionPhotosOn } from '@aws-amplify/ui-react';` → `import { MdMotionPhotosOn } from 'react-icons/md';`
 */
export const IconMotionPhotosOn = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconMotionPhotosOn } from '@aws-amplify/ui-react'; → import { MdMotionPhotosOn } from 'react-icons/md';`,
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
          d="M10 16.5V7.5L16 12L10 16.5ZM22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 10.81 2.22 9.68 2.6 8.62L4.48 9.3C4.17 10.14 4 11.05 4 12C4 16.41 7.59 20 12 20C16.41 20 20 16.41 20 12C20 7.59 16.41 4 12 4C11.05 4 10.15 4.17 9.31 4.48L8.63 2.59C9.69 2.22 10.82 2 12 2C17.52 2 22 6.48 22 12ZM5.5 4C4.67 4 4 4.67 4 5.5C4 6.33 4.67 7 5.5 7C6.33 7 7 6.33 7 5.5C7 4.67 6.33 4 5.5 4Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
