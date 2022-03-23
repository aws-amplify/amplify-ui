import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconLocalFlorist } from '@aws-amplify/ui-react';` → `import { MdLocalFlorist } from 'react-icons/md';`
 */
export const IconLocalFlorist = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconLocalFlorist } from '@aws-amplify/ui-react'; → import { MdLocalFlorist } from 'react-icons/md';`,
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
          d="M8.66 13.07C8.81 13.07 8.95 13.06 9.09 13.04C9.56 14.19 10.69 15 12 15C13.31 15 14.44 14.19 14.91 13.04C15.05 13.06 15.2 13.07 15.34 13.07C17.07 13.07 18.48 11.66 18.48 9.93C18.48 9.22 18.23 8.54 17.81 8C18.24 7.46 18.48 6.78 18.48 6.07C18.48 4.34 17.07 2.93 15.34 2.93C15.19 2.93 15.05 2.94 14.91 2.96C14.44 1.81 13.31 1 12 1C10.69 1 9.56 1.81 9.09 2.96C8.95 2.94 8.8 2.93 8.66 2.93C6.93 2.93 5.52 4.34 5.52 6.07C5.52 6.78 5.77 7.46 6.19 8C5.76 8.54 5.51 9.22 5.51 9.93C5.51 11.66 6.92 13.07 8.66 13.07ZM12 13C11.38 13 10.88 12.51 10.86 11.9L10.98 10.81C11.3 10.93 11.64 11 12 11C12.36 11 12.71 10.93 13.03 10.81L13.14 11.9C13.12 12.51 12.62 13 12 13V13ZM15.34 11.07C15.1 11.07 14.88 11 14.7 10.87L13.89 10.3C14.44 9.85 14.83 9.21 14.95 8.47L15.83 8.89C16.23 9.08 16.49 9.48 16.49 9.92C16.49 10.56 15.97 11.07 15.34 11.07V11.07ZM14.69 5.13C14.89 5 15.11 4.93 15.34 4.93C15.97 4.93 16.48 5.44 16.48 6.07C16.48 6.51 16.23 6.9 15.82 7.1L14.94 7.52C14.82 6.78 14.43 6.14 13.87 5.69L14.69 5.13V5.13ZM12 3C12.62 3 13.12 3.49 13.14 4.1L13.03 5.19C12.71 5.07 12.36 5 12 5C11.64 5 11.3 5.07 10.98 5.19L10.86 4.1C10.88 3.49 11.38 3 12 3V3ZM8.66 4.93C8.9 4.93 9.12 5 9.3 5.13L10.11 5.69C9.56 6.14 9.17 6.78 9.05 7.52L8.17 7.1C7.77 6.9 7.51 6.51 7.51 6.07C7.51 5.44 8.03 4.93 8.66 4.93ZM8.17 8.9L9.05 8.48C9.17 9.22 9.56 9.86 10.12 10.31L9.31 10.86C9.11 10.99 8.89 11.06 8.66 11.06C8.03 11.06 7.52 10.55 7.52 9.92C7.51 9.49 7.77 9.1 8.17 8.9ZM12 22C16.97 22 21 17.97 21 13C16.03 13 12 17.03 12 22ZM14.44 19.56C15.15 17.66 16.66 16.14 18.56 15.44C17.85 17.34 16.34 18.85 14.44 19.56V19.56ZM3 13C3 17.97 7.03 22 12 22C12 17.03 7.97 13 3 13ZM5.44 15.44C7.34 16.15 8.86 17.66 9.56 19.56C7.66 18.85 6.15 17.34 5.44 15.44V15.44Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
