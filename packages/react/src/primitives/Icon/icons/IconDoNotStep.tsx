import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconDoNotStep } from '@aws-amplify/ui-react';` → `import { MdDoNotStep } from 'react-icons/md';`
 */
export const IconDoNotStep = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconDoNotStep');
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
          d="M18.51 15.68L17.1 14.27L21.58 9.79L23 11.2L18.51 15.68ZM14.98 12.15L18.05 9.08L13.8 4.82L10.72 7.89L9.3 6.47L13.8 2L20.88 9.08L16.4 13.56L14.98 12.15ZM21.18 21.2L19.77 22.61L13.83 16.67L10.5 20H1V17.37C1 16.53 1.52 15.8 2.3 15.49C2.88 15.26 3.58 14.93 4.27 14.47L5.65 15.85C5.74 15.95 5.87 16 6 16C6.13 16 6.26 15.95 6.36 15.85C6.56 15.65 6.56 15.34 6.36 15.14L5.08 13.86C5.35 13.62 5.61 13.35 5.85 13.06L7.12 14.33C7.21 14.43 7.35 14.48 7.47 14.48C7.59 14.48 7.72 14.43 7.82 14.33C8.02 14.13 8.02 13.82 7.82 13.62L6.42 12.22C6.61 11.88 6.76 11.5 6.87 11.1L8.58 12.82C8.67 12.92 8.81 12.97 8.93 12.97C9.05 12.97 9.18 12.92 9.28 12.82C9.47 12.62 9.47 12.32 9.29 12.12L1.39 4.22L2.81 2.81L21.18 21.2ZM12.42 15.26L10.75 13.58L7.42 16.9C6.64 17.68 5.37 17.68 4.59 16.89L4.4 16.72L3.93 16.96C3.64 17.1 3.34 17.23 3.04 17.35L3.03 18H9.67L12.42 15.26Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
