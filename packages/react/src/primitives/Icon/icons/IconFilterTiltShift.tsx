import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconFilterTiltShift } from '@aws-amplify/ui-react';` → `import { MdFilterTiltShift } from 'react-icons/md';`
 */
export const IconFilterTiltShift = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconFilterTiltShift } from '@aws-amplify/ui-react'; → import { MdFilterTiltShift } from 'react-icons/md';`,
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
          d="M11 4.0698V2.0498C8.99005 2.2498 7.16005 3.0498 5.68005 4.2598L7.10005 5.6898C8.21005 4.8298 9.54005 4.2498 11 4.0698ZM18.32 4.2598C16.84 3.0498 15.01 2.2498 13 2.0498V4.0698C14.46 4.2498 15.79 4.8298 16.9 5.6898L18.32 4.2598ZM19.93 10.9998H21.9501C21.7501 8.9898 20.95 7.1598 19.74 5.6798L18.31 7.0998C19.17 8.2098 19.75 9.5398 19.93 10.9998ZM5.69005 7.0998L4.26005 5.6798C3.05005 7.1598 2.25005 8.9898 2.05005 10.9998H4.07005C4.25005 9.5398 4.83005 8.2098 5.69005 7.0998ZM4.07005 12.9998H2.05005C2.25005 15.0098 3.05005 16.8398 4.26005 18.3198L5.69005 16.8898C4.83005 15.7898 4.25005 14.4598 4.07005 12.9998V12.9998ZM15 11.9998C15 10.3398 13.66 8.9998 12 8.9998C10.34 8.9998 9.00005 10.3398 9.00005 11.9998C9.00005 13.6598 10.34 14.9998 12 14.9998C13.66 14.9998 15 13.6598 15 11.9998ZM18.31 16.8998L19.74 18.3298C20.95 16.8498 21.7501 15.0098 21.9501 13.0098H19.93C19.75 14.4598 19.17 15.7898 18.31 16.8998ZM13 19.9298V21.9498C15.01 21.7498 16.84 20.9498 18.32 19.7398L16.89 18.3098C15.79 19.1698 14.46 19.7498 13 19.9298ZM5.68005 19.7398C7.16005 20.9498 9.00005 21.7498 11 21.9498V19.9298C9.54005 19.7498 8.21005 19.1698 7.10005 18.3098L5.68005 19.7398Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
