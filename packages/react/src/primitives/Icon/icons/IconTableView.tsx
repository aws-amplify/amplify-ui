import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconTableView } from '@aws-amplify/ui-react';` → `import { MdTableView } from 'react-icons/md';`
 */
export const IconTableView = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconTableView } from '@aws-amplify/ui-react'; → import { MdTableView } from 'react-icons/md';`,
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
          d="M19 7H9C7.9 7 7 7.9 7 9V19C7 20.1 7.9 21 9 21H19C20.1 21 21 20.1 21 19V9C21 7.9 20.1 7 19 7ZM19 9V11H9V9H19ZM13 15V13H15V15H13ZM15 17V19H13V17H15ZM11 15H9V13H11V15ZM17 13H19V15H17V13ZM9 17H11V19H9V17ZM17 19V17H19V19H17ZM6 17H5C3.9 17 3 16.1 3 15V5C3 3.9 3.9 3 5 3H15C16.1 3 17 3.9 17 5V6H15V5H5V15H6V17Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
