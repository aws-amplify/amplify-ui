import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconRoomPreferences } from '@aws-amplify/ui-react';` → `import { MdRoomPreferences } from 'react-icons/md';`
 */
export const IconRoomPreferences = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconRoomPreferences } from '@aws-amplify/ui-react'; → import { MdRoomPreferences } from 'react-icons/md';`,
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
          d="M21.69 16.37L22.83 15.37L21.83 13.64L20.38 14.13C20.06 13.86 19.7 13.65 19.3 13.5L19 12H17L16.7 13.49C16.3 13.64 15.94 13.85 15.62 14.12L14.17 13.63L13.17 15.36L14.31 16.36C14.23 16.86 14.23 17.12 14.31 17.62L13.17 18.62L14.17 20.35L15.62 19.86C15.94 20.13 16.3 20.34 16.7 20.49L17 22H19L19.3 20.51C19.7 20.36 20.06 20.15 20.38 19.88L21.83 20.37L22.83 18.64L21.69 17.64C21.77 17.13 21.77 16.87 21.69 16.37ZM18 19C16.9 19 16 18.1 16 17C16 15.9 16.9 15 18 15C19.1 15 20 15.9 20 17C20 18.1 19.1 19 18 19ZM19 4V10H17V6H15V12H13V5H7V19H12V21H3V19H5V3H15V4H19ZM12 13H10V11H12V13Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
