import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconSmartButton } from '@aws-amplify/ui-react';` → `import { MdSmartButton } from 'react-icons/md';`
 */
export const IconSmartButton = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconSmartButton } from '@aws-amplify/ui-react'; → import { MdSmartButton } from 'react-icons/md';`,
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
          d="M22 9V15C22 16.1 21.1 17 20 17H19V15H20V9H4V15H10V17H4C2.9 17 2 16.1 2 15V9C2 7.9 2.9 7 4 7H20C21.1 7 22 7.9 22 9ZM14.5 19L15.59 16.59L18 15.5L15.59 14.41L14.5 12L13.41 14.41L11 15.5L13.41 16.59L14.5 19ZM17 14L17.62 12.62L19 12L17.62 11.38L17 10L16.38 11.38L15 12L16.38 12.62L17 14ZM14.5 19L15.59 16.59L18 15.5L15.59 14.41L14.5 12L13.41 14.41L11 15.5L13.41 16.59L14.5 19ZM17 14L17.62 12.62L19 12L17.62 11.38L17 10L16.38 11.38L15 12L16.38 12.62L17 14Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
