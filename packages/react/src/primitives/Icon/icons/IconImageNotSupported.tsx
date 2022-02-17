import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconImageNotSupported } from '@aws-amplify/ui-react';` → `import { MdImageNotSupported } from 'react-icons/md';`
 */
export const IconImageNotSupported = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconImageNotSupported');
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
          d="M21.8999 21.9001L15.7999 15.8001L13.1099 13.1101L4.99994 5.0001L3.58994 3.5901L2.09994 2.1001L0.689941 3.5101L2.99994 5.8301V19.0001C2.99994 20.1001 3.89994 21.0001 4.99994 21.0001H18.1699L20.4799 23.3101L21.8999 21.9001ZM4.99994 19.0001V7.8301L11.8399 14.6701L10.9999 15.7201L8.99994 13.0001L5.99994 17.0001H14.1699L16.1699 19.0001H4.99994ZM7.82994 5.0001L5.82994 3.0001H18.9999C20.0999 3.0001 20.9999 3.9001 20.9999 5.0001V18.1701L18.9999 16.1701V5.0001H7.82994Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
