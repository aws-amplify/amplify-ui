import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconCleanHands } from '@aws-amplify/ui-react';` → `import { MdCleanHands } from 'react-icons/md';`
 */
export const IconCleanHands = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconCleanHands } from '@aws-amplify/ui-react'; → import { MdCleanHands } from 'react-icons/md';`,
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
          d="M16.99 5L17.62 6.37L18.99 7L17.62 7.63L16.99 9L16.36 7.63L14.99 7L16.36 6.37L16.99 5ZM20 14C21.1 14 22 13.1 22 12C22 10.9 20 8 20 8C20 8 18 10.9 18 12C18 13.1 18.9 14 20 14ZM11 6.1V4H13C13.57 4 14.1 4.17 14.55 4.45L15.98 3.02C15.15 2.39 14.13 2 13 2C11.53 2 7.56 2 7.5 2V4H9V6.11C7.22 6.48 5.8 7.79 5.25 9.5H7.41C7.94 8.61 8.89 8 10 8C11.62 8 12.94 9.29 12.99 10.9L15 11.65V11C15 8.58 13.28 6.56 11 6.1ZM22 19V20L14 22.5L7 20.56V22H1V11H8.97L15.13 13.3C16.25 13.72 17 14.8 17 16H19C20.66 16 22 17.34 22 19ZM5 20V13H3V20H5ZM19.9 18.57C19.74 18.24 19.39 18.01 19 18.01H13.65C13.11 18.01 12.58 17.92 12.07 17.75L9.69 16.96L10.32 15.06L12.7 15.85C13.01 15.95 15 16 15 16C15 15.63 14.77 15.3 14.43 15.17L8.61 13H7V18.48L13.97 20.41L19.9 18.57Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
