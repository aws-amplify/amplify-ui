import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconLuggage } from '@aws-amplify/ui-react';` → `import { MdLuggage } from 'react-icons/md';`
 */
export const IconLuggage = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconLuggage } from '@aws-amplify/ui-react'; → import { MdLuggage } from 'react-icons/md';`,
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
          d="M9.5 18H8V9H9.5V18ZM12.75 18H11.25V9H12.75V18ZM16 18H14.5V9H16V18ZM17 6H15V3C15 2.45 14.55 2 14 2H10C9.45 2 9 2.45 9 3V6H7C5.9 6 5 6.9 5 8V19C5 20.1 5.9 21 7 21C7 21.55 7.45 22 8 22C8.55 22 9 21.55 9 21H15C15 21.55 15.45 22 16 22C16.55 22 17 21.55 17 21C18.1 21 19 20.1 19 19V8C19 6.9 18.1 6 17 6ZM10.5 3.5H13.5V6H10.5V3.5ZM17 19H7V8H17V19Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
