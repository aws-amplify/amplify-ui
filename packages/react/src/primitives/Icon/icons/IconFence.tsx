import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconFence } from '@aws-amplify/ui-react';` → `import { MdFence } from 'react-icons/md';`
 */
export const IconFence = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconFence } from '@aws-amplify/ui-react'; → import { MdFence } from 'react-icons/md';`,
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
          d="M21 12V10H19V7L16 4L14 6L12 4L10 6L8 4L5 7V10H3V12H5V14H3V16H5V20H19V16H21V14H19V12H21ZM16 6.83L17 7.83V10H15V7.83L15.41 7.42L16 6.83ZM12 6.83L12.59 7.42L13 7.83V10H11V7.83L11.41 7.42L12 6.83ZM11 14V12H13V14H11ZM13 16V18H11V16H13ZM7 7.83L8 6.83L8.59 7.42L9 7.83V10H7V7.83ZM7 12H9V14H7V12ZM7 16H9V18H7V16ZM17 18H15V16H17V18ZM17 14H15V12H17V14Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
