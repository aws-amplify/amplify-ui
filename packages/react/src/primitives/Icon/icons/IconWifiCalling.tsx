import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconWifiCalling } from '@aws-amplify/ui-react';` → `import { MdWifiCalling } from 'react-icons/md';`
 */
export const IconWifiCalling = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconWifiCalling');
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
          d="M20 15.51C18.76 15.51 17.55 15.31 16.43 14.94C16.33 14.9 16.22 14.89 16.12 14.89C15.86 14.89 15.61 14.99 15.41 15.18L13.21 17.38C10.38 15.93 8.06 13.62 6.62 10.79L8.82 8.59C9.1 8.31 9.18 7.92 9.07 7.57C8.7 6.45 8.5 5.25 8.5 4C8.5 3.45 8.05 3 7.5 3H4C3.45 3 3 3.45 3 4C3 13.39 10.61 21 20 21C20.55 21 21 20.55 21 20V16.51C21 15.96 20.55 15.51 20 15.51ZM5.03 5H6.53C6.6 5.89 6.75 6.76 6.99 7.59L5.79 8.79C5.38 7.59 5.12 6.32 5.03 5ZM19 18.97C17.68 18.88 16.41 18.62 15.2 18.22L16.39 17.03C17.24 17.27 18.11 17.42 18.99 17.48V18.97H19Z"
          fill="currentColor"
        />
        <path
          d="M22 4.95C21.79 4.78 19.67 3 16.5 3C13.32 3 11.21 4.78 11 4.95L16.5 12L22 4.95Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
