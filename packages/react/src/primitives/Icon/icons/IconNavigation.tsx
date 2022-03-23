import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconNavigation } from '@aws-amplify/ui-react';` → `import { MdNavigation } from 'react-icons/md';`
 */
export const IconNavigation = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconNavigation } from '@aws-amplify/ui-react'; → import { MdNavigation } from 'react-icons/md';`,
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
          d="M12 7.27L16.28 17.7L12.81 16.17L12 15.81L11.19 16.17L7.72 17.7L12 7.27ZM12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
