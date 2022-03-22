import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconMobileScreenShare } from '@aws-amplify/ui-react';` → `import { MdMobileScreenShare } from 'react-icons/md';`
 */
export const IconMobileScreenShare = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconMobileScreenShare } from '@aws-amplify/ui-react'; → import { MdMobileScreenShare } from 'react-icons/md';`,
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
          d="M17 1H7.00001C5.90001 1 5.01001 1.85 5.01001 2.95V20.95C5.01001 22.05 5.90001 23 7.00001 23H17C18.1 23 19 22.05 19 20.95V2.95C19 1.85 18.1 1 17 1ZM17 19H7.00001V5H17V19ZM12.8 13.24V14.99L16 12L12.8 9.02V10.72C9.69001 11.15 8.45001 13.28 8.00001 15.42C9.11001 13.92 10.58 13.24 12.8 13.24V13.24Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
