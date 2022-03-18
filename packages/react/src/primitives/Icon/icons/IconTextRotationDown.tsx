import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconTextRotationDown } from '@aws-amplify/ui-react';` → `import { MdTextRotationDown } from 'react-icons/md';`
 */
export const IconTextRotationDown = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconTextRotationDown } from '@aws-amplify/ui-react'; → import { MdTextRotationDown } from 'react-icons/md';`,
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
          d="M6 20L9 17H7V4H5V17H3L6 20ZM12.2 8.5V13.5L10 14.4V16.5L21 11.75V10.25L10 5.5V7.6L12.2 8.5ZM19.02 11L14 12.87V9.13L19.02 11Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
