import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconPieChartOutline } from '@aws-amplify/ui-react';` → `import { MdPieChartOutline } from 'react-icons/md';`
 */
export const IconPieChartOutline = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconPieChartOutline } from '@aws-amplify/ui-react'; → import { MdPieChartOutline } from 'react-icons/md';`,
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
          d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM13 4.07C16.61 4.52 19.48 7.4 19.93 11H13V4.07ZM4 12C4 7.94 7.07 4.56 11 4.07V19.94C7.07 19.44 4 16.06 4 12V12ZM13 19.93V13H19.93C19.48 16.61 16.61 19.48 13 19.93Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
