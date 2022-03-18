import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconHighlightAlt } from '@aws-amplify/ui-react';` → `import { MdHighlightAlt } from 'react-icons/md';`
 */
export const IconHighlightAlt = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconHighlightAlt } from '@aws-amplify/ui-react'; → import { MdHighlightAlt } from 'react-icons/md';`,
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
          d="M17 5H15V3H17V5ZM15 15V21L17.29 18.71L19.59 21L21 19.59L18.71 17.3L21 15H15ZM19 9H21V7H19V9ZM19 13H21V11H19V13ZM11 21H13V19H11V21ZM7 5H9V3H7V5ZM3 17H5V15H3V17ZM5 21V19H3C3 20.1 3.9 21 5 21ZM19 3V5H21C21 3.9 20.1 3 19 3ZM11 5H13V3H11V5ZM3 9H5V7H3V9ZM7 21H9V19H7V21ZM3 13H5V11H3V13ZM3 5H5V3C3.9 3 3 3.9 3 5Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
