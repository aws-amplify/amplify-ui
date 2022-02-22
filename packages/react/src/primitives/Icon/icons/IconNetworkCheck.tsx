import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconNetworkCheck } from '@aws-amplify/ui-react';` → `import { MdNetworkCheck } from 'react-icons/md';`
 */
export const IconNetworkCheck = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconNetworkCheck } from '@aws-amplify/ui-react'; → import { MdNetworkCheck } from 'react-icons/md';`,
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
          d="M15.9 5.00017C15.73 5.00017 15.58 5.09017 15.49 5.23017L15.42 5.38017L10.24 17.0302C10.08 17.3202 9.98 17.6402 9.98 17.9902C9.98 19.1002 10.88 20.0002 11.99 20.0002C12.95 20.0002 13.76 19.3202 13.95 18.4102L13.96 18.3802L16.4 5.50017C16.4 5.22017 16.18 5.00017 15.9 5.00017V5.00017ZM1 9.00017L3 11.0002C5.88 8.12017 9.79 6.92017 13.53 7.38017L14.72 4.70017C9.89 3.84017 4.74 5.27017 1 9.00017ZM21 11.0002L23 9.00017C21.36 7.36017 19.45 6.18017 17.41 5.43017L16.88 8.25017C18.38 8.87017 19.78 9.78017 21 11.0002ZM17 15.0002L19 13.0002C18.2 12.2002 17.3 11.5802 16.34 11.1102L15.79 14.0302C16.21 14.3002 16.62 14.6202 17 15.0002ZM5 13.0002L7 15.0002C8.13 13.8702 9.56 13.2102 11.03 13.0002L12.31 10.1202C9.68 10.0402 7.01 10.9902 5 13.0002V13.0002Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
