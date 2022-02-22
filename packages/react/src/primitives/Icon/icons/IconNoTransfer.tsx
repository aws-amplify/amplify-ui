import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconNoTransfer } from '@aws-amplify/ui-react';` → `import { MdNoTransfer } from 'react-icons/md';`
 */
export const IconNoTransfer = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconNoTransfer } from '@aws-amplify/ui-react'; → import { MdNoTransfer } from 'react-icons/md';`,
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
          d="M8.50014 13C9.33014 13 10.0001 13.67 10.0001 14.5C10.0001 15.33 9.33014 16 8.50014 16C7.67014 16 7.00014 15.33 7.00014 14.5C7.00014 13.67 7.67014 13 8.50014 13ZM19.7801 22.61L18.1401 20.97C18.0901 20.98 18.0501 21 18.0001 21H17.0001C16.4501 21 16.0001 20.55 16.0001 20V19H8.00014V20C8.00014 20.55 7.55014 21 7.00014 21H6.00014C5.45014 21 5.00014 20.55 5.00014 20V18.22C4.39014 17.67 4.00014 16.88 4.00014 16V6.83L1.39014 4.22L2.80014 2.81L21.1801 21.19L19.7801 22.61ZM6.00014 8.83V10H7.17014L6.00014 8.83ZM14.1701 17L9.17014 12H6.00014V16C6.00014 16.37 6.21014 16.62 6.34014 16.73L6.63014 17H14.1701ZM12.0001 4C15.6901 4 17.1101 4.46 17.6601 4.99H7.82014L9.82014 6.99H18.0001V10H12.8301L14.8301 12H18.0001V15.17L19.8101 16.98C19.9201 16.67 20.0001 16.35 20.0001 16V6C20.0001 2.5 16.4201 2 12.0001 2C9.48014 2 7.24014 2.16 5.78014 2.95L7.31014 4.48C8.17014 4.2 9.60014 4 12.0001 4Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
