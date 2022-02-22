import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconDoDisturbAlt } from '@aws-amplify/ui-react';` → `import { MdDoDisturbAlt } from 'react-icons/md';`
 */
export const IconDoDisturbAlt = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconDoDisturbAlt } from '@aws-amplify/ui-react'; → import { MdDoDisturbAlt } from 'react-icons/md';`,
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
          d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM4 12C4 7.6 7.6 4 12 4C13.8 4 15.5 4.6 16.9 5.7L5.7 16.9C4.6 15.5 4 13.8 4 12ZM12 20C10.2 20 8.5 19.4 7.1 18.3L18.3 7.1C19.4 8.5 20 10.2 20 12C20 16.4 16.4 20 12 20Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
