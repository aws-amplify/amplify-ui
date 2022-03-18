import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconPlumbing } from '@aws-amplify/ui-react';` → `import { MdPlumbing } from 'react-icons/md';`
 */
export const IconPlumbing = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconPlumbing } from '@aws-amplify/ui-react'; → import { MdPlumbing } from 'react-icons/md';`,
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
          d="M19.28 4.9301L17.16 2.8101C16.38 2.0301 15.11 2.0301 14.33 2.8101L11.5 5.6401L13.62 7.7601L15.74 5.6401L19.28 9.1801C20.45 8.0001 20.45 6.1001 19.28 4.9301Z"
          fill="currentColor"
        />
        <path
          d="M5.49035 13.7699C6.08035 14.3599 7.03035 14.3599 7.61035 13.7699L10.0804 11.2999L7.96035 9.16992L5.49035 11.6399C4.90035 12.2299 4.90035 13.1799 5.49035 13.7699Z"
          fill="black"
        />
        <path
          d="M15.0402 7.76009L14.3302 8.47009L13.6202 9.18009L10.4402 6.00009C9.85021 5.40009 8.90021 5.40009 8.32021 5.99009C7.73021 6.58009 7.73021 7.53009 8.32021 8.11009L11.5002 11.2901L10.7902 12.0001L4.43021 18.3601C3.65021 19.1401 3.65021 20.4101 4.43021 21.1901C5.21021 21.9701 6.48022 21.9701 7.26022 21.1901L16.4502 12.0001C16.8402 12.3901 17.4702 12.3901 17.8602 12.0001C18.2502 11.6101 18.2502 10.9801 17.8602 10.5901L15.0402 7.76009Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
