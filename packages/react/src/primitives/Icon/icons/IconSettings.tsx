import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconSettings } from '@aws-amplify/ui-react';` → `import { MdSettings } from 'react-icons/md';`
 */
export const IconSettings = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconSettings } from '@aws-amplify/ui-react'; → import { MdSettings } from 'react-icons/md';`,
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
          d="M19.43 12.98C19.47 12.66 19.5 12.34 19.5 12C19.5 11.66 19.47 11.34 19.43 11.02L21.54 9.37C21.73 9.22 21.78 8.95 21.66 8.73L19.66 5.27C19.57 5.11 19.4 5.02 19.22 5.02C19.16 5.02 19.1 5.03 19.05 5.05L16.56 6.05C16.04 5.65 15.48 5.32 14.87 5.07L14.49 2.42C14.46 2.18 14.25 2 14 2H9.99999C9.74999 2 9.53999 2.18 9.50999 2.42L9.12999 5.07C8.51999 5.32 7.95999 5.66 7.43999 6.05L4.94999 5.05C4.88999 5.03 4.82999 5.02 4.76999 5.02C4.59999 5.02 4.42999 5.11 4.33999 5.27L2.33999 8.73C2.20999 8.95 2.26999 9.22 2.45999 9.37L4.56999 11.02C4.52999 11.34 4.49999 11.67 4.49999 12C4.49999 12.33 4.52999 12.66 4.56999 12.98L2.45999 14.63C2.26999 14.78 2.21999 15.05 2.33999 15.27L4.33999 18.73C4.42999 18.89 4.59999 18.98 4.77999 18.98C4.83999 18.98 4.89999 18.97 4.94999 18.95L7.43999 17.95C7.95999 18.35 8.51999 18.68 9.12999 18.93L9.50999 21.58C9.53999 21.82 9.74999 22 9.99999 22H14C14.25 22 14.46 21.82 14.49 21.58L14.87 18.93C15.48 18.68 16.04 18.34 16.56 17.95L19.05 18.95C19.11 18.97 19.17 18.98 19.23 18.98C19.4 18.98 19.57 18.89 19.66 18.73L21.66 15.27C21.78 15.05 21.73 14.78 21.54 14.63L19.43 12.98V12.98ZM17.45 11.27C17.49 11.58 17.5 11.79 17.5 12C17.5 12.21 17.48 12.43 17.45 12.73L17.31 13.86L18.2 14.56L19.28 15.4L18.58 16.61L17.31 16.1L16.27 15.68L15.37 16.36C14.94 16.68 14.53 16.92 14.12 17.09L13.06 17.52L12.9 18.65L12.7 20H11.3L11.11 18.65L10.95 17.52L9.88999 17.09C9.45999 16.91 9.05999 16.68 8.65999 16.38L7.74999 15.68L6.68999 16.11L5.41999 16.62L4.71999 15.41L5.79999 14.57L6.68999 13.87L6.54999 12.74C6.51999 12.43 6.49999 12.2 6.49999 12C6.49999 11.8 6.51999 11.57 6.54999 11.27L6.68999 10.14L5.79999 9.44L4.71999 8.6L5.41999 7.39L6.68999 7.9L7.72999 8.32L8.62999 7.64C9.05999 7.32 9.46999 7.08 9.87999 6.91L10.94 6.48L11.1 5.35L11.3 4H12.69L12.88 5.35L13.04 6.48L14.1 6.91C14.53 7.09 14.93 7.32 15.33 7.62L16.24 8.32L17.3 7.89L18.57 7.38L19.27 8.59L18.2 9.44L17.31 10.14L17.45 11.27ZM12 8C9.78999 8 7.99999 9.79 7.99999 12C7.99999 14.21 9.78999 16 12 16C14.21 16 16 14.21 16 12C16 9.79 14.21 8 12 8ZM12 14C10.9 14 9.99999 13.1 9.99999 12C9.99999 10.9 10.9 10 12 10C13.1 10 14 10.9 14 12C14 13.1 13.1 14 12 14Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
