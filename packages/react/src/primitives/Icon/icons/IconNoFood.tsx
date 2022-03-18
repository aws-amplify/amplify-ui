import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconNoFood } from '@aws-amplify/ui-react';` → `import { MdNoFood } from 'react-icons/md';`
 */
export const IconNoFood = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconNoFood } from '@aws-amplify/ui-react'; → import { MdNoFood } from 'react-icons/md';`,
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
          d="M1.00018 21H16.0102V21.98C16.0102 22.54 15.5602 22.99 15.0002 22.99H2.01018C1.45018 22.99 1.00018 22.54 1.00018 21.98V21ZM20.4902 23.31L16.0002 18.83V19H1.00018V17H14.1702L12.1702 15H1.00018C1.00018 11.76 3.46018 9.83 6.38018 9.21L0.680176 3.51L2.10018 2.1L13.0002 13L15.0002 15L21.9002 21.9L20.4902 23.31ZM10.1702 13L8.17018 11C6.75018 11.06 4.65018 11.56 3.62018 13H10.1702ZM23.0002 5H18.0002V1H16.0002V5H11.0002L11.2302 7H20.7902L19.7902 16.97L21.6202 18.8L23.0002 5Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
