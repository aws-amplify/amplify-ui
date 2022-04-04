import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconFlashAuto } from '@aws-amplify/ui-react';` → `import { MdFlashAuto } from 'react-icons/md';`
 */
export const IconFlashAuto = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconFlashAuto } from '@aws-amplify/ui-react'; → import { MdFlashAuto } from 'react-icons/md';`,
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
          d="M3 2V14H6V23L13 11H9L13 2H3ZM19 2H17L13.8 11H15.7L16.4 9H19.6L20.3 11H22.2L19 2ZM16.85 7.65L18 4L19.15 7.65H16.85V7.65Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
