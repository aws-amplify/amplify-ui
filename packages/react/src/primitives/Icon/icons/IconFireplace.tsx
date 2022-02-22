import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconFireplace } from '@aws-amplify/ui-react';` → `import { MdFireplace } from 'react-icons/md';`
 */
export const IconFireplace = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconFireplace } from '@aws-amplify/ui-react'; → import { MdFireplace } from 'react-icons/md';`,
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
          d="M12.0101 12.46C11.8601 12.88 11.8601 13.28 11.9301 13.74C12.0301 14.29 12.2601 14.78 12.1301 15.34C12.0001 15.93 11.3601 16.72 10.6001 16.97C11.8801 18.02 13.8001 17.34 13.9901 15.65C14.1601 14.11 12.5501 13.67 12.0101 12.46Z"
          fill="currentColor"
        />
        <path
          d="M2 2V22H22V2H2ZM12 18C10.42 18 9.03 16.12 9 14.94C9 14.89 8.99 14.81 8.99 14.72C8.86 12.99 9.99 11.52 11.46 10.35C11.93 11.36 12.73 12.38 14.03 13.27C14.61 13.69 15 14.13 15 15C15 16.65 13.65 18 12 18ZM20 20H18V18H15.98C16.61 17.16 17 16.13 17 15C17 13.11 15.91 12.15 15.15 11.63C12.2 9.61 13 7 13 7C6.27 10.57 6.98 14.47 7 15C7.03 15.96 7.49 17.07 8.23 18H6V20H4V4H20V20Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
