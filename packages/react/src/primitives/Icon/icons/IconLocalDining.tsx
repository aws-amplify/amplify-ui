import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconLocalDining } from '@aws-amplify/ui-react';` → `import { MdLocalDining } from 'react-icons/md';`
 */
export const IconLocalDining = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconLocalDining } from '@aws-amplify/ui-react'; → import { MdLocalDining } from 'react-icons/md';`,
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
          d="M8.10023 13.34L10.9302 10.51L3.91023 3.49996C2.35023 5.05996 2.35023 7.58996 3.91023 9.15996L8.10023 13.34V13.34ZM14.8802 11.53C16.4102 12.24 18.5602 11.74 20.1502 10.15C22.0602 8.23996 22.4302 5.49996 20.9602 4.02996C19.5002 2.56996 16.7602 2.92996 14.8402 4.83996C13.2502 6.42996 12.7502 8.57996 13.4602 10.11L3.70023 19.87L5.11023 21.28L12.0002 14.41L18.8802 21.29L20.2902 19.88L13.4102 13L14.8802 11.53V11.53Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
