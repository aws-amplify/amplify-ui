import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconBorderBottom } from '@aws-amplify/ui-react';` → `import { MdBorderBottom } from 'react-icons/md';`
 */
export const IconBorderBottom = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconBorderBottom } from '@aws-amplify/ui-react'; → import { MdBorderBottom } from 'react-icons/md';`,
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
          d="M9 11H7V13H9V11ZM13 15H11V17H13V15ZM9 3H7V5H9V3ZM13 11H11V13H13V11ZM5 3H3V5H5V3ZM13 7H11V9H13V7ZM17 11H15V13H17V11ZM13 3H11V5H13V3ZM17 3H15V5H17V3ZM19 13H21V11H19V13ZM19 17H21V15H19V17ZM5 7H3V9H5V7ZM19 3V5H21V3H19ZM19 9H21V7H19V9ZM5 11H3V13H5V11ZM3 21H21V19H3V21ZM5 15H3V17H5V15Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
