import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconStorage } from '@aws-amplify/ui-react';` → `import { MdStorage } from 'react-icons/md';`
 */
export const IconStorage = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconStorage');
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
          d="M2 20H22V16H2V20ZM4 17H6V19H4V17ZM2 4V8H22V4H2ZM6 7H4V5H6V7ZM2 14H22V10H2V14ZM4 11H6V13H4V11Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
