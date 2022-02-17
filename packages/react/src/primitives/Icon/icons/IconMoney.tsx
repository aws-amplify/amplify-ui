import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconMoney } from '@aws-amplify/ui-react';` → `import { MdMoney } from 'react-icons/md';`
 */
export const IconMoney = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconMoney');
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
          d="M15 16H18C18.55 16 19 15.55 19 15V9C19 8.45 18.55 8 18 8H15C14.45 8 14 8.45 14 9V15C14 15.55 14.45 16 15 16ZM16 10H17V14H16V10ZM9 16H12C12.55 16 13 15.55 13 15V9C13 8.45 12.55 8 12 8H9C8.45 8 8 8.45 8 9V15C8 15.55 8.45 16 9 16ZM10 10H11V14H10V10ZM5 8H7V16H5V8ZM2 4V20H22V4H2ZM20 18H4V6H20V18Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
