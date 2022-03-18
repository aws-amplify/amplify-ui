import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconPhoneIphone } from '@aws-amplify/ui-react';` → `import { MdPhoneIphone } from 'react-icons/md';`
 */
export const IconPhoneIphone = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconPhoneIphone } from '@aws-amplify/ui-react'; → import { MdPhoneIphone } from 'react-icons/md';`,
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
          d="M15.5 1H7.5C6.12 1 5 2.12 5 3.5V20.5C5 21.88 6.12 23 7.5 23H15.5C16.88 23 18 21.88 18 20.5V3.5C18 2.12 16.88 1 15.5 1ZM11.5 22C10.67 22 10 21.33 10 20.5C10 19.67 10.67 19 11.5 19C12.33 19 13 19.67 13 20.5C13 21.33 12.33 22 11.5 22ZM16 18H7V4H16V18Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
