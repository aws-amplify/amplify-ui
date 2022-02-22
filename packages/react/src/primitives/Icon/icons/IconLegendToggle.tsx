import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconLegendToggle } from '@aws-amplify/ui-react';` → `import { MdLegendToggle } from 'react-icons/md';`
 */
export const IconLegendToggle = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconLegendToggle } from '@aws-amplify/ui-react'; → import { MdLegendToggle } from 'react-icons/md';`,
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
          d="M20 15H4V13H20V15ZM20 17H4V19H20V17ZM15 11L20 7.45V5L15 8.55L10 5L4 8.66V11L9.92 7.39L15 11Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
