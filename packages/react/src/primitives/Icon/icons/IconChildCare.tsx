import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconChildCare } from '@aws-amplify/ui-react';` → `import { MdChildCare } from 'react-icons/md';`
 */
export const IconChildCare = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconChildCare } from '@aws-amplify/ui-react'; → import { MdChildCare } from 'react-icons/md';`,
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
          d="M14.5 11.75C15.1904 11.75 15.75 11.1904 15.75 10.5C15.75 9.80964 15.1904 9.25 14.5 9.25C13.8096 9.25 13.25 9.80964 13.25 10.5C13.25 11.1904 13.8096 11.75 14.5 11.75Z"
          fill="currentColor"
        />
        <path
          d="M9.5 11.75C10.1904 11.75 10.75 11.1904 10.75 10.5C10.75 9.80964 10.1904 9.25 9.5 9.25C8.80964 9.25 8.25 9.80964 8.25 10.5C8.25 11.1904 8.80964 11.75 9.5 11.75Z"
          fill="black"
        />
        <path
          d="M22.94 11.34C22.69 9.83 21.58 8.6 20.13 8.17C19.6 7.05 18.85 6.07 17.94 5.26C16.36 3.85 14.28 3 12 3C9.72 3 7.64 3.85 6.06 5.26C5.14 6.07 4.39 7.06 3.87 8.17C2.42 8.6 1.31 9.82 1.06 11.34C1.02 11.55 1 11.77 1 12C1 12.23 1.02 12.45 1.06 12.66C1.31 14.17 2.42 15.4 3.87 15.83C4.39 16.94 5.14 17.92 6.04 18.72C7.62 20.14 9.71 21 12 21C14.29 21 16.38 20.14 17.97 18.72C18.87 17.92 19.62 16.93 20.14 15.83C21.58 15.4 22.69 14.18 22.94 12.66C22.98 12.45 23 12.23 23 12C23 11.77 22.98 11.55 22.94 11.34V11.34ZM19 14C18.9 14 18.81 13.98 18.71 13.97C18.51 14.64 18.22 15.26 17.85 15.83C16.6 17.74 14.45 19 12 19C9.55 19 7.4 17.74 6.15 15.83C5.78 15.26 5.49 14.64 5.29 13.97C5.19 13.98 5.1 14 5 14C3.9 14 3 13.1 3 12C3 10.9 3.9 10 5 10C5.1 10 5.19 10.02 5.29 10.03C5.49 9.36 5.78 8.74 6.15 8.17C7.4 6.26 9.55 5 12 5C14.45 5 16.6 6.26 17.85 8.17C18.22 8.74 18.51 9.36 18.71 10.03C18.81 10.02 18.9 10 19 10C20.1 10 21 10.9 21 12C21 13.1 20.1 14 19 14ZM12 17C14.01 17 15.74 15.77 16.5 14H7.5C8.26 15.77 9.99 17 12 17Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
