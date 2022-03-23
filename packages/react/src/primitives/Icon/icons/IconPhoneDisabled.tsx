import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconPhoneDisabled } from '@aws-amplify/ui-react';` → `import { MdPhoneDisabled } from 'react-icons/md';`
 */
export const IconPhoneDisabled = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconPhoneDisabled } from '@aws-amplify/ui-react'; → import { MdPhoneDisabled } from 'react-icons/md';`,
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
          d="M17.34 14.5401L15.91 13.1101C16.47 12.3801 16.96 11.6101 17.38 10.7901L15.18 8.59006C14.9 8.31006 14.82 7.92006 14.93 7.57006C15.3 6.45006 15.5 5.25006 15.5 4.00006C15.5 3.45006 15.95 3.00006 16.5 3.00006H20C20.55 3.00006 21 3.45006 21 4.00006C21 7.98006 19.63 11.6401 17.34 14.5401ZM14.52 17.3501C11.63 19.6401 7.97001 21.0001 4.00001 21.0001C3.45001 21.0001 3.00001 20.5501 3.00001 20.0001V16.5101C3.00001 15.9601 3.45001 15.5101 4.00001 15.5101C5.24001 15.5101 6.45001 15.3101 7.57001 14.9401C7.67001 14.9001 7.78001 14.8901 7.88001 14.8901C8.14001 14.8901 8.39001 14.9901 8.59001 15.1801L10.79 17.3801C11.6 16.9601 12.37 16.4801 13.09 15.9201L1.39001 4.22006L2.81001 2.81006L21.19 21.2001L19.78 22.6101L14.52 17.3501ZM7.60001 17.0201C6.75001 17.2601 5.88001 17.4101 5.00001 17.4701V18.9601C6.32001 18.8701 7.59001 18.6101 8.80001 18.2101L7.60001 17.0201ZM17.46 5.00006C17.4 5.89006 17.25 6.76006 17.01 7.59006L18.21 8.79006C18.62 7.59006 18.88 6.32006 18.97 5.00006H17.46V5.00006Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
