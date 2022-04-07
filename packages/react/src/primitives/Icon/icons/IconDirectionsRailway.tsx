import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconDirectionsRailway } from '@aws-amplify/ui-react';` → `import { MdDirectionsRailway } from 'react-icons/md';`
 */
export const IconDirectionsRailway = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconDirectionsRailway } from '@aws-amplify/ui-react'; → import { MdDirectionsRailway } from 'react-icons/md';`,
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
          d="M12 1C7.58 1 4 1.5 4 5V15.5C4 17.43 5.57 19 7.5 19L6 20.5V21H18V20.5L16.5 19C18.43 19 20 17.43 20 15.5V5C20 1.5 16.42 1 12 1ZM12 3C18 3 18 4.2 18 5H6C6 4.2 6 3 12 3ZM18 7V10H6V7H18ZM16.5 17H7.5C6.67 17 6 16.33 6 15.5V12H18V15.5C18 16.33 17.33 17 16.5 17ZM12 12.5C10.9 12.5 10 13.4 10 14.5C10 15.6 10.9 16.5 12 16.5C13.1 16.5 14 15.6 14 14.5C14 13.4 13.1 12.5 12 12.5Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
