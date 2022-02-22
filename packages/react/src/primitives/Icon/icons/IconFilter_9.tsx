import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconFilter_9 } from '@aws-amplify/ui-react';` → `import { MdFilter_9 } from 'react-icons/md';`
 */
export const IconFilter_9 = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconFilter_9 } from '@aws-amplify/ui-react'; → import { MdFilter_9 } from 'react-icons/md';`,
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
          d="M3 5H1V21C1 22.1 1.9 23 3 23H19V21H3V5ZM21 1H7C5.9 1 5 1.9 5 3V17C5 18.1 5.9 19 7 19H21C22.1 19 23 18.1 23 17V3C23 1.9 22.1 1 21 1ZM21 17H7V3H21V17ZM15 5H13C11.9 5 11 5.89 11 7V9C11 10.11 11.9 11 13 11H15V13H11V15H15C16.1 15 17 14.11 17 13V7C17 5.89 16.1 5 15 5ZM15 9H13V7H15V9Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
