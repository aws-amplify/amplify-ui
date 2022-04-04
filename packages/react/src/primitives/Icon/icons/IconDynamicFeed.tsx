import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconDynamicFeed } from '@aws-amplify/ui-react';` → `import { MdDynamicFeed } from 'react-icons/md';`
 */
export const IconDynamicFeed = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconDynamicFeed } from '@aws-amplify/ui-react'; → import { MdDynamicFeed } from 'react-icons/md';`,
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
        <path d="M8 8H6V15C6 16.1 6.9 17 8 17H17V15H8V8Z" fill="currentColor" />
        <path
          d="M20 3H12C10.9 3 10 3.9 10 5V11C10 12.1 10.9 13 12 13H20C21.1 13 22 12.1 22 11V5C22 3.9 21.1 3 20 3ZM20 11H12V7H20V11Z"
          fill="black"
        />
        <path d="M4 12H2V19C2 20.1 2.9 21 4 21H13V19H4V12Z" fill="black" />
      </svg>
    </View>
  );
};
