import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconStyle } from '@aws-amplify/ui-react';` → `import { MdStyle } from 'react-icons/md';`
 */
export const IconStyle = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconStyle } from '@aws-amplify/ui-react'; → import { MdStyle } from 'react-icons/md';`,
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
          d="M2.5301 19.65L3.8701 20.21V11.18L1.4401 17.04C1.0301 18.06 1.5201 19.23 2.5301 19.65V19.65ZM22.0301 15.95L17.0701 3.98C16.7601 3.23 16.0301 2.77 15.2601 2.75C15.0001 2.75 14.7301 2.79 14.4701 2.9L7.1001 5.95C6.3501 6.26 5.8901 6.98 5.8701 7.75C5.8601 8.02 5.9101 8.29 6.0201 8.55L10.9801 20.52C11.2901 21.28 12.0301 21.74 12.8101 21.75C13.0701 21.75 13.3301 21.7 13.5801 21.6L20.9401 18.55C21.9601 18.13 22.4501 16.96 22.0301 15.95V15.95ZM12.8301 19.75L7.8701 7.79L15.2201 4.75H15.2301L20.1801 16.7L12.8301 19.75V19.75Z"
          fill="currentColor"
        />
        <path
          d="M11 10C11.5523 10 12 9.55228 12 9C12 8.44772 11.5523 8 11 8C10.4477 8 10 8.44772 10 9C10 9.55228 10.4477 10 11 10Z"
          fill="black"
        />
        <path
          d="M5.87988 19.7502C5.87988 20.8502 6.77988 21.7502 7.87988 21.7502H9.32988L5.87988 13.4102V19.7502Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
