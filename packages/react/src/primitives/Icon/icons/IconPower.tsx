import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconPower } from '@aws-amplify/ui-react';` → `import { MdPower } from 'react-icons/md';`
 */
export const IconPower = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconPower } from '@aws-amplify/ui-react'; → import { MdPower } from 'react-icons/md';`,
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
          d="M16 9V13.66L12.5 17.17V19H11.5V17.17L8 13.65V9H16ZM16 3H14V7H10V3H8V7H7.99C6.9 6.99 6 7.89 6 8.98V14.5L9.5 18V21H14.5V18L18 14.49V9C18 7.9 17.1 7 16 7V3Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
