import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconTvOff } from '@aws-amplify/ui-react';` → `import { MdTvOff } from 'react-icons/md';`
 */
export const IconTvOff = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconTvOff } from '@aws-amplify/ui-react'; → import { MdTvOff } from 'react-icons/md';`,
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
          d="M21 7V17.88L22.85 19.73C22.94 19.5 23 19.26 23 19V7C23 5.89 22.11 5 21 5H13.42L16.71 1.7L16 1L12 5L8 1L7.3 1.7L10.58 5H8.12L10.12 7H21ZM20.46 23L21.72 21.73L20.46 22.99V23ZM2.41 2.13L2.27 2.27L1 3.54L2.53 5.07C1.65 5.28 1 6.06 1 7V19C1 20.1 1.9 21 3 21H18.46L20.45 22.99L21.71 21.73L21.86 21.58L2.41 2.13ZM3 19V7H4.46L16.46 19H3Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
