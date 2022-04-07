import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconNoCell } from '@aws-amplify/ui-react';` → `import { MdNoCell } from 'react-icons/md';`
 */
export const IconNoCell = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconNoCell } from '@aws-amplify/ui-react'; → import { MdNoCell } from 'react-icons/md';`,
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
          d="M17.0001 6V14.17L19.0001 16.17V3C19.0001 1.9 18.1001 1.01 17.0001 1.01L7.00014 1C6.15014 1 5.42014 1.55 5.13014 2.3L8.83014 6H17.0001ZM7.00014 3H17.0001V4H7.00014V3ZM21.1901 21.19L19.0001 19L17.0001 17L7.00014 7L5.00014 5L2.81014 2.81L1.39014 4.22L5.00014 7.83V21C5.00014 22.1 5.90014 23 7.00014 23H17.0001C17.8501 23 18.5801 22.45 18.8701 21.7L19.7801 22.61L21.1901 21.19ZM17.0001 21H7.00014V20H17.0001V21ZM7.00014 18V9.83L15.1701 18H7.00014Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
