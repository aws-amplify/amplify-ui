import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconMeetingRoom } from '@aws-amplify/ui-react';` → `import { MdMeetingRoom } from 'react-icons/md';`
 */
export const IconMeetingRoom = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconMeetingRoom } from '@aws-amplify/ui-react'; → import { MdMeetingRoom } from 'react-icons/md';`,
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
          d="M19 19V4H15V3H5V19H3V21H15V6H17V21H21V19H19ZM13 19H7V5H13V19ZM10 11H12V13H10V11Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
