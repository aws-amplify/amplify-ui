import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconStayCurrentPortrait } from '@aws-amplify/ui-react';` → `import { MdStayCurrentPortrait } from 'react-icons/md';`
 */
export const IconStayCurrentPortrait = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconStayCurrentPortrait } from '@aws-amplify/ui-react'; → import { MdStayCurrentPortrait } from 'react-icons/md';`,
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
          d="M17 1.01L7.00001 1C5.90001 1 5.01001 1.9 5.01001 3V21C5.01001 22.1 5.90001 23 7.00001 23H17C18.1 23 19 22.1 19 21V3C19 1.9 18.1 1.01 17 1.01ZM17 19H7.00001V5H17V19Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
