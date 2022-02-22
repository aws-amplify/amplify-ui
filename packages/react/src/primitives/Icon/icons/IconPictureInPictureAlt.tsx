import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconPictureInPictureAlt } from '@aws-amplify/ui-react';` → `import { MdPictureInPictureAlt } from 'react-icons/md';`
 */
export const IconPictureInPictureAlt = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconPictureInPictureAlt } from '@aws-amplify/ui-react'; → import { MdPictureInPictureAlt } from 'react-icons/md';`,
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
          d="M19 11H11V17H19V11ZM17 15H13V13H17V15ZM21 3H3C1.9 3 1 3.88 1 4.98V19C1 20.1 1.9 21 3 21H21C22.1 21 23 20.1 23 19V4.98C23 3.88 22.1 3 21 3ZM21 19.02H3V4.97H21V19.02Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
