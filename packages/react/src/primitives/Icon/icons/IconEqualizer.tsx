import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconEqualizer } from '@aws-amplify/ui-react';` → `import { MdEqualizer } from 'react-icons/md';`
 */
export const IconEqualizer = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconEqualizer');
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
          d="M10 20H14V4H10V20ZM4 20H8V12H4V20ZM16 9V20H20V9H16Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
