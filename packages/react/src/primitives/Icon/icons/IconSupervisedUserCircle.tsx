import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconSupervisedUserCircle } from '@aws-amplify/ui-react';` → `import { MdSupervisedUserCircle } from 'react-icons/md';`
 */
export const IconSupervisedUserCircle = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconSupervisedUserCircle } from '@aws-amplify/ui-react'; → import { MdSupervisedUserCircle } from 'react-icons/md';`,
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
          d="M12.5 9.99977C12.5 8.34977 11.15 6.99977 9.49999 6.99977C7.84999 6.99977 6.49999 8.34977 6.49999 9.99977C6.49999 11.6498 7.84999 12.9998 9.49999 12.9998C11.15 12.9998 12.5 11.6498 12.5 9.99977ZM9.49999 10.9998C8.94999 10.9998 8.49999 10.5498 8.49999 9.99977C8.49999 9.44977 8.94999 8.99977 9.49999 8.99977C10.05 8.99977 10.5 9.44977 10.5 9.99977C10.5 10.5498 10.05 10.9998 9.49999 10.9998ZM16 12.9998C17.11 12.9998 18 12.1098 18 10.9998C18 9.88977 17.11 8.99977 16 8.99977C14.89 8.99977 13.99 9.88977 14 10.9998C14 12.1098 14.89 12.9998 16 12.9998ZM11.99 2.00977C6.46999 2.00977 1.98999 6.48977 1.98999 12.0098C1.98999 17.5298 6.46999 22.0098 11.99 22.0098C17.51 22.0098 21.99 17.5298 21.99 12.0098C21.99 6.48977 17.51 2.00977 11.99 2.00977V2.00977ZM5.83999 17.1198C6.51999 16.5798 8.10999 16.0098 9.49999 16.0098C9.56999 16.0098 9.64999 16.0198 9.72999 16.0198C9.96999 15.3798 10.4 14.7298 11.03 14.1598C10.47 14.0598 9.93999 13.9998 9.49999 13.9998C8.19999 13.9998 6.10999 14.4498 4.76999 15.4298C4.26999 14.3898 3.98999 13.2298 3.98999 11.9998C3.98999 7.58977 7.57999 3.99977 11.99 3.99977C16.4 3.99977 19.99 7.58977 19.99 11.9998C19.99 13.1998 19.72 14.3398 19.24 15.3698C18.24 14.7798 16.88 14.4998 16 14.4998C14.48 14.4998 11.5 15.3098 11.5 17.1998V19.9798C9.22999 19.8498 7.20999 18.7698 5.83999 17.1198V17.1198Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
