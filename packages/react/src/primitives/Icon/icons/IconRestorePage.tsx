import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconRestorePage } from '@aws-amplify/ui-react';` → `import { MdRestorePage } from 'react-icons/md';`
 */
export const IconRestorePage = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconRestorePage } from '@aws-amplify/ui-react'; → import { MdRestorePage } from 'react-icons/md';`,
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
          d="M14 2H6C4.9 2 4.01 2.9 4.01 4L4 20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13.17L18 8.83V20ZM8.45 10.57L7.28 9.4V13H10.88L9.44 11.56C9.96 10.55 11.02 9.85 12.23 9.85C13.97 9.85 15.38 11.26 15.38 13C15.38 14.74 13.97 16.15 12.23 16.15C11.16 16.15 10.21 15.61 9.65 14.8H8.1C8.79 16.38 10.38 17.5 12.22 17.5C14.7 17.5 16.72 15.48 16.72 13C16.72 10.52 14.7 8.5 12.22 8.5C10.63 8.5 9.25 9.33 8.45 10.57V10.57Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
