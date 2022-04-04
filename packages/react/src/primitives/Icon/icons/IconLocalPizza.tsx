import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconLocalPizza } from '@aws-amplify/ui-react';` → `import { MdLocalPizza } from 'react-icons/md';`
 */
export const IconLocalPizza = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconLocalPizza } from '@aws-amplify/ui-react'; → import { MdLocalPizza } from 'react-icons/md';`,
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
          d="M11.9998 2C8.42977 2 5.22977 3.54 3.00977 6L11.9998 22L20.9898 6C18.7798 3.55 15.5698 2 11.9998 2ZM11.9998 17.92L5.50977 6.36C7.31977 4.85 9.61977 4 11.9998 4C14.3798 4 16.6798 4.85 18.4898 6.36L11.9998 17.92ZM8.99977 5.5C8.16977 5.5 7.49977 6.17 7.49977 7C7.49977 7.83 8.16977 8.5 8.99977 8.5C9.82977 8.5 10.4998 7.83 10.4998 7C10.4998 6.17 9.81977 5.5 8.99977 5.5ZM10.4998 13C10.4998 13.83 11.1698 14.5 11.9998 14.5C12.8198 14.5 13.4998 13.83 13.4998 13C13.4998 12.17 12.8198 11.5 11.9998 11.5C11.1798 11.5 10.4998 12.17 10.4998 13Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
