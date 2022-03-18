import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconHdrOff } from '@aws-amplify/ui-react';` → `import { MdHdrOff } from 'react-icons/md';`
 */
export const IconHdrOff = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconHdrOff } from '@aws-amplify/ui-react'; → import { MdHdrOff } from 'react-icons/md';`,
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
          d="M17.5 15.0002V13.0002H18.6L19.5 15.0002H21L20.1 12.9002C20.6 12.6002 21 12.1002 21 11.5002V10.5002C21 9.70023 20.3 9.00023 19.5 9.00023H16V13.8602L17.14 15.0002H17.5ZM17.5 10.5002H19.5V11.5002H17.5V10.5002ZM13 10.5002V10.8602L14.5 12.3602V10.5002C14.5 9.70023 13.8 9.00023 13 9.00023H11.14L12.64 10.5002H13ZM2.50995 2.49023L1.44995 3.55023L6.89995 9.00023H6.49995V11.0002H4.49995V9.00023H2.99995V15.0002H4.49995V12.5002H6.49995V15.0002H7.99995V10.1002L9.49995 11.6002V15.0002H12.9L20.5 22.6002L21.5599 21.5402L2.50995 2.49023Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
