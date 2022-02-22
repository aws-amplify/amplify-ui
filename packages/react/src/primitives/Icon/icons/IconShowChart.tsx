import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconShowChart } from '@aws-amplify/ui-react';` → `import { MdShowChart } from 'react-icons/md';`
 */
export const IconShowChart = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconShowChart } from '@aws-amplify/ui-react'; → import { MdShowChart } from 'react-icons/md';`,
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
          d="M3.5 18.4898L9.5 12.4798L13.5 16.4798L22 6.91977L20.59 5.50977L13.5 13.4798L9.5 9.47976L2 16.9898L3.5 18.4898Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
