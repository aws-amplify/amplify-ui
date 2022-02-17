import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconReplay_10 } from '@aws-amplify/ui-react';` → `import { MdReplay_10 } from 'react-icons/md';`
 */
export const IconReplay_10 = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconReplay_10');
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
          d="M11.99 5V1L6.98999 6L11.99 11V7C15.3 7 17.99 9.69 17.99 13C17.99 16.31 15.3 19 11.99 19C8.67999 19 5.98999 16.31 5.98999 13H3.98999C3.98999 17.42 7.56999 21 11.99 21C16.41 21 19.99 17.42 19.99 13C19.99 8.58 16.41 5 11.99 5V5ZM10.89 16H10.04V12.74L9.02999 13.05V12.36L10.8 11.73H10.89V16ZM15.17 14.24C15.17 14.56 15.14 14.84 15.07 15.06C15 15.28 14.9 15.48 14.78 15.63C14.66 15.78 14.5 15.89 14.33 15.96C14.16 16.03 13.96 16.06 13.74 16.06C13.52 16.06 13.33 16.03 13.15 15.96C12.97 15.89 12.82 15.78 12.69 15.63C12.56 15.48 12.46 15.29 12.39 15.06C12.32 14.83 12.28 14.56 12.28 14.24V13.5C12.28 13.18 12.31 12.9 12.38 12.68C12.45 12.46 12.55 12.26 12.67 12.11C12.79 11.96 12.95 11.85 13.12 11.78C13.29 11.71 13.49 11.68 13.71 11.68C13.93 11.68 14.12 11.71 14.3 11.78C14.48 11.85 14.63 11.96 14.76 12.11C14.89 12.26 14.99 12.45 15.06 12.68C15.13 12.91 15.17 13.18 15.17 13.5V14.24V14.24ZM14.32 13.38C14.32 13.19 14.31 13.03 14.28 12.9C14.25 12.77 14.21 12.67 14.16 12.59C14.11 12.51 14.05 12.45 13.97 12.42C13.89 12.39 13.81 12.37 13.72 12.37C13.63 12.37 13.54 12.39 13.47 12.42C13.4 12.45 13.33 12.51 13.28 12.59C13.23 12.67 13.19 12.77 13.16 12.9C13.13 13.03 13.12 13.19 13.12 13.38V14.35C13.12 14.54 13.13 14.7 13.16 14.83C13.19 14.96 13.23 15.07 13.28 15.15C13.33 15.23 13.39 15.29 13.47 15.32C13.55 15.35 13.63 15.37 13.72 15.37C13.81 15.37 13.9 15.35 13.97 15.32C14.04 15.29 14.11 15.23 14.16 15.15C14.21 15.07 14.25 14.96 14.27 14.83C14.29 14.7 14.31 14.54 14.31 14.35V13.38H14.32Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
