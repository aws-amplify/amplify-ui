import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconOutdoorGrill } from '@aws-amplify/ui-react';` → `import { MdOutdoorGrill } from 'react-icons/md';`
 */
export const IconOutdoorGrill = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconOutdoorGrill } from '@aws-amplify/ui-react'; → import { MdOutdoorGrill } from 'react-icons/md';`,
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
          d="M17 22C18.66 22 20 20.66 20 19C20 17.34 18.66 16 17 16C15.7 16 14.6 16.84 14.18 18H9.14L11.13 14.94C11.42 14.98 11.71 15 12 15C12.29 15 12.58 14.98 12.87 14.94L13.89 16.51C14.31 15.98 14.85 15.56 15.49 15.3L14.89 14.37C17.31 13.27 19 10.84 19 8H5C5 10.84 6.69 13.27 9.12 14.37L5.17 20.45C4.87 20.91 5 21.53 5.46 21.83C5.92 22.13 6.54 22 6.84 21.54L7.84 19.99H14.18C14.6 21.16 15.7 22 17 22ZM17 18C17.55 18 18 18.45 18 19C18 19.55 17.55 20 17 20C16.45 20 16 19.55 16 19C16 18.45 16.45 18 17 18ZM7.42 10H16.58C15.81 11.76 14.04 13 12 13C9.96 13 8.19 11.76 7.42 10Z"
          fill="currentColor"
        />
        <path
          d="M9.41001 7H10.41C10.56 5.85 10.64 5.36 9.52001 4.04C9.10001 3.54 8.84001 3.27 9.06001 2H8.07001C7.86001 3.11 8.10001 4.05 8.96001 4.96C9.18001 5.2 9.75001 5.63 9.41001 7Z"
          fill="black"
        />
        <path
          d="M11.89 7H12.89C13.04 5.85 13.12 5.36 12 4.04C11.58 3.54 11.32 3.26 11.54 2H10.55C10.34 3.11 10.58 4.05 11.44 4.96C11.67 5.2 12.24 5.63 11.89 7Z"
          fill="black"
        />
        <path
          d="M14.41 7H15.41C15.56 5.85 15.64 5.36 14.52 4.04C14.1 3.54 13.84 3.27 14.06 2H13.07C12.86 3.11 13.1 4.05 13.96 4.96C14.18 5.2 14.75 5.63 14.41 7Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
