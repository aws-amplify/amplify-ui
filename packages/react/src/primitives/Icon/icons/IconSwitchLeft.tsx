import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconSwitchLeft } from '@aws-amplify/ui-react';` → `import { MdSwitchLeft } from 'react-icons/md';`
 */
export const IconSwitchLeft = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconSwitchLeft');
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
          d="M8.5 8.62V15.38L5.12 12L8.5 8.62ZM10 5L3 12L10 19V5ZM14 5V19L21 12L14 5Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
