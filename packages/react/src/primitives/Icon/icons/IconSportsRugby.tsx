import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconSportsRugby } from '@aws-amplify/ui-react';` → `import { MdSportsRugby } from 'react-icons/md';`
 */
export const IconSportsRugby = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconSportsRugby } from '@aws-amplify/ui-react'; → import { MdSportsRugby } from 'react-icons/md';`,
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
          d="M20.4898 3.51004C19.9298 2.95004 18.3398 2.54004 16.3298 2.54004C13.2498 2.54004 9.17976 3.50004 6.34976 6.33004C1.65976 11.03 2.09976 19.07 3.50976 20.49C4.06976 21.05 5.65976 21.46 7.66976 21.46C10.7498 21.46 14.8198 20.5 17.6498 17.67C22.3398 12.97 21.8998 4.93004 20.4898 3.51004ZM5.70976 18.29C6.33976 16.4 7.86976 13.3 10.5798 10.59C13.2598 7.91004 16.3598 6.36004 18.2798 5.71004C17.6498 7.60004 16.1198 10.7 13.3998 13.41C10.7398 16.09 7.63976 17.64 5.70976 18.29ZM7.75976 7.76004C10.3998 5.12004 14.0998 4.64004 15.7898 4.57004C13.7398 5.51004 11.3298 7.03004 9.17976 9.18004C7.01976 11.34 5.50976 13.76 4.56976 15.81C4.65976 13.33 5.43976 10.07 7.75976 7.76004ZM16.2398 16.24C13.5998 18.88 9.89976 19.36 8.20976 19.43C10.2598 18.49 12.6698 16.97 14.8198 14.82C16.9798 12.66 18.4898 10.24 19.4398 8.19004C19.3398 10.67 18.5598 13.93 16.2398 16.24Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
