import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconCarpenter } from '@aws-amplify/ui-react';` → `import { MdCarpenter } from 'react-icons/md';`
 */
export const IconCarpenter = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconCarpenter } from '@aws-amplify/ui-react'; → import { MdCarpenter } from 'react-icons/md';`,
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
          d="M19.7299 14.23L6.99986 1.5L3.10986 5.39L11.2399 17.06C10.4599 17.84 10.4599 19.11 11.2399 19.89L12.6499 21.3C13.4299 22.08 14.6999 22.08 15.4799 21.3L19.7199 17.06C20.5099 16.28 20.5099 15.01 19.7299 14.23ZM5.70986 5.62L6.99986 4.33L15.4899 12.82L12.6799 15.63L5.70986 5.62ZM14.0699 19.88L12.6599 18.47L16.8999 14.23L18.3099 15.64L14.0699 19.88Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
