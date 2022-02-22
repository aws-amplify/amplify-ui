import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconWrongLocation } from '@aws-amplify/ui-react';` → `import { MdWrongLocation } from 'react-icons/md';`
 */
export const IconWrongLocation = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconWrongLocation } from '@aws-amplify/ui-react'; → import { MdWrongLocation } from 'react-icons/md';`,
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
          d="M18 11C18 11.07 18 11.13 18 11.2C18 13.54 16.05 16.64 12 20.34C7.95 16.64 6 13.55 6 11.2C6 7.57 8.65 5 12 5C12.34 5 12.68 5.03 13 5.08V3.06C12.67 3.02 12.34 3 12 3C7.8 3 4 6.22 4 11.2C4 14.52 6.67 18.45 12 23C17.33 18.45 20 14.52 20 11.2C20 11.13 20 11.07 20 11H18Z"
          fill="currentColor"
        />
        <path
          d="M12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13Z"
          fill="black"
        />
        <path
          d="M22.54 2.87996L21.12 1.45996L19 3.58996L16.88 1.45996L15.46 2.87996L17.59 4.99996L15.46 7.11996L16.88 8.53996L19 6.40996L21.12 8.53996L22.54 7.11996L20.41 4.99996L22.54 2.87996Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
