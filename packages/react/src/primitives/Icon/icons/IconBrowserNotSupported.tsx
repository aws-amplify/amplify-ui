import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconBrowserNotSupported } from '@aws-amplify/ui-react';` → `import { MdBrowserNotSupported } from 'react-icons/md';`
 */
export const IconBrowserNotSupported = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconBrowserNotSupported');
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
          d="M19 6V16.5L20.95 18.45C20.98 18.3 21 18.15 21 18V6C21 4.9 20.1 4 19 4H6.5L8.5 6H19Z"
          fill="currentColor"
        />
        <path
          d="M3.21995 3.31982L1.94995 4.58982L2.99995 5.63982V17.9998C2.99995 19.0998 3.89995 19.9998 4.99995 19.9998H17.36L19.42 22.0598L20.69 20.7898L3.21995 3.31982ZM15 17.9998H4.99995V7.63982L15.36 17.9998H15Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
