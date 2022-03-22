import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconPhonelinkErase } from '@aws-amplify/ui-react';` → `import { MdPhonelinkErase } from 'react-icons/md';`
 */
export const IconPhonelinkErase = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconPhonelinkErase } from '@aws-amplify/ui-react'; → import { MdPhonelinkErase } from 'react-icons/md';`,
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
          d="M13 8.2L12 7.2L8 11.2L4 7.2L3 8.2L7 12.2L3 16.2L4 17.2L8 13.2L12 17.2L13 16.2L9 12.2L13 8.2ZM19 1H9C7.9 1 7 1.9 7 3V6H9V4H19V20H9V18H7V21C7 22.1 7.9 23 9 23H19C20.1 23 21 22.1 21 21V3C21 1.9 20.1 1 19 1Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
