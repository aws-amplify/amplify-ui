import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconWc } from '@aws-amplify/ui-react';` → `import { MdWc } from 'react-icons/md';`
 */
export const IconWc = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconWc } from '@aws-amplify/ui-react'; → import { MdWc } from 'react-icons/md';`,
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
        <g clip-path="url(#clip0_1020_41544)">
          <path
            d="M5.5 22V14.5H4V9C4 7.9 4.9 7 6 7H9C10.1 7 11 7.9 11 9V14.5H9.5V22H5.5ZM18 22V16H21L18.46 8.37C18.18 7.55 17.42 7 16.56 7H16.44C15.58 7 14.81 7.55 14.54 8.37L12 16H15V22H18ZM7.5 6C8.61 6 9.5 5.11 9.5 4C9.5 2.89 8.61 2 7.5 2C6.39 2 5.5 2.89 5.5 4C5.5 5.11 6.39 6 7.5 6ZM16.5 6C17.61 6 18.5 5.11 18.5 4C18.5 2.89 17.61 2 16.5 2C15.39 2 14.5 2.89 14.5 4C14.5 5.11 15.39 6 16.5 6Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_1020_41544">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </View>
  );
};
