import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconToc } from '@aws-amplify/ui-react';` → `import { MdToc } from 'react-icons/md';`
 */
export const IconToc = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconToc } from '@aws-amplify/ui-react'; → import { MdToc } from 'react-icons/md';`,
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
          d="M3 9H17V7H3V9ZM3 13H17V11H3V13ZM3 17H17V15H3V17ZM19 17H21V15H19V17ZM19 7V9H21V7H19ZM19 13H21V11H19V13Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
