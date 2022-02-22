import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconAddToHomeScreen } from '@aws-amplify/ui-react';` → `import { MdAddToHomeScreen } from 'react-icons/md';`
 */
export const IconAddToHomeScreen = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconAddToHomeScreen } from '@aws-amplify/ui-react'; → import { MdAddToHomeScreen } from 'react-icons/md';`,
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
          d="M18 1.01L8 1C6.9 1 6 1.9 6 3V6H8V5H18V19H8V18H6V21C6 22.1 6.9 23 8 23H18C19.1 23 20 22.1 20 21V3C20 1.9 19.1 1.01 18 1.01ZM10 15H12V8H5V10H8.59L3 15.59L4.41 17L10 11.41V15Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
