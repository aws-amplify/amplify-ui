import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconBorderRight } from '@aws-amplify/ui-react';` → `import { MdBorderRight } from 'react-icons/md';`
 */
export const IconBorderRight = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconBorderRight } from '@aws-amplify/ui-react'; → import { MdBorderRight } from 'react-icons/md';`,
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
          d="M7 21H9V19H7V21ZM3 5H5V3H3V5ZM7 5H9V3H7V5ZM7 13H9V11H7V13ZM3 21H5V19H3V21ZM11 21H13V19H11V21ZM3 13H5V11H3V13ZM3 17H5V15H3V17ZM3 9H5V7H3V9ZM11 17H13V15H11V17ZM15 13H17V11H15V13ZM19 3V21H21V3H19ZM15 21H17V19H15V21ZM15 5H17V3H15V5ZM11 13H13V11H11V13ZM11 5H13V3H11V5ZM11 9H13V7H11V9Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
