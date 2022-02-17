import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconUsb } from '@aws-amplify/ui-react';` → `import { MdUsb } from 'react-icons/md';`
 */
export const IconUsb = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconUsb');
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
          d="M15 7V11H16V13H13V5H15L12 1L8.99999 5H11V13H7.99999V10.93C8.69999 10.56 9.19999 9.85 9.19999 9C9.19999 7.79 8.20999 6.8 6.99999 6.8C5.78999 6.8 4.79999 7.79 4.79999 9C4.79999 9.85 5.29999 10.56 5.99999 10.93V13C5.99999 14.11 6.88999 15 7.99999 15H11V18.05C10.29 18.42 9.79999 19.15 9.79999 20C9.79999 21.22 10.79 22.2 12 22.2C13.21 22.2 14.2 21.22 14.2 20C14.2 19.15 13.71 18.42 13 18.05V15H16C17.11 15 18 14.11 18 13V11H19V7H15Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
