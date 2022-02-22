import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconKeyboardTab } from '@aws-amplify/ui-react';` → `import { MdKeyboardTab } from 'react-icons/md';`
 */
export const IconKeyboardTab = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconKeyboardTab } from '@aws-amplify/ui-react'; → import { MdKeyboardTab } from 'react-icons/md';`,
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
          d="M11.59 7.41L15.17 11H1V13H15.17L11.58 16.59L13 18L19 12L13 6L11.59 7.41ZM20 6V18H22V6H20Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
