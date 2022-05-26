import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconTabletAndroid } from '@aws-amplify/ui-react';` → `import { MdTabletAndroid } from 'react-icons/md';`
 */
export const IconTabletAndroid = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconTabletAndroid } from '@aws-amplify/ui-react'; → import { MdTabletAndroid } from 'react-icons/md';`,
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
          d="M18 0H6C4.34 0 3 1.34 3 3V21C3 22.66 4.34 24 6 24H18C19.66 24 21 22.66 21 21V3C21 1.34 19.66 0 18 0ZM14 22H10V21H14V22ZM19.25 19H4.75V3H19.25V19Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
