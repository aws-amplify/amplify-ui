import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconStarRate } from '@aws-amplify/ui-react';` → `import { MdStarRate } from 'react-icons/md';`
 */
export const IconStarRate = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconStarRate } from '@aws-amplify/ui-react'; → import { MdStarRate } from 'react-icons/md';`,
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
          d="M12 8.89L12.94 12H15.76L13.49 13.62L14.42 16.63L12 14.79L9.58 16.63L10.51 13.62L8.24 12H11.06L12 8.89ZM12 2L9.58 10H2L8.17 14.41L5.83 22L12 17.31L18.18 22L15.83 14.41L22 10H14.42L12 2Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
