import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconMiscellaneousServices } from '@aws-amplify/ui-react';` → `import { MdMiscellaneousServices } from 'react-icons/md';`
 */
export const IconMiscellaneousServices = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconMiscellaneousServices } from '@aws-amplify/ui-react'; → import { MdMiscellaneousServices } from 'react-icons/md';`,
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
          d="M14.17 13.71L15.57 11.29C15.66 11.14 15.62 10.95 15.49 10.84L14.01 9.68C14.04 9.46 14.06 9.23 14.06 9C14.06 8.77 14.04 8.54 14.01 8.31L15.49 7.15C15.62 7.04 15.66 6.85 15.57 6.7L14.17 4.28C14.08 4.13 13.9 4.07 13.74 4.13L12 4.83C11.64 4.55 11.25 4.32 10.82 4.14L10.56 2.29C10.53 2.13 10.38 2 10.21 2H7.41C7.24 2 7.09 2.13 7.06 2.3L6.8 4.15C6.38 4.33 5.98 4.56 5.62 4.84L3.88 4.14C3.72 4.08 3.54 4.14 3.45 4.29L2.05 6.71C1.96 6.86 2 7.05 2.13 7.16L3.61 8.32C3.58 8.54 3.56 8.77 3.56 9C3.56 9.23 3.58 9.46 3.61 9.69L2.13 10.85C2 10.96 1.96 11.15 2.05 11.3L3.45 13.72C3.54 13.87 3.72 13.93 3.88 13.87L5.62 13.17C5.98 13.45 6.37 13.68 6.8 13.86L7.06 15.71C7.09 15.87 7.24 16 7.41 16H10.21C10.38 16 10.53 15.87 10.56 15.7L10.82 13.85C11.24 13.67 11.64 13.44 12 13.16L13.74 13.86C13.9 13.92 14.08 13.86 14.17 13.71ZM8.81 11C7.71 11 6.81 10.1 6.81 9C6.81 7.9 7.71 7 8.81 7C9.91 7 10.81 7.9 10.81 9C10.81 10.1 9.91 11 8.81 11Z"
          fill="currentColor"
        />
        <path
          d="M21.9202 18.67L20.9602 17.93C20.9802 17.79 21.0002 17.64 21.0002 17.49C21.0002 17.34 20.9902 17.19 20.9602 17.05L21.9102 16.31C21.9902 16.24 22.0202 16.12 21.9602 16.02L21.0602 14.47C21.0102 14.37 20.8902 14.34 20.7802 14.37L19.6702 14.82C19.4402 14.64 19.1902 14.49 18.9102 14.38L18.7402 13.2C18.7302 13.08 18.6302 13 18.5302 13H16.7402C16.6302 13 16.5302 13.08 16.5202 13.19L16.3502 14.37C16.0802 14.49 15.8202 14.63 15.5902 14.81L14.4802 14.36C14.3802 14.32 14.2602 14.36 14.2002 14.46L13.3002 16.01C13.2502 16.11 13.2602 16.23 13.3502 16.3L14.3002 17.04C14.2802 17.18 14.2702 17.33 14.2702 17.48C14.2702 17.63 14.2802 17.78 14.3002 17.92L13.3502 18.66C13.2702 18.73 13.2402 18.85 13.3002 18.95L14.2002 20.5C14.2502 20.6 14.3702 20.63 14.4802 20.6L15.5902 20.15C15.8202 20.33 16.0702 20.48 16.3502 20.59L16.5202 21.77C16.5402 21.88 16.6302 21.96 16.7402 21.96H18.5302C18.6402 21.96 18.7402 21.88 18.7502 21.77L18.9202 20.59C19.1902 20.47 19.4502 20.33 19.6702 20.15L20.7902 20.6C20.8902 20.64 21.0102 20.6 21.0702 20.5L21.9702 18.95C22.0302 18.86 22.0002 18.74 21.9202 18.67ZM17.6302 18.83C16.8902 18.83 16.2802 18.23 16.2802 17.48C16.2802 16.73 16.8802 16.13 17.6302 16.13C18.3802 16.13 18.9802 16.73 18.9802 17.48C18.9802 18.23 18.3702 18.83 17.6302 18.83Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
