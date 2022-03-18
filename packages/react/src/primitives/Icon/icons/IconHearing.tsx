import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconHearing } from '@aws-amplify/ui-react';` → `import { MdHearing } from 'react-icons/md';`
 */
export const IconHearing = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconHearing } from '@aws-amplify/ui-react'; → import { MdHearing } from 'react-icons/md';`,
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
          d="M17 20.0002C16.71 20.0002 16.44 19.9402 16.24 19.8502C15.53 19.4802 15.03 18.9702 14.53 17.4702C14.02 15.9102 13.06 15.1802 12.14 14.4702C11.35 13.8602 10.53 13.2302 9.82 11.9402C9.29 10.9802 9 9.93021 9 9.00021C9 6.20021 11.2 4.00021 14 4.00021C16.8 4.00021 19 6.20021 19 9.00021H21C21 5.07021 17.93 2.00021 14 2.00021C10.07 2.00021 7 5.07021 7 9.00021C7 10.2602 7.38 11.6502 8.07 12.9002C8.98 14.5502 10.05 15.3802 10.92 16.0502C11.73 16.6702 12.31 17.1202 12.63 18.1002C13.23 19.9202 14 20.9402 15.36 21.6502C15.87 21.8802 16.43 22.0002 17 22.0002C19.21 22.0002 21 20.2102 21 18.0002H19C19 19.1002 18.1 20.0002 17 20.0002V20.0002ZM7.64 2.64021L6.22 1.22021C4.23 3.21021 3 5.96021 3 9.00021C3 12.0402 4.23 14.7902 6.22 16.7802L7.63 15.3702C6.01 13.7402 5 11.4902 5 9.00021C5 6.51021 6.01 4.26021 7.64 2.64021V2.64021ZM11.5 9.00021C11.5 10.3802 12.62 11.5002 14 11.5002C15.38 11.5002 16.5 10.3802 16.5 9.00021C16.5 7.62021 15.38 6.50021 14 6.50021C12.62 6.50021 11.5 7.62021 11.5 9.00021Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
