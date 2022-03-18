import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconFlashOff } from '@aws-amplify/ui-react';` → `import { MdFlashOff } from 'react-icons/md';`
 */
export const IconFlashOff = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconFlashOff } from '@aws-amplify/ui-react'; → import { MdFlashOff } from 'react-icons/md';`,
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
          d="M17 10H13.39L15.67 12.28L17 10ZM17 2H7V3.61L13.13 9.74L17 2ZM3.41 2.86L2 4.27L7 9.27V13H10V22L13.58 15.85L17.73 20L19.14 18.59L3.41 2.86Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
