import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconWineBar } from '@aws-amplify/ui-react';` → `import { MdWineBar } from 'react-icons/md';`
 */
export const IconWineBar = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconWineBar } from '@aws-amplify/ui-react'; → import { MdWineBar } from 'react-icons/md';`,
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
          d="M6 3V9C6 11.97 8.16 14.43 11 14.91V19H8V21H16V19H13V14.91C15.84 14.43 18 11.97 18 9V3H6ZM12 13C10.14 13 8.59 11.72 8.14 10H15.86C15.41 11.72 13.86 13 12 13ZM16 8H8V5H16V8Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
