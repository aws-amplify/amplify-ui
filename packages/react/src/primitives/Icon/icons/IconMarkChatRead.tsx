import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconMarkChatRead } from '@aws-amplify/ui-react';` → `import { MdMarkChatRead } from 'react-icons/md';`
 */
export const IconMarkChatRead = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconMarkChatRead } from '@aws-amplify/ui-react'; → import { MdMarkChatRead } from 'react-icons/md';`,
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
          d="M12 18H6L2 22V4C2 2.9 2.9 2 4 2H20C21.1 2 22 2.9 22 4V11H20V4H4V16H12V18ZM23 14.34L21.59 12.93L17.35 17.17L15.23 15.05L13.82 16.46L17.34 20L23 14.34Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
