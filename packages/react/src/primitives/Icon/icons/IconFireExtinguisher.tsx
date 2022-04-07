import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconFireExtinguisher } from '@aws-amplify/ui-react';` → `import { MdFireExtinguisher } from 'react-icons/md';`
 */
export const IconFireExtinguisher = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconFireExtinguisher } from '@aws-amplify/ui-react'; → import { MdFireExtinguisher } from 'react-icons/md';`,
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
          d="M7 19H17V20C17 21.1 16.1 22 15 22H9C7.9 22 7 21.1 7 20V19ZM7 18H17V13H7V18ZM17 3V9L13.85 8.34C13.84 8.34 13.84 8.35 13.83 8.36C15.38 8.98 16.55 10.34 16.9 12H7.1C7.44 10.34 8.62 8.98 10.17 8.36C9.84 8.1 9.57 7.78 9.37 7.41L5 6.5V5.5L9.37 4.59C9.87 3.65 10.86 3 12 3C12.7 3 13.34 3.25 13.85 3.66L17 3ZM13 6C12.97 5.41 12.55 5 12 5C11.45 5 11 5.45 11 6C11 6.55 11.45 7 12 7C12.55 7 13 6.55 13 6Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
