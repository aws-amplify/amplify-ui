import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconFormatLineSpacing } from '@aws-amplify/ui-react';` → `import { MdFormatLineSpacing } from 'react-icons/md';`
 */
export const IconFormatLineSpacing = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconFormatLineSpacing } from '@aws-amplify/ui-react'; → import { MdFormatLineSpacing } from 'react-icons/md';`,
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
          d="M6 7H8.5L5 3.5L1.5 7H4V17H1.5L5 20.5L8.5 17H6V7ZM10 5V7H22V5H10ZM10 19H22V17H10V19ZM10 13H22V11H10V13Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
