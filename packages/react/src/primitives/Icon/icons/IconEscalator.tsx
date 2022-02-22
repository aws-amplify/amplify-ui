import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconEscalator } from '@aws-amplify/ui-react';` → `import { MdEscalator } from 'react-icons/md';`
 */
export const IconEscalator = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconEscalator } from '@aws-amplify/ui-react'; → import { MdEscalator } from 'react-icons/md';`,
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
          d="M19 5V19H5V5H19ZM19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM17 6H13.7L8.7 15H7C6.17 15 5.5 15.67 5.5 16.5C5.5 17.33 6.17 18 7 18H10.3L15.3 9H17C17.83 9 18.5 8.33 18.5 7.5C18.5 6.67 17.83 6 17 6Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
