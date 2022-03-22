import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconCameraRoll } from '@aws-amplify/ui-react';` → `import { MdCameraRoll } from 'react-icons/md';`
 */
export const IconCameraRoll = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconCameraRoll } from '@aws-amplify/ui-react'; → import { MdCameraRoll } from 'react-icons/md';`,
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
          d="M14 5C14 3.9 13.1 3 12 3H11V2C11 1.45 10.55 1 10 1H6C5.45 1 5 1.45 5 2V3H4C2.9 3 2 3.9 2 5V20C2 21.1 2.9 22 4 22H12C13.1 22 14 21.1 14 20H22V5H14ZM20 18H12V20H4V5H7V3H9V5H12V7H20V18ZM9 15H11V17H9V15ZM9 8H11V10H9V8ZM13 15H15V17H13V15ZM13 8H15V10H13V8ZM17 15H19V17H17V15ZM17 8H19V10H17V8Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
