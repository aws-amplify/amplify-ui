import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconHomeWork } from '@aws-amplify/ui-react';` → `import { MdHomeWork } from 'react-icons/md';`
 */
export const IconHomeWork = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconHomeWork } from '@aws-amplify/ui-react'; → import { MdHomeWork } from 'react-icons/md';`,
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
          d="M17.0002 15H19.0002V17H17.0002V15ZM17.0002 11H19.0002V13H17.0002V11ZM17.0002 7H19.0002V9H17.0002V7ZM13.7402 7L15.0002 7.84V7H13.7402Z"
          fill="currentColor"
        />
        <path d="M10 3V4.51L12 5.84V5H21V19H17V21H23V3H10Z" fill="black" />
        <path
          d="M8.17 5.7002L15 10.2502V21.0002H1V10.4802L8.17 5.7002ZM10 19.0002H13V11.1602L8.17 8.0902L3 11.3802V19.0002H6V13.0002H10V19.0002Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
