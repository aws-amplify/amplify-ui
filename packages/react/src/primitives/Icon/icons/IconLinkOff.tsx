import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconLinkOff } from '@aws-amplify/ui-react';` → `import { MdLinkOff } from 'react-icons/md';`
 */
export const IconLinkOff = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconLinkOff } from '@aws-amplify/ui-react'; → import { MdLinkOff } from 'react-icons/md';`,
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
          d="M14.39 10.9999L16 12.6099V10.9999H14.39ZM17 6.99986H13V8.89986H17C18.71 8.89986 20.1 10.2899 20.1 11.9999C20.1 13.2699 19.33 14.3699 18.23 14.8399L19.63 16.2399C21.05 15.3599 22 13.7899 22 11.9999C22 9.23986 19.76 6.99986 17 6.99986ZM2 4.26986L5.11 7.37986C3.29 8.11986 2 9.90986 2 11.9999C2 14.7599 4.24 16.9999 7 16.9999H11V15.0999H7C5.29 15.0999 3.9 13.7099 3.9 11.9999C3.9 10.4099 5.11 9.09986 6.66 8.92986L8.73 10.9999H8V12.9999H10.73L13 15.2699V16.9999H14.73L18.74 21.0099L20.15 19.5999L3.41 2.85986L2 4.26986Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
