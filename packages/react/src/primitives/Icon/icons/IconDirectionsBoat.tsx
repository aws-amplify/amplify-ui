import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconDirectionsBoat } from '@aws-amplify/ui-react';` → `import { MdDirectionsBoat } from 'react-icons/md';`
 */
export const IconDirectionsBoat = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconDirectionsBoat } from '@aws-amplify/ui-react'; → import { MdDirectionsBoat } from 'react-icons/md';`,
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
          d="M12.9999 3V4H10.9999V3H12.9999ZM11.9999 10.11L17.3799 11.88L19.7699 12.66L18.6499 16.63C18.1099 16.33 17.7099 15.92 17.5099 15.69L15.9999 13.96L14.4899 15.68C14.1499 16.08 13.2099 17 11.9999 17C10.7899 17 9.84989 16.08 9.50989 15.68L7.99989 13.96L6.48989 15.68C6.28989 15.91 5.88989 16.31 5.34989 16.61L4.21989 12.65L6.61989 11.86L11.9999 10.11ZM14.9999 1H8.99989V4H5.99989C4.89989 4 3.99989 4.9 3.99989 6V10.62L2.70989 11.04C2.44989 11.12 2.22989 11.3 2.10989 11.54C1.98989 11.78 1.95989 12.06 2.04989 12.32L3.94989 19H3.99989C5.59989 19 7.01989 18.12 7.99989 17C8.97989 18.12 10.3999 19 11.9999 19C13.5999 19 15.0199 18.12 15.9999 17C16.9799 18.12 18.3999 19 19.9999 19H20.0499L21.9399 12.32C22.0199 12.06 21.9999 11.78 21.8799 11.54C21.7599 11.3 21.5399 11.12 21.2799 11.04L19.9999 10.62V6C19.9999 4.9 19.0999 4 17.9999 4H14.9999V1ZM5.99989 9.97V6H17.9999V9.97L11.9999 8L5.99989 9.97ZM15.9999 19.68C14.7799 20.53 13.3899 20.96 11.9999 20.96C10.6099 20.96 9.21989 20.53 7.99989 19.68C6.77989 20.53 5.38989 21 3.99989 21H1.99989V23H3.99989C5.37989 23 6.73989 22.65 7.99989 22.01C9.25989 22.65 10.6299 22.98 11.9999 22.98C13.3699 22.98 14.7399 22.66 15.9999 22.01C17.2599 22.66 18.6199 23 19.9999 23H21.9999V21H19.9999C18.6099 21 17.2199 20.53 15.9999 19.68Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
