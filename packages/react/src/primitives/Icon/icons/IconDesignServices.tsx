import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconDesignServices } from '@aws-amplify/ui-react';` → `import { MdDesignServices } from 'react-icons/md';`
 */
export const IconDesignServices = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconDesignServices } from '@aws-amplify/ui-react'; → import { MdDesignServices } from 'react-icons/md';`,
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
          d="M20.97 7.27005C21.36 6.88005 21.36 6.25005 20.97 5.86005L18.14 3.03005C17.75 2.64005 17.12 2.64005 16.73 3.03005L12.24 7.52005L8.35 3.63005C7.57 2.85005 6.3 2.85005 5.52 3.63005L3.62 5.53005C2.84 6.31005 2.84 7.58005 3.62 8.36005L7.51 12.25L3 16.76V21H7.24L11.76 16.48L15.65 20.3701C16.6 21.3201 17.88 20.9701 18.48 20.3701L20.38 18.47C21.16 17.69 21.16 16.42 20.38 15.64L16.49 11.75L20.97 7.27005ZM5.04 6.94005L6.93 5.04005L8.2 6.31005L7.02 7.50005L8.43 8.91005L9.62 7.72005L10.82 8.92005L8.92 10.82L5.04 6.94005ZM16.27 14.38L15.08 15.57L16.49 16.98L17.68 15.79L18.95 17.06L17.05 18.96L13.16 15.07L15.06 13.17L16.27 14.38ZM6.41 19H5V17.59L14.61 7.98005L15.91 9.28005L16.02 9.39005L6.41 19ZM16.02 6.56005L17.43 5.15005L18.84 6.56005L17.43 7.97005L16.02 6.56005Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
