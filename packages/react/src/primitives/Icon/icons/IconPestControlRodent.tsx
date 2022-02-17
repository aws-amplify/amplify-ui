import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconPestControlRodent } from '@aws-amplify/ui-react';` → `import { MdPestControlRodent } from 'react-icons/md';`
 */
export const IconPestControlRodent = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconPestControlRodent');
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
          d="M17 18C17.5523 18 18 17.5523 18 17C18 16.4477 17.5523 16 17 16C16.4477 16 16 16.4477 16 17C16 17.5523 16.4477 18 17 18Z"
          fill="currentColor"
        />
        <path
          d="M20.86 14.97L19.93 14.13C20.41 10.68 17.06 8.09 13.88 9.31C13.3 9.11 12.66 9 12 9C7.74 9 6.35 12.58 6.11 13.85C4.89 13.47 4 12.35 4 11C4 9.34 5.34 8 7 8H9.5C10.88 8 12 6.88 12 5.5C12 4.12 10.88 3 9.5 3H8C7.45 3 7 3.45 7 4C7 4.55 7.45 5 8 5H9.5C9.78 5 10 5.22 10 5.5C10 5.78 9.78 6 9.5 6H7C4.24 6 2 8.24 2 11C2 13.44 3.76 15.47 6.07 15.91C6.51 18.79 8.99 21 12 21H18.53C21.64 21 23.23 17.11 20.86 14.97ZM18.53 19H12C10.79 19 9.66 18.46 8.89 17.52C8.11 16.57 7.83 15.36 8.09 14.11C8.4 12.63 9.6 11.42 11.08 11.1C11.3 11.05 11.53 11.04 11.75 11.03C11.28 11.74 11 12.58 11 13.5C11 14.74 11.5 15.87 12.32 16.68L13.73 15.27C13.28 14.82 13 14.19 13 13.5C13 12.08 14.2 11 15.5 11C16.88 11 18 12.12 18 13.5C18 13.96 17.87 14.38 17.65 14.75L19.52 16.45C19.83 16.73 20 17.12 20 17.54C20 18.34 19.34 19 18.53 19Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
