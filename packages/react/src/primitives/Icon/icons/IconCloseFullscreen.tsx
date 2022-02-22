import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconCloseFullscreen } from '@aws-amplify/ui-react';` → `import { MdCloseFullscreen } from 'react-icons/md';`
 */
export const IconCloseFullscreen = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconCloseFullscreen } from '@aws-amplify/ui-react'; → import { MdCloseFullscreen } from 'react-icons/md';`,
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
          d="M22 3.41L16.71 8.7L20 12H12V4L15.29 7.29L20.59 2L22 3.41ZM3.41 22L8.7 16.71L12 20V12H4L7.29 15.29L2 20.59L3.41 22Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
