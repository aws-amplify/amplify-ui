import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconControlCamera } from '@aws-amplify/ui-react';` → `import { MdControlCamera } from 'react-icons/md';`
 */
export const IconControlCamera = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconControlCamera } from '@aws-amplify/ui-react'; → import { MdControlCamera } from 'react-icons/md';`,
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
          d="M5.54 8.46L2 12L5.54 15.54L7.3 13.77L5.54 12L7.3 10.23L5.54 8.46ZM12 18.46L10.23 16.7L8.46 18.46L12 22L15.54 18.46L13.77 16.7L12 18.46ZM18.46 8.46L16.7 10.23L18.46 12L16.7 13.77L18.46 15.54L22 12L18.46 8.46ZM8.46 5.54L10.23 7.3L12 5.54L13.77 7.3L15.54 5.54L12 2L8.46 5.54Z"
          fill="currentColor"
        />
        <path
          d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
