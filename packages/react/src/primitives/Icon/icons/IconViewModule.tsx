import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconViewModule } from '@aws-amplify/ui-react';` → `import { MdViewModule } from 'react-icons/md';`
 */
export const IconViewModule = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconViewModule } from '@aws-amplify/ui-react'; → import { MdViewModule } from 'react-icons/md';`,
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
          d="M4 5V18H21V5H4ZM14 7V10.5H11V7H14ZM6 7H9V10.5H6V7ZM6 16V12.5H9V16H6ZM11 16V12.5H14V16H11ZM19 16H16V12.5H19V16ZM16 10.5V7H19V10.5H16Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
