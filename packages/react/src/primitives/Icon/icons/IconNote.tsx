import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconNote } from '@aws-amplify/ui-react';` → `import { MdNote } from 'react-icons/md';`
 */
export const IconNote = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconNote');
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
          d="M16 4H4C2.9 4 2 4.9 2 6V18.01C2 19.11 2.9 20 4 20H20C21.1 20 22 19.1 22 18V10L16 4V4ZM4 18.01V6H15V11H20V18.01H4V18.01Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
