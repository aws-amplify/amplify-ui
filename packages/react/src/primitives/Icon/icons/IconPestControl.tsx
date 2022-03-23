import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconPestControl } from '@aws-amplify/ui-react';` → `import { MdPestControl } from 'react-icons/md';`
 */
export const IconPestControl = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconPestControl } from '@aws-amplify/ui-react'; → import { MdPestControl } from 'react-icons/md';`,
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
          d="M21 14.9998V12.9998H17.93C17.88 12.6098 17.81 12.2298 17.71 11.8598L20.29 10.3698L19.29 8.63977L16.92 9.99977C16.64 9.51977 16.3 9.08977 15.93 8.70977C16.03 8.14977 16.13 7.01977 15.35 5.81977L17 4.16977L15.59 2.75977L13.87 4.47977C12.19 3.58977 10.77 4.14977 10.14 4.47977L8.41 2.75977L7 4.16977L8.65 5.81977C7.87 7.01977 7.97 8.15977 8.07 8.70977C7.7 9.09977 7.36 9.52977 7.08 9.99977L4.71 8.62977L3.71 10.3598L6.29 11.8498C6.19 12.2198 6.12 12.5998 6.07 12.9898H3V14.9898H6.07C6.12 15.3798 6.19 15.7598 6.29 16.1298L3.71 17.6198L4.71 19.3498L7.08 17.9998C8.16 19.8098 9.96 20.9998 12 20.9998C14.04 20.9998 15.84 19.8098 16.92 17.9998L19.29 19.3698L20.29 17.6398L17.71 16.1498C17.81 15.7798 17.88 15.3998 17.93 15.0098H21V14.9998ZM12 5.99977C12.88 5.99977 13.62 6.56977 13.88 7.35977C13.29 7.12977 12.66 6.99977 12 6.99977C11.34 6.99977 10.71 7.12977 10.12 7.35977C10.38 6.56977 11.12 5.99977 12 5.99977ZM12 18.9998C9.79 18.9998 8 16.7598 8 13.9998C8 11.2398 9.79 8.99977 12 8.99977C14.21 8.99977 16 11.2398 16 13.9998C16 16.7598 14.21 18.9998 12 18.9998Z"
          fill="currentColor"
        />
        <path d="M13 11H11V17H13V11Z" fill="black" />
      </svg>
    </View>
  );
};
