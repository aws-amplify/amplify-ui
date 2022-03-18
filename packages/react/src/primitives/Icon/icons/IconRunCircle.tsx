import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconRunCircle } from '@aws-amplify/ui-react';` → `import { MdRunCircle } from 'react-icons/md';`
 */
export const IconRunCircle = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconRunCircle } from '@aws-amplify/ui-react'; → import { MdRunCircle } from 'react-icons/md';`,
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
          d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z"
          fill="currentColor"
        />
        <path
          d="M13.5401 8.96976C13.3101 8.49976 12.7801 8.25976 12.2801 8.43976L9.0001 9.64976V11.9998H10.0001V10.3498L11.5401 9.77976L10.5801 14.6698L7.8001 14.0998L7.6001 15.0798L11.3601 15.8498L11.8801 13.2098L13.0001 14.4198V17.9998H14.0001V14.0298L12.6801 12.5898L13.0901 10.2398C13.9901 11.4598 15.3001 11.9998 16.0001 11.9998V10.9998C15.5901 10.9998 14.3701 10.6698 13.5401 8.96976Z"
          fill="black"
        />
        <path
          d="M13.5 8C14.0523 8 14.5 7.55228 14.5 7C14.5 6.44772 14.0523 6 13.5 6C12.9477 6 12.5 6.44772 12.5 7C12.5 7.55228 12.9477 8 13.5 8Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
