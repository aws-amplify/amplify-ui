import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconTheaters } from '@aws-amplify/ui-react';` → `import { MdTheaters } from 'react-icons/md';`
 */
export const IconTheaters = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconTheaters } from '@aws-amplify/ui-react'; → import { MdTheaters } from 'react-icons/md';`,
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
          d="M18 3V5H16V3H8V5H6V3H4V21H6V19H8V21H16V19H18V21H20V3H18ZM8 17H6V15H8V17ZM8 13H6V11H8V13ZM8 9H6V7H8V9ZM14 19H10V5H14V19ZM18 17H16V15H18V17ZM18 13H16V11H18V13ZM18 9H16V7H18V9Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
