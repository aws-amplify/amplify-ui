import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconViewSidebar } from '@aws-amplify/ui-react';` → `import { MdViewSidebar } from 'react-icons/md';`
 */
export const IconViewSidebar = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconViewSidebar } from '@aws-amplify/ui-react'; → import { MdViewSidebar } from 'react-icons/md';`,
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
          d="M2 4V20H22V4H2ZM20 8.67H17.5V6H20V8.67ZM17.5 10.67H20V13.34H17.5V10.67ZM4 6H15.5V18H4V6ZM17.5 18V15.33H20V18H17.5Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
