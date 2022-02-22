import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconHouse } from '@aws-amplify/ui-react';` → `import { MdHouse } from 'react-icons/md';`
 */
export const IconHouse = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconHouse } from '@aws-amplify/ui-react'; → import { MdHouse } from 'react-icons/md';`,
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
          d="M19 9.3V4H16V6.6L12 3L2 12H5V20H11V14H13V20H19V12H22L19 9.3ZM17 18H15V12H9V18H7V10.19L12 5.69L17 10.19V18Z"
          fill="currentColor"
        />
        <path
          d="M10 10H14C14 8.9 13.1 8 12 8C10.9 8 10 8.9 10 10Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
