import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconHistoryToggleOff } from '@aws-amplify/ui-react';` → `import { MdHistoryToggleOff } from 'react-icons/md';`
 */
export const IconHistoryToggleOff = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconHistoryToggleOff } from '@aws-amplify/ui-react'; → import { MdHistoryToggleOff } from 'react-icons/md';`,
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
          d="M15.1 19.3698L16.1 21.1098C15.14 21.5498 14.09 21.8398 13 21.9498V19.9298C13.74 19.8398 14.44 19.6498 15.1 19.3698ZM4.07 12.9998H2.05C2.16 14.0998 2.45 15.1398 2.89 16.0998L4.63 15.0998C4.35 14.4398 4.16 13.7398 4.07 12.9998ZM15.1 4.6298L16.1 2.8898C15.14 2.4498 14.1 2.1598 13 2.0498V4.0698C13.74 4.1598 14.44 4.3498 15.1 4.6298ZM19.93 10.9998H21.95C21.84 9.8998 21.55 8.85981 21.11 7.89981L19.37 8.8998C19.65 9.5598 19.84 10.2598 19.93 10.9998ZM8.9 19.3698L7.9 21.1098C8.86 21.5498 9.91 21.8398 11 21.9498V19.9298C10.26 19.8398 9.56 19.6498 8.9 19.3698ZM11 4.0698V2.0498C9.9 2.1598 8.86 2.4498 7.9 2.8898L8.9 4.6298C9.56 4.3498 10.26 4.1598 11 4.0698ZM18.36 7.1698L20.1 6.1598C19.47 5.2898 18.7 4.5198 17.83 3.8898L16.82 5.6298C17.41 6.0798 17.92 6.5898 18.36 7.1698ZM4.63 8.8998L2.89 7.89981C2.45 8.85981 2.16 9.8998 2.05 10.9998H4.07C4.16 10.2598 4.35 9.5598 4.63 8.8998ZM19.93 12.9998C19.84 13.7398 19.65 14.4398 19.37 15.0998L21.11 16.0998C21.55 15.1398 21.84 14.0898 21.95 12.9998H19.93V12.9998ZM16.83 18.3598L17.84 20.0998C18.71 19.4698 19.48 18.6998 20.11 17.8298L18.37 16.8198C17.92 17.4098 17.41 17.9198 16.83 18.3598ZM7.17 5.6398L6.17 3.8898C5.29 4.5298 4.53 5.2898 3.9 6.1698L5.64 7.1798C6.08 6.5898 6.59 6.0798 7.17 5.6398ZM5.64 16.8298L3.9 17.8298C4.53 18.6998 5.3 19.4698 6.17 20.0998L7.18 18.3598C6.59 17.9198 6.08 17.4098 5.64 16.8298ZM13 6.9998H11V12.4098L15.29 16.6998L16.7 15.2898L13 11.5898V6.9998Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
