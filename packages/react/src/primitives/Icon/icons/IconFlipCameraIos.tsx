import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconFlipCameraIos } from '@aws-amplify/ui-react';` → `import { MdFlipCameraIos } from 'react-icons/md';`
 */
export const IconFlipCameraIos = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconFlipCameraIos');
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
          d="M20 5H16.83L15 3H9L7.17 5H4C2.9 5 2 5.9 2 7V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V7C22 5.9 21.1 5 20 5ZM20 19H4V7H7.17H8.05L8.64 6.35L9.88 5H14.12L15.36 6.35L15.95 7H16.83H20V19Z"
          fill="currentColor"
        />
        <path
          d="M12 17C9.79 17 8 15.21 8 13H10L7.5 10.5L5 13H7C7 15.76 9.24 18 12 18C12.86 18 13.65 17.76 14.36 17.38L13.62 16.64C13.13 16.87 12.58 17 12 17Z"
          fill="black"
        />
        <path
          d="M11.9999 8C11.1399 8 10.3499 8.24 9.63989 8.62L10.3799 9.35C10.8699 9.13 11.4199 9 11.9999 9C14.2099 9 15.9999 10.79 15.9999 13H13.9999L16.4999 15.5L18.9999 13H16.9999C16.9999 10.24 14.7599 8 11.9999 8Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
