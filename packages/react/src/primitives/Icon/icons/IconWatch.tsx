import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconWatch } from '@aws-amplify/ui-react';` → `import { MdWatch } from 'react-icons/md';`
 */
export const IconWatch = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconWatch } from '@aws-amplify/ui-react'; → import { MdWatch } from 'react-icons/md';`,
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
          d="M14.31 2L14.72 4.48C13.87 4.17 12.96 4 12 4C11.05 4 10.13 4.17 9.29 4.47L9.7 2H14.31V2ZM14.72 19.52L14.31 22H9.7L9.29 19.53C10.13 19.83 11.05 20 12 20C12.96 20 13.87 19.83 14.72 19.52V19.52ZM16 0H8L7.05 5.73C5.19 7.19 4 9.45 4 12C4 14.55 5.19 16.81 7.05 18.27L8 24H16L16.96 18.27C18.81 16.81 20 14.54 20 12C20 9.46 18.81 7.19 16.96 5.73L16 0ZM12 18C8.69 18 6 15.31 6 12C6 8.69 8.69 6 12 6C15.31 6 18 8.69 18 12C18 15.31 15.31 18 12 18Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
