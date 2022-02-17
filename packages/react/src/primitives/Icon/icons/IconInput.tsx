import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconInput } from '@aws-amplify/ui-react';` → `import { MdInput } from 'react-icons/md';`
 */
export const IconInput = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconInput');
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
          d="M21 3.00977H3C1.9 3.00977 1 3.90977 1 5.00977V8.99977H3V4.98977H21V19.0198H3V14.9998H1V19.0098C1 20.1098 1.9 20.9898 3 20.9898H21C22.1 20.9898 23 20.1098 23 19.0098V5.00977C23 3.89977 22.1 3.00977 21 3.00977V3.00977ZM11 15.9998L15 11.9998L11 7.99977V10.9998H1V12.9998H11V15.9998ZM21 3.00977H3C1.9 3.00977 1 3.90977 1 5.00977V8.99977H3V4.98977H21V19.0198H3V14.9998H1V19.0098C1 20.1098 1.9 20.9898 3 20.9898H21C22.1 20.9898 23 20.1098 23 19.0098V5.00977C23 3.89977 22.1 3.00977 21 3.00977V3.00977ZM11 15.9998L15 11.9998L11 7.99977V10.9998H1V12.9998H11V15.9998Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
