import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconRotateRight } from '@aws-amplify/ui-react';` → `import { MdRotateRight } from 'react-icons/md';`
 */
export const IconRotateRight = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconRotateRight } from '@aws-amplify/ui-react'; → import { MdRotateRight } from 'react-icons/md';`,
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
          d="M15.55 5.55L11 1V4.07C7.06 4.56 4 7.92 4 12C4 16.08 7.05 19.44 11 19.93V17.91C8.16 17.43 6 14.97 6 12C6 9.03 8.16 6.57 11 6.09V10L15.55 5.55ZM19.93 11C19.76 9.61 19.21 8.27 18.31 7.11L16.89 8.53C17.43 9.28 17.77 10.13 17.91 11H19.93ZM13 17.9V19.92C14.39 19.75 15.74 19.21 16.9 18.31L15.46 16.87C14.71 17.41 13.87 17.76 13 17.9ZM16.89 15.48L18.31 16.89C19.21 15.73 19.76 14.39 19.93 13H17.91C17.77 13.87 17.43 14.72 16.89 15.48V15.48Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
