import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconNoDrinks } from '@aws-amplify/ui-react';` → `import { MdNoDrinks } from 'react-icons/md';`
 */
export const IconNoDrinks = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconNoDrinks } from '@aws-amplify/ui-react'; → import { MdNoDrinks } from 'react-icons/md';`,
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
          d="M21.1901 21.1901L2.81014 2.81006L1.39014 4.22006L9.62014 12.4501L11.0001 14.0001V19.0001H6.00014V21.0001H18.0001V20.8301L19.7801 22.6101L21.1901 21.1901ZM13.0001 19.0001V15.8301L16.1701 19.0001H13.0001ZM7.83014 5.00006L5.83014 3.00006H21.0001V5.00006L14.8001 11.9701L13.3801 10.5501L14.7701 9.00006H11.8301L9.83014 7.00006H16.5701L18.3501 5.00006H7.83014Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
