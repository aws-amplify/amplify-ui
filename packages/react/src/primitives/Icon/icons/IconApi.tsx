import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconApi } from '@aws-amplify/ui-react';` → `import { MdApi } from 'react-icons/md';`
 */
export const IconApi = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconApi } from '@aws-amplify/ui-react'; → import { MdApi } from 'react-icons/md';`,
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
          d="M14 12L12 14L10 12L12 10L14 12ZM12 6L14.12 8.12L16.62 5.62L12 1L7.38 5.62L9.88 8.12L12 6ZM6 12L8.12 9.88L5.62 7.38L1 12L5.62 16.62L8.12 14.12L6 12ZM18 12L15.88 14.12L18.38 16.62L23 12L18.38 7.38L15.88 9.88L18 12ZM12 18L9.88 15.88L7.38 18.38L12 23L16.62 18.38L14.12 15.88L12 18Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
