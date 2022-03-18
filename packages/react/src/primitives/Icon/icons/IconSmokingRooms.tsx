import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconSmokingRooms } from '@aws-amplify/ui-react';` → `import { MdSmokingRooms } from 'react-icons/md';`
 */
export const IconSmokingRooms = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconSmokingRooms } from '@aws-amplify/ui-react'; → import { MdSmokingRooms } from 'react-icons/md';`,
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
          d="M18 16H19.5V19H18V16ZM2 16H17V19H2V16ZM16.03 10.2H14.5C13.48 10.2 12.65 9.22 12.65 8.2C12.65 7.18 13.48 6.45 14.5 6.45V4.95C12.65 4.95 11.15 6.45 11.15 8.3C11.15 10.15 12.65 11.65 14.5 11.65H16.03C17.08 11.65 18 12.39 18 13.7V15H19.5V13.36C19.5 11.55 17.9 10.2 16.03 10.2ZM20.5 16H22V19H20.5V16ZM18.85 7.73C19.47 7.12 19.85 6.28 19.85 5.35C19.85 3.5 18.35 2 16.5 2V3.5C17.52 3.5 18.35 4.33 18.35 5.35C18.35 6.37 17.52 7.2 16.5 7.2V8.7C18.74 8.7 20.5 10.53 20.5 12.77V15H22V12.76C22 10.54 20.72 8.62 18.85 7.73V7.73Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
