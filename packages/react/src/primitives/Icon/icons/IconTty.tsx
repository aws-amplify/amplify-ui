import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconTty } from '@aws-amplify/ui-react';` → `import { MdTty } from 'react-icons/md';`
 */
export const IconTty = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconTty } from '@aws-amplify/ui-react'; → import { MdTty } from 'react-icons/md';`,
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
          d="M16.0002 6H14.0002V4H16.0002V6ZM18.0002 7H16.0002V9H18.0002V7ZM19.0002 9H21.0002V7H19.0002V9ZM19.0002 4H17.0002V6H19.0002V4ZM15.0002 7H13.0002V9H15.0002V7ZM19.0002 10H17.0002V12H19.0002V10ZM16.0002 10H14.0002V12H16.0002V10ZM13.0002 4H11.0002V6H13.0002V4ZM20.0002 15.82V19.97C20.0002 20.53 19.5302 21 18.9702 20.97C16.0802 20.8 13.3702 19.94 11.0002 18.57C8.27017 16.99 6.01017 14.73 4.43017 12C3.05017 9.63 2.20017 6.92 2.03017 4.03C2.00017 3.47 2.47017 3 3.03017 3H7.18017C7.66017 3 8.07017 3.34 8.16017 3.8L8.90017 7.48C8.97017 7.81 8.86017 8.15 8.63017 8.38L6.10017 10.9C7.53017 13.4 9.60017 15.47 12.1002 16.9L14.6202 14.38C14.8602 14.14 15.2002 14.04 15.5202 14.11L19.1902 14.84C19.6602 14.93 20.0002 15.34 20.0002 15.82ZM5.18017 8.99L6.83017 7.34L6.36017 5H4.13017C4.30017 6.37 4.66017 7.71 5.18017 8.99ZM18.0002 16.64L15.6602 16.17L14.0102 17.82C15.2902 18.34 16.6402 18.69 18.0002 18.87V16.64ZM20.0002 4V6H22.0002V4H20.0002ZM20.0002 12H22.0002V10H20.0002V12ZM13.0002 10H11.0002V12H13.0002V10Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
