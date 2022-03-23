import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconMicOff } from '@aws-amplify/ui-react';` → `import { MdMicOff } from 'react-icons/md';`
 */
export const IconMicOff = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconMicOff } from '@aws-amplify/ui-react'; → import { MdMicOff } from 'react-icons/md';`,
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
          d="M10.8 4.9C10.8 4.24 11.34 3.7 12 3.7C12.66 3.7 13.2 4.24 13.2 4.9L13.19 8.81L15 10.6V5C15 3.34 13.66 2 12 2C10.46 2 9.21 3.16 9.04 4.65L10.8 6.41V4.9V4.9ZM19 11H17.3C17.3 11.58 17.2 12.13 17.03 12.64L18.3 13.91C18.74 13.03 19 12.04 19 11ZM4.41 2.86L3 4.27L9 10.27V11C9 12.66 10.34 14 12 14C12.23 14 12.44 13.97 12.65 13.92L14.31 15.58C13.6 15.91 12.81 16.1 12 16.1C9.24 16.1 6.7 14 6.7 11H5C5 14.41 7.72 17.23 11 17.72V21H13V17.72C13.91 17.59 14.77 17.27 15.55 16.82L19.75 21.02L21.16 19.61L4.41 2.86Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
